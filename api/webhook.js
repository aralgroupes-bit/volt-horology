// Vercel Serverless Function — Webhook Stripe
// Endpoint: POST /api/webhook
//
// Reçoit les événements Stripe (paiement confirmé, etc.) et envoie un email
// de notification à l'admin avec les détails de la commande.
//
// Variables d'environnement requises:
//   STRIPE_SECRET_KEY        — clé secrète Stripe
//   STRIPE_WEBHOOK_SECRET    — secret de signature du webhook (whsec_...)
//   ADMIN_EMAIL              — email où recevoir les notifications de commande
//   RESEND_API_KEY           — (optionnel) clé Resend pour l'envoi d'email
//
// IMPORTANT: ce endpoint doit recevoir le body brut (raw) pour vérifier
// la signature Stripe. La config bodyParser:false ci-dessous est essentielle.

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const config = {
  api: { bodyParser: false }, // body brut requis pour la signature
};

// Helper pour lire le body brut
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

// Helper email via Resend (https://resend.com — 3000 emails gratuits/mois)
async function sendNotificationEmail(session) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) {
    console.log("[webhook] RESEND_API_KEY ou ADMIN_EMAIL manquant, skip email.");
    return;
  }

  const items = (session.line_items?.data || []).map(li =>
    `<li>${li.quantity}× <strong>${li.description}</strong> — CHF ${(li.amount_total/100).toFixed(2)}</li>`
  ).join("");

  const ship = session.shipping_details || session.customer_details || {};
  const addr = ship.address || {};

  const html = `
    <h2>Nouvelle commande VOLT</h2>
    <p><strong>Référence Stripe:</strong> ${session.id}</p>
    <p><strong>Total:</strong> CHF ${(session.amount_total/100).toFixed(2)}</p>
    <p><strong>Client:</strong> ${session.customer_details?.name || ""} &lt;${session.customer_details?.email || ""}&gt;</p>
    <p><strong>Téléphone:</strong> ${session.customer_details?.phone || "—"}</p>
    <h3>Articles</h3>
    <ul>${items}</ul>
    <h3>Adresse de livraison</h3>
    <p>
      ${ship.name || ""}<br/>
      ${addr.line1 || ""}<br/>
      ${addr.line2 ? addr.line2 + "<br/>" : ""}
      ${addr.postal_code || ""} ${addr.city || ""}<br/>
      ${addr.country || ""}
    </p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "VOLT Notifications <onboarding@resend.dev>", // remplace par ton domaine vérifié
      to: [adminEmail],
      subject: `🛒 Nouvelle commande VOLT — CHF ${(session.amount_total/100).toFixed(2)}`,
      html,
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  const buf = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      // Récupère la session avec les line_items détaillés
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["line_items"] }
      );
      console.log("[webhook] Paiement confirmé:", session.id);
      await sendNotificationEmail(session);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handling error:", err);
    return res.status(500).send("Internal error");
  }
}

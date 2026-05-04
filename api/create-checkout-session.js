// Vercel Serverless Function — Stripe Checkout Session
// Endpoint: POST /api/create-checkout-session
//
// Body attendu (JSON):
//   {
//     items: [{ id, ref, name, price, currency, quantity }],
//     customerEmail: "client@example.com" | null
//   }
//
// Réponse: { url: "https://checkout.stripe.com/..." }
//
// Variables d'environnement requises (à configurer sur Vercel):
//   STRIPE_SECRET_KEY  — clé secrète Stripe (sk_test_... ou sk_live_...)
//   PUBLIC_BASE_URL    — URL publique de ton site (ex: https://volt-horology.vercel.app)

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const BASE_URL = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { items, customerEmail } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Panier vide ou invalide." });
    }

    // Convertir le panier en line_items Stripe
    const line_items = items.map((it) => ({
      price_data: {
        currency: (it.currency || "chf").toLowerCase(),
        product_data: {
          name: it.name,
          description: it.ref,
          metadata: { product_id: it.id, ref: it.ref },
        },
        unit_amount: Math.round(Number(it.price) * 100), // en centimes
      },
      quantity: Math.max(1, Number(it.quantity) || 1),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      payment_method_types: ["card"],
      // Demande l'adresse de livraison côté Stripe (sécurisé, validé)
      shipping_address_collection: {
        // Liste des pays autorisés. Ajoute / retire selon ta zone.
        allowed_countries: ["CH", "FR", "DE", "IT", "AT", "BE", "LU", "NL", "ES", "PT"],
      },
      // Optionnel : frais de livraison fixes
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "chf" },
            display_name: "Livraison standard offerte (5–7 jours)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      customer_email: customerEmail || undefined,
      success_url: `${BASE_URL}/?paiement=ok&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/?paiement=annule`,
      locale: "fr",
      metadata: {
        item_count: String(items.length),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({
      error: err.message || "Erreur serveur lors de la création de la session.",
    });
  }
}

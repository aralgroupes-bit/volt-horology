# VOLT Horology — Boutique React + Stripe

Site e-commerce React (Vite) avec checkout Stripe, prêt à déployer sur Vercel.

## Architecture

```
volt-stripe/
├── index.html                           # Point d'entrée HTML
├── src/
│   ├── main.jsx                         # Bootstrap React
│   └── App.jsx                          # Ton composant VOLT (panier persistant + checkout)
├── api/
│   ├── create-checkout-session.js       # Crée la session Stripe Checkout
│   └── webhook.js                       # Reçoit la confirmation de paiement + email
├── package.json
├── vite.config.js
├── vercel.json
└── .env.example                         # Template des variables d'env
```

Stack : **React 18** + **Vite** côté client, **Vercel Serverless Functions** + **Stripe API** côté serveur, **Resend** pour les notifications email.

Voir le guide complet de déploiement dans le chat avec Claude.
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const SITE_NAME = "Black Friday";
export const SITE_TAGLINE = "Les meilleures offres de l'année";

export const SALE_ENDS_AT = new Date("2026-11-30T23:59:59+01:00");

export const MAX_QTY_PER_ITEM = 10;
export const MAX_LINES = 20;

export const SHIPPING_COUNTRIES: string[] = ["FR"];

export const COMPANY = {
  name: "[À COMPLÉTER : Nom de l'entreprise]",
  legalForm: "[À COMPLÉTER : Forme juridique, ex: SAS]",
  capital: "[À COMPLÉTER : Capital social, ex: 10 000 €]",
  registration: "[À COMPLÉTER : SIRET / RCS Ville]",
  vatNumber: "[À COMPLÉTER : Numéro TVA intracommunautaire]",
  address: {
    line1: "[À COMPLÉTER : Adresse ligne 1]",
    line2: "[À COMPLÉTER : Code postal, Ville, Pays]",
  },
  email: "[À COMPLÉTER : contact@exemple.fr]",
  phone: "[À COMPLÉTER : +33 X XX XX XX XX]",
  publicationDirector: "[À COMPLÉTER : Nom du directeur de publication]",
  host: {
    name: "[À COMPLÉTER : Nom de l'hébergeur]",
    address: "[À COMPLÉTER : Adresse de l'hébergeur]",
  },
};

export const TRUST = {
  securePayment: {
    enabled: !process.env.NEXT_PUBLIC_DEMO_MODE,
    label: "Paiement sécurisé par Stripe",
  },
  delivery: {
    enabled: false,
    label: "Livraison offerte dès 100 €",
  },
  returns: {
    enabled: false,
    label: "Retours gratuits sous 14 jours",
  },
  support: {
    enabled: false,
    label: "Support client 7j/7",
  },
};

export function getTrustItems() {
  return Object.values(TRUST).filter(t => t.enabled).map(t => t.label);
}
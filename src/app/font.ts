import { Quantico, DynaPuff, Source_Code_Pro } from 'next/font/google';

/**
 * 1. QUANTICO (Technologique, Géométrique, Digitale & Précision)
 * Rôle sémantique : Titres principaux, identité de marque, logos, en-têtes (h1-h6)
 * et éléments display à haute autorité visuelle.
 */
export const fontQuantico = Quantico({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quantico',
  display: 'swap',
  preload: true
});

/**
 * 2. DYNAPUFF (Ludique, Organique, Bubbly & Chaleureuse)
 * Rôle sémantique : Accents visuels, pastilles créatives, badges promotionnels,
 * tags de mise en valeur et micro-accroches marketing.
 */
export const fontDynaPuff = DynaPuff({
  subsets: ['latin'],
  variable: '--font-dynapuff',
  display: 'swap',
  preload: true

});

/**
 * 3. SOURCE CODE PRO (Monospace Technique, Télémétrie & Lisibilité Parfaite)
 * Rôle sémantique : Corps de texte technique, formulaires, compteurs de scans (tabular-nums),
 * slugs de redirection (/s/[slug]), URL et données numériques.
 */
export const fontSourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
  preload: true,
});

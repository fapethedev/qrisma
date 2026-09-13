# WALKTROUGH - CHANGELOG DU PROJET QRC (MICRO-SAAS QR CODE)

Ce document sert de **journal de bord officiel et changelog continu** pour l'agent de coding et l'équipe. Toute modification d'architecture, ajout de fonctionnalité ou configuration doit y être consignée chronologiquement.

---

## [2026-09-13] - Initialisation du Blueprint et du Master Prompt de l'Agent

### 📌 Contexte & Objectif
Structuration complète des consignes, de l'architecture et de la feuille de route pour le développement d'un Micro-SaaS premium de QR Codes personnalisés basé sur `@lglab/react-qr-code`, Next.js 16, shadcn/ui, Better Auth, R3F 3D, PostgreSQL et Resend.

### 🛠️ Actions Réalisées
1. **Audit de l'Espace de Travail & Stack Existante** :
   - Détection de Next.js 16.3.5 avec React 19.3.0 et Tailwind CSS v4.
   - Inventaire des 61 composants `shadcn/ui` déjà installés et prêts à l'emploi dans `src/components/ui/`.
   - Inspection approfondie de l'API de [`@lglab/react-qr-code`](https://github.com/LGLabGreg/react-qr-code) : extraction des types stricts (styles de modules, styles des yeux intérieurs/extérieurs, dégradés linéaires/radiaux, excavation du logo et méthode de téléchargement native).

2. **Cartographie & Catégorisation des Compétences (`.agents/skills`)** :
   - Mise en correspondance stricte des 21 skills du dossier `.agents/skills` avec chaque brique de l'application :
     - *UI/UX & Accessibilité* : `ui-ux-pro-max`, `frontend-design`, `web-design-guidelines`
     - *Performance & Patterns React* : `vercel-react-best-practices`, `vercel-composition-patterns`
     - *Authentification & Sécurité* : `better-auth-best-practices`, `better-auth-security-best-practices`, `email-and-password-best-practices`, `two-factor-authentication-best-practices`
     - *Visualisation 3D* : `react-three-fiber`
     - *Base de Données* : `postgres`, `postgresql-optimization`, `supabase-postgres-best-practices`, `neon-postgres`, `prisma-postgres`
     - *Internationalisation* : `next-intl-add-language`
     - *Emails Transactionnels* : `resend`
     - *Qualité & Git* : `tdd`, `git-commit`

3. **Création du Master Prompt (`CODING_AGENT_MASTER_PROMPT.md`)** :
   - Document de référence exhaustif pour l'agent de coding contenant :
     - Profil et règles impératives (Zéro hallucination, Mode plan, UI/UX Pro Max, Conventional Commits).
     - Spécification technique complète des props `@lglab/react-qr-code`.
     - Architecture modulaire des dossiers (`src/app/[locale]/...`, `src/components/qr/...`, `src/components/3d/...`, etc.).
     - Feuille de route en 10 phases progressives (Mode Plan).

4. **Mise à Jour des Directives de l'Agent (`AGENTS.md`)** :
   - Intégration de la matrice de compétences détaillée.
   - Formalisation des règles obligatoires : utilisation continue du Mode Plan, mise à jour systématique de `WALKTROUGH.md`, commits conventionnels réguliers.

---

## 📋 Suivi d'Avancement des Phases du Projet

- [x] **Phase 0 : Cadrage & Blueprint d'Architecture**
  - [x] Définition du Master Prompt (`CODING_AGENT_MASTER_PROMPT.md`)
  - [x] Enrichissement de `AGENTS.md`
  - [x] Création du journal de bord (`WALKTROUGH.md`)
- [x] **Phase 1 : Dépendances & Typage QR**
  - [x] Installation et validation de `@lglab/react-qr-code`, `@react-three/fiber`, `@react-three/drei`, `three`, `better-auth`, `next-intl`, `lenis`, `motion`, `react-scroll-parallax`, `resend`, `zustand`, `jspdf`, `html-to-image`, `vitest`
  - [x] Définition des types stricts dans `src/lib/qr/types.ts`
  - [x] Implémentation du générateur de payloads QR universel (`src/lib/qr/payloads.ts`) avec validation TDD
  - [x] Création de la bibliothèque de presets visuels (`src/lib/qr/presets.ts`)
  - [x] Implémentation du store d'état Zustand (`src/stores/qr-studio-store.ts`)
  - [x] Mise en place du service d'exportation multi-formats (`src/lib/qr/export-service.ts`)
- [x] **Phase 2 : Moteur QR & Studio 2D**
  - [x] Store Zustand `qr-studio-store.ts` avec synchronisation temps réel
  - [x] Composant `QRCodePreview2D` avec SVG dynamique, styles avancés et conteneur soigné
  - [x] Panneau de configuration modulaire `QRCustomizerForm` avec 5 onglets shadcn (Contenu, Formes, Couleurs, Logo, Thèmes)
  - [x] Sélecteur visuel des formes de modules `QRShapePicker` avec aperçus SVG
  - [x] Sélecteur de bordures et centres des yeux `QRFinderPicker`
  - [x] Éditeur de dégradés et couleurs `QRGradientEditor`
  - [x] Téléversement et gestion du logo avec excavation automatique `QRLogoUploader`
  - [x] Badge de scannabilité et robustesse d'erreur en direct `QRScanCheckBadge`
  - [x] Boîte de dialogue d'exportation haute résolution `QRExportDialog` (SVG, PNG 1x-4x 300DPI, JPEG, PDF)
  - [x] Vue principale du studio `QRStudioView` intégrée sur la page d'accueil
  - [x] Migration et catégorisation de tous les tests dans `test/unit/` (`vitest.config.ts`, `test/unit/qr/payloads.test.ts`, `test/unit/qr/presets.test.ts`)
- [x] **Phase 3 : Landing Page & UX Immersive**
  - [x] Provider unifié `SmoothScrollProvider` intégrant Lenis et `react-scroll-parallax`
  - [x] Barre de navigation `LandingNavbar` avec liens d'ancrage, bascule Dark/Light (`ThemeToggle`) et CTA Studio
  - [x] Section Hero `HeroSection` avec bac à sable interactif en direct (modification d'URL et bascule de thèmes en temps réel)
  - [x] Grille bento `BentoFeatures` mettant en avant les 5 piliers (exports vectoriels/print, QR dynamiques, 3D, analytics, sécurité)
  - [x] Galerie de parallaxe `ParallaxShowcase` animant des cartes de styles à vitesses de défilement étagées
  - [x] Section Tarifs `PricingSection` avec toggle mensuel/annuel (-25%) et 3 offres (Free, Pro Creator, Enterprise)
  - [x] Accordéon FAQ `FAQSection` traitant les questions de compatibilité, scannabilité et formats
  - [x] Pied de page `LandingFooter` avec mentions et stack technique
  - [x] Découpage des routes App Router : `/` (Landing page marketing) et `/studio` (Espace de travail dédié)
- [ ] **Phase 4 : Studio de Visualisation 3D (R3F)**
  - [ ] Scène Three Fiber avec OrbitControls & studio lighting
  - [ ] Modèles 3D paramétrables (Smartphone, Affiche, Mug, Carte de visite)
  - [ ] Synchronisation en direct de la texture QR
- [ ] **Phase 5 : Authentification & Sécurité (Better Auth)**
  - [ ] Configuration de `auth.ts` et du client React
  - [ ] Schéma utilisateur étendu (rôles, quotas, abonnements)
  - [ ] Pages `/login`, `/register`, `/forgot-password`
  - [ ] Protection anti-bruteforce et support 2FA TOTP
- [ ] **Phase 6 : PostgreSQL & Redirection Dynamique**
  - [ ] Schéma SQL (`users`, `qr_codes`, `scan_events`, `subscriptions`)
  - [ ] Route Handler `/s/[slug]` pour tracking et redirection 302 instantanée
- [ ] **Phase 7 : Dashboard & Analytics des Scans**
  - [ ] Page de gestion de la bibliothèque de QR codes (CRUD, filtres)
  - [ ] Dashboard de métriques avec graphiques Recharts (timeline, devices, pays)
- [ ] **Phase 8 : Internationalisation (next-intl)**
  - [ ] Dictionnaires `fr.json` et `en.json`
  - [ ] Sélecteur de langue fluide dans la barre de navigation
- [ ] **Phase 9 : Emails Transactionnels (Resend)**
  - [ ] Client Resend et templates React Email (Bienvenue, Reset Password, Scan Alerts)
- [ ] **Phase 10 : Optimisations Finales & Production Launch**
  - [ ] Audit Lighthouse (> 90), métadonnées SEO et sitemap
  - [ ] Accessibilité WCAG (Focus rings, aria-labels)

---

## 🔒 Directives pour les Futurs Commits
Chaque agent intervenant sur le dépôt doit :
1. Renseigner l'entrée correspondante dans ce fichier `WALKTROUGH.md`.
2. Utiliser le format de commit conventionnel : `<type>(<périmètre>): <description à l'impératif>`.
3. Vérifier qu'aucune régression TypeScript n'est introduite (`pnpm typecheck`).

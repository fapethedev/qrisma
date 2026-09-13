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
- [x] **Phase 4 : Studio de Visualisation 3D (R3F)**
  - [x] Intégration du skill `shadcn` dans la matrice de compétences (`AGENTS.md`)
  - [x] Scène Three.js interactive `<QRScene3D>` avec éclairage studio et ombres douces (`ContactShadows`)
  - [x] 4 modèles 3D paramétrables procéduraux :
    - *Smartphone* (`PhoneMockup`) avec châssis titane et écran affichant le QR code
    - *Affiche de galerie* (`PosterMockup`) dans un cadre épuré avec passe-partout
    - *Mug céramique* (`MugMockup`) avec anse et texture QR projetée
    - *Carte de visite de luxe* (`CardMockup`) avec coordonnées typographiques et QR code
  - [x] Hook réactif `useQRTexture` générant une `THREE.CanvasTexture` haute résolution synchronisée en direct avec le SVG
  - [x] Contrôles OrbitControls (rotation 360°, zoom restreint, recentrage caméra)
  - [x] Bascule intuitive 2D Vectoriel / 3D Mockup dans le Studio avec lazy loading SSR-safe
- [x] **Phase 5 : Authentification & Sécurité (Better Auth)**
  - [x] Configuration serveur `src/lib/auth/auth.ts` avec support PostgreSQL (`pg.Pool`) et mémoire de secours
  - [x] Schéma utilisateur étendu SaaS : rôle (`free`, `pro`, `admin`), plan d'abonnement et compteur de QR codes
  - [x] Plugin `twoFactor` avec émetteur *QRCraft* et options TOTP (période 30s, 6 chiffres)
  - [x] Plugin `emailAndPassword` conforme aux best practices (min 8 caractères, `sendResetPassword`, `sendVerificationEmail`)
  - [x] Instance client `src/lib/auth/auth-client.ts` avec `twoFactorClient` et redirection automatique `/2fa`
  - [x] Route Handler Next.js App Router `src/app/api/auth/[...all]/route.ts`
  - [x] Pages d'authentification complètes conformes au skill `shadcn` :
    - `/login` : Connexion email/mot de passe avec redirection et gestion des états
    - `/register` : Inscription avec politique de mot de passe et confirmation
    - `/forgot-password` : Demande de lien de réinitialisation via `requestPasswordReset`
    - `/2fa` : Validation TOTP à 6 chiffres (`InputOTP`) et bascule avec codes de secours
  - [x] Dialogue interactif `TwoFactorSetupDialog` permettant l'activation de la 2FA et affichant le QR code TOTP généré par `@lglab/react-qr-code`
  - [x] Tests unitaires automatisés validés dans `test/unit/auth/auth-config.test.ts` (15/15 tests réussis)
- [x] **Phase 6 : PostgreSQL & Redirection Dynamique**
  - [x] Conteneur Podman PostgreSQL 18.4 (`compose.yml`) déployé et opérationnel sur port 5432
  - [x] Fichiers `.env`, `.env.local` et `.env.example` synchronisés avec la base de données
  - [x] Schéma natif Better Auth géré via `better-auth migrate` (10 tables créées sans ORM externe)
  - [x] Plugin multi-tenant `organization` activé pour la gestion d'équipes / workspaces
  - [x] Plugin Better Auth personnalisé `qrPlugin` gérant `qrCode` et `scanEvent`
  - [x] Pool PostgreSQL singleton et repository typé `qrRepository` (`src/lib/db/`)
  - [x] Parseur User-Agent (`src/lib/utils/ua-parser.ts`) pour la détection de terminaux, OS et navigateurs
  - [x] Route Handler dynamique `/s/[slug]` pour redirection 302 instantanée et comptage temps réel
  - [x] Tests unitaires catégorisés validés dans `test/unit/` (26/26 tests réussis)
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

## [2026-09-13] - Phase 6 : PostgreSQL 18.4, Better Auth Native Schema & Moteur de Redirection Dynamique

### 📌 Contexte & Objectif
Mettre en place la persistance des données sur PostgreSQL 18.4 en local avec Podman Compose, déléguer l'intégralité de la gestion du schéma à Better Auth (via ses plugins natifs et ses migrations automatiques sans générer de schémas tiers), et implémenter la route de redirection dynamique et de tracking analytique `/s/[slug]`.

### 🛠️ Actions Réalisées
1. **Déploiement Base de Données PostgreSQL 18.4 (Podman Compose)** :
   - Configuration du service dans `compose.yml` avec l'image `postgres:18.4`, port `5432:5432`, volume persistant `qrcraft_pgdata` et healthcheck `pg_isready`.
   - Création de `.env.local`, `.env` et `.env.example` avec `DATABASE_URL="postgresql://qrcraft:qrcraft_secret@localhost:5432/qrcraft_db?schema=public"`.
   - Démarrage et validation du conteneur `qrcraft-postgres` (`Up (healthy)`).

2. **Architecture Schéma 100% Better Auth Native (Sans ORM externe)** :
   - Application de la directive utilisateur : Better Auth gère lui-même son schéma et ses tables.
   - Intégration du plugin officiel `organization()` dans `src/lib/auth/auth.ts` et `organizationClient()` dans `src/lib/auth/auth-client.ts` pour supporter les organisations / entreprises multi-tenant (workspaces, équipes, rôles `owner`/`admin`/`member`).
   - Conception du plugin Better Auth personnalisé `qrPlugin()` (`src/lib/auth/plugins/qr-plugin.ts`) définissant les entités métier `qrCode` et `scanEvent` avec clés étrangères en cascade.
   - Exécution de `pnpm exec better-auth migrate` créant les 10 tables directement dans PostgreSQL : `user`, `session`, `account`, `verification`, `twoFactor`, `organization`, `member`, `invitation`, `qrCode`, `scanEvent`.

3. **Pool PostgreSQL & Repository Typé** :
   - Mise en place du singleton `Pool` (`pg`) dans `src/lib/db/index.ts` avec monitoring des slow queries en développement.
   - Création de `src/lib/db/qr-repository.ts` : méthodes `create`, `findBySlug`, `findById`, `listByUser`, `listByOrganization`, `recordScan`, `getAnalytics`, `delete`.

4. **Moteur de Redirection Dynamique & Analytics (`/s/[slug]`)** :
   - Implémentation du parseur d'empreintes `src/lib/utils/ua-parser.ts` (détection Mobile/Tablet/Desktop/Bot, OS, navigateurs).
   - Création du Route Handler Next.js `src/app/s/[slug]/route.ts` :
     - Recherche optimisée par index btree sur `shortSlug`.
     - Anonymisation de l'IP (hachage cryptographique SHA-256 avec sel).
     - Détection de la géolocalisation (en-têtes edge `x-vercel-ip-country`, `cf-ipcountry`).
     - Enregistrement du scan et incrémentation atomique du compteur `scanCount`.
     - Redirection 302 temporaire avec en-têtes stricts `Cache-Control: no-store, no-cache, must-revalidate` garantissant le comptage de 100% des scans.

5. **Validation & TDD** :
   - Respect strict de la règle d'or : tests catégorisés dans `test/unit/` (`test/unit/utils/ua-parser.test.ts`, `test/unit/db/qr-repository.test.ts`, `test/unit/redirect/redirect-route.test.ts`).
   - 26/26 tests unitaires réussis avec Vitest.
   - 0 erreur de typage (`pnpm tsc --noEmit`).


---

## 🔒 Directives pour les Futurs Commits
Chaque agent intervenant sur le dépôt doit :
1. Renseigner l'entrée correspondante dans ce fichier `WALKTROUGH.md`.
2. Utiliser le format de commit conventionnel : `<type>(<périmètre>): <description à l'impératif>`.
3. Vérifier qu'aucune régression TypeScript n'est introduite (`pnpm typecheck`).

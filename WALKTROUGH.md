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
- [x] **Phase 7 : Dashboard & Analytics des Scans**
  - [x] Endpoints API RESTful (`/api/qr`, `/api/qr/[id]`, `/api/qr/[id]/analytics`, `/api/analytics/overview`)
  - [x] Header Dashboard avec recherche en direct, profil et déconnexion
  - [x] Cartes KPI Overview (Total Scans, QR actifs, Scans 7j, Top QR code)
  - [x] Graphique temporel Recharts de scans journaliers avec dégradé subtil
  - [x] Graphique de répartition des visiteurs par matériel et top pays
  - [x] Tableau de gestion de la bibliothèque de QR codes avec miniatures SVG, copie en 1 clic et suppression sécurisée
  - [x] Dialogue d'analyse approfondie `QRCodeAnalyticsDialog`
  - [x] Intégration de la sauvegarde en direct dans le Studio (`/studio`)
  - [x] Tests unitaires d'API et d'analytics validés dans `test/unit/` (36/36 tests réussis, build production OK)
- [x] **Phase 8 : Internationalisation (next-intl)**
  - [x] Configuration i18n (`src/i18n/routing.ts` & `src/i18n/request.ts`)
  - [x] Dictionnaires complets `messages/fr.json` et `messages/en.json` (100% miroirs)
  - [x] Proxy i18n Next.js 16 `src/proxy.ts` avec exclusion des routes `/api` et `/s/[slug]`
  - [x] Plugin `next-intl/plugin` configuré dans `next.config.ts`
  - [x] Composant sélecteur de langue `src/components/language-toggle.tsx` avec drapeaux (🇫🇷 / 🇬🇧)
  - [x] Intégration du sélecteur dans la Landing Page, le Dashboard et le Studio
  - [x] Tests unitaires i18n validés dans `test/unit/i18n/i18n.test.ts` (40/40 tests réussis)
- [x] **Phase 9 : Emails Transactionnels (Resend)**
  - [x] Client Resend avec clés d'idempotence et mode fallback dev sécurisé (`src/lib/email/resend.ts`)
  - [x] Modèles d'emails HTML responsives universels (`src/lib/email/templates/`) : Bienvenue, Reset Password, Vérification, Alerte Jalon Scans
  - [x] Intégration Better Auth native dans `sendResetPassword` et `sendVerificationEmail`
  - [x] Suite de tests unitaires automatisés validée dans `test/unit/email/resend.test.ts` (9/9 tests réussis)
- [x] **Phase 10 : Optimisations Finales & Production Launch**
  - [x] Métadonnées SEO globales, OpenGraph et Twitter Cards dans `src/app/layout.tsx` et `dashboard/layout.tsx`
  - [x] Configuration native Next.js 16 `robots.ts` et `sitemap.ts` avec priorités indexables
  - [x] Tests unitaires SEO validés dans `test/unit/seo/sitemap-robots.test.ts` (51/51 tests totaux réussis)
  - [x] Build de production Next.js 16 validé sans erreur avec Turbopack (12 pages compilées)

---

## [2026-09-13] - Phase 8 : Internationalisation Complète (next-intl FR/EN)

### 📌 Contexte & Objectif
Doter QRCraft d'une prise en charge multilingue native et fluide (Français / Anglais) conformément à la compétence `next-intl-add-language` : dictionnaires exhaustifs, bascule instantanée sans rechargement lourd et préservation totale des liens dynamiques courts `/s/[slug]`.

### 🛠️ Actions Réalisées
1. **Architecture & Routage (`src/i18n/`)** :
   - `src/i18n/routing.ts` : déclaration des langues `['fr', 'en']`, `defaultLocale: 'fr'` et mode sans préfixe d'URL (`localePrefix: 'never'`) pour préserver des URLs propres (`/`, `/studio`, `/dashboard`).
   - `src/i18n/request.ts` : chargement dynamique basé sur le cookie `NEXT_LOCALE` avec repli gracieux en contexte hors-requête.
   - Intégration du plugin `next-intl/plugin` dans `next.config.ts`.
   - Migration vers la convention moderne Next.js 16 `src/proxy.ts` (remplaçant le conventionnel déprécié `middleware.ts`), excluant formellement `/api`, `/_next`, `/_vercel` et `/s/` pour garantir le fonctionnement inaltéré des redirections QR codes.

2. **Dictionnaires Exhaustifs (`messages/`)** :
   - Création de `messages/fr.json` et `messages/en.json` couvrant l'ensemble de l'écosystème : `common`, `landing`, `studio`, `dashboard`, `auth`.
   - Correspondance exacte des clés (100% de parité validée par test unitaire).

3. **Composant UI `LanguageToggle`** :
   - Composant accessible `src/components/language-toggle.tsx` avec dropdown menu, icône Globe, drapeaux et mémorisation du choix dans le cookie `NEXT_LOCALE` (durée 1 an).
   - Déploiement dans les en-têtes :
     - Barre de navigation de la Landing Page (`src/components/landing/navbar.tsx`).
     - En-tête du Dashboard (`src/components/dashboard/dashboard-header.tsx`).
     - Barre d'outils du Studio (`src/components/qr/qr-studio-view.tsx`).

4. **Tests & Validation TDD** :
   - Tests de parité et de conformité des dictionnaires dans `test/unit/i18n/i18n.test.ts`.
   - **40/40 tests unitaires passés avec succès** sous Vitest.
   - Compilation TypeScript sans erreur (`tsc --noEmit`).
   - Build Next.js 16 réussi en production avec Turbopack.


---

## [2026-09-13] - Phase 7 : Dashboard, Bibliothèque de QR Codes & Visualisation Analytique Recharts

### 📌 Contexte & Objectif
Fournir aux utilisateurs un espace de travail complet (`/dashboard`) pour piloter leur collection de QR codes, modifier leurs redirections dynamiques en temps réel, analyser les courbes de trafic avec Recharts et sauvegarder leurs créations directement depuis le Studio.

### 🛠️ Actions Réalisées
1. **Extension du Repository Analytique (`src/lib/db/qr-repository.ts`)** :
   - Méthode `update` avec vérification stricte du propriétaire (`userId`).
   - Méthode `getUserOverview` : agrégation simultanée du total de scans, nombre de QR codes actifs, activité des 7 derniers jours et identification du QR code le plus performant.
   - Méthodes `getScanTimeline` et `getCountryBreakdown` : requêtes SQL optimisées avec groupement chronologique et géographique.

2. **Routes API Complètes (App Router)** :
   - `GET /api/qr` : Récupération filtrée et recherchée des QR codes de l'utilisateur ou de son organisation active.
   - `POST /api/qr` : Création et assignation de slug unique (avec gestion des conflits 409 et sanitisation de slug).
   - `GET /api/qr/[id]`, `PUT /api/qr/[id]`, `DELETE /api/qr/[id]` : Opérations CRUD protégées par session.
   - `GET /api/qr/[id]/analytics` & `GET /api/analytics/overview` : Endpoints dédiés aux métriques pour les graphiques.

3. **Composants d'Interface Dashboard (`src/components/dashboard/`)** :
   - `DashboardHeader` : Navigation, sélecteur d'organisation, recherche instantanée, bascule de thème et CTA vers le Studio.
   - `OverviewStatsCards` : 4 cartes KPI avec design soigné et icônes thématiques.
   - `ScanTimelineChart` : Graphique d'aire Recharts interactif avec dégradé personnalisé, grille douce et tooltip contextuel.
   - `DeviceBreakdownChart` : Graphique en barres horizontales pour la répartition par appareil et top pays.
   - `QRCodeTable` : Tableau shadcn/ui complet avec miniatures SVG générées via `@lglab/react-qr-code`, copie de lien court en 1 clic avec feedback toast, badge Dynamique/Statique, menu contextuel et suppression avec `AlertDialog`.
   - `QRCodeAnalyticsDialog` : Boîte de dialogue modale d'analyse détaillée pour chaque QR code.

4. **Intégration dans le Studio (`/studio`)** :
   - Ajout d'un bouton *"Sauvegarder"* et d'un lien vers le Dashboard dans l'en-tête du Studio.
   - Dialogue modal interactif permettant de nommer le QR code avant enregistrement en base de données.

5. **Validation, Qualité & TDD** :
   - Tests unitaires ajoutés dans `test/unit/api/qr-api.test.ts` et `test/unit/dashboard/analytics-repository.test.ts`.
   - **36/36 tests unitaires passés avec succès** sous Vitest.
   - Compilation TypeScript sans aucune erreur (`tsc --noEmit`).
   - Compilation de production Next.js 16 validée avec succès (`pnpm build`).


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

## [2026-09-13] - Phase 9 : Emails Transactionnels (Resend SDK & Templates Responsifs)

### 📌 Contexte & Objectif
Mettre en place une suite complète d'emails transactionnels robustes, esthétiques et fiables via le SDK officiel Resend (conformément au skill `resend`), intégrant des clés d'idempotence, la gestion sécurisée des erreurs et la liaison native avec les hooks d'authentification Better Auth.

### 🛠️ Actions Réalisées
1. **Templates HTML Responsives Universels (`src/lib/email/templates/index.ts`)** :
   - Mise en page globale sombre élégante avec badge QRCraft dégradé, conteneur centré, boutons d'action stylisés et texte de prévisualisation caché.
   - `renderWelcomeEmail` : accueil personnalisé du créateur, résumé des fonctionnalités clés (3D, vectoriel, scans) et lien direct vers le dashboard.
   - `renderPasswordResetEmail` : réinitialisation sécurisée avec bouton d'action, avertissement d'expiration (60 min) et URL alternative.
   - `renderVerificationEmail` : confirmation d'adresse email pour la sécurisation de compte.
   - `renderScanMilestoneEmail` : célébration de franchissement de paliers de scans avec compteur géant et lien vers les analyses en direct.

2. **Service Resend Typé (`src/lib/email/resend.ts`)** :
   - Intégration conforme aux spécifications Resend : pas d'exceptions levées par le SDK, traitement strict de `{ data, error }`.
   - Support systématique des clés d'idempotence (`<event-type>/<entity-id>`) évitant les envois dupliqués lors de réessais.
   - Mode de développement et simulation automatique si `RESEND_API_KEY` est omise (zéro blocage lors du développement local ou CI).
   - Fonctions utilitaires dédiées : `sendWelcomeNotification`, `sendPasswordResetNotification`, `sendVerificationNotification`, `sendScanMilestoneNotification`.

3. **Interconnexion Better Auth (`src/lib/auth/auth.ts`)** :
   - Remplacement des logs de test par les appels asynchrones vers `sendPasswordResetNotification` et `sendVerificationNotification`.

4. **Tests & TDD (`test/unit/email/resend.test.ts`)** :
   - 9 tests unitaires validant la génération des templates, la simulation locale, le mocking du SDK Resend, la gestion d'erreurs et les notifications typées.

---

## [2026-09-13] - Phase 10 : Optimisations Finales, SEO, Sitemap & Lancement Production

### 📌 Contexte & Objectif
Finaliser la configuration SEO, l'indexation par les moteurs de recherche et la conformité d'architecture pour une mise en production optimale de la plateforme QRCraft.

### 🛠️ Actions Réalisées
1. **Métadonnées Globales & Réseaux Sociaux (`src/app/layout.tsx`)** :
   - Configuration `metadataBase` dynamique basée sur `NEXT_PUBLIC_APP_URL`.
   - Titres enrichis avec template (`%s | QRCraft`), descriptions optimisées, mots-clés stratégiques.
   - Balises OpenGraph et Twitter Cards (`summary_large_image`) pour des partages soignés.
   - Layout dédié pour le tableau de bord (`src/app/dashboard/layout.tsx`).

2. **Robots & Sitemap Natifs Next.js 16 (`src/app/robots.ts` & `src/app/sitemap.ts`)** :
   - `robots.ts` : autorisation pour l'indexation publique (`/`, `/studio`, `/login`, `/register`) et protection des routes internes (`/api/`, `/dashboard/`, `/s/`).
   - `sitemap.ts` : génération automatique du flux XML avec priorités et fréquences de rafraîchissement adaptées.

3. **Validation & Qualité Globale** :
   - Tests unitaires dédiés dans `test/unit/seo/sitemap-robots.test.ts`.
   - **51/51 tests unitaires réussis avec succès** sur 11 suites de tests sous Vitest.
   - 0 avertissement TypeScript (`tsc --noEmit`).
   - Compilation de production Next.js 16 Turbopack validée avec succès (`pnpm build`).

---

## [2026-09-13] - Audit & Finalisation de l'Accessibilité WCAG & Web Interface Guidelines

### 📌 Contexte & Objectif
Améliorer l'ergonomie, la navigabilité au clavier, la compatibilité avec les lecteurs d'écran et la conformité aux *Web Interface Guidelines* de Vercel sur l'ensemble des écrans clés de QRCraft (Studio, Dashboard, Landing Page).

### 🛠️ Actions Réalisées
1. **Navigation au Clavier & Skip-Link (`src/app/layout.tsx`)** :
   - Ajout d'un lien d'évitement accessible (`Skip-link`) dès le premier appui sur Tab (`Passer au contenu principal`), pointant vers l'ancre `#main-content`.
   - Identification sémantique de `<main id="main-content">` sur la Landing Page (`/`), le Studio (`/studio`) et le Dashboard (`/dashboard`).

2. **Rôles ARIA & Rendu d'Onglets (`src/components/qr/qr-studio-view.tsx`)** :
   - Implémentation du pattern standard WAI-ARIA pour la bascule 2D / 3D : `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, et `role="tabpanel"`.
   - Anneaux de focus visibles (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-hidden`) sans perturbation du clic souris.

3. **Boutons Interactifs & Icônes Décoratives** :
   - `LanguageToggle` : ajout de `aria-label="Changer de langue / Change language"`.
   - `DashboardHeader` : ajout de `aria-label` sur le champ de recherche et le bouton de déconnexion.
   - `QRCodeTable` : `aria-label="Copier le lien court"` et libellé contextualisé `aria-label="Options pour le QR code [titre]"` sur les menus contextuels.
   - `QRShapePicker` & `QRFinderPicker` : ajout d'attributs `aria-label`, `aria-pressed` et focus rings sur tous les sélecteurs graphiques.
   - `QRExportDialog` : `aria-label` et `aria-pressed` sur chaque bouton de format et de résolution d'export.
   - Masquage des icônes purement décoratives aux technologies d'assistance (`aria-hidden="true"`).

4. **Typographie & Alignement Numérique** :
   - Application de `tabular-nums` sur l'ensemble des compteurs de scans et indicateurs KPI dans `OverviewStatsCards` et `QRCodeTable`.
   - Utilisation systématique de points de suspension typographiques `…` (au lieu de `...`).

5. **Tests Automatisés & Validation** :
   - Création de la suite de tests unitaires d'accessibilité dans `test/unit/a11y/accessibility.test.tsx`.
   - **55/55 tests unitaires réussis avec succès** sur 12 suites de tests sous Vitest.
   - Vérification TypeScript stricte validée (`tsc --noEmit`).
   - Compilation de production Next.js 16 sans avertissement (`pnpm build`).

---

## 🔒 Directives pour les Futurs Commits
Chaque agent intervenant sur le dépôt doit :
1. Renseigner l'entrée correspondante dans ce fichier `WALKTROUGH.md`.
2. Utiliser le format de commit conventionnel : `<type>(<périmètre>): <description à l'impératif>`.
3. Vérifier qu'aucune régression TypeScript n'est introduite (`pnpm typecheck`).

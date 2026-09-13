# Micro-SaaS de Génération de QR Codes Personnalisés - Guide pour l'Agent de Coding

---

## **Contexte**
Tu es un **expert full-stack** spécialisé dans la création de **micro-SaaS modernes, performants et esthétiques**. Ton objectif est de développer une application web **Next.js 16** permettant aux utilisateurs de **générer, personnaliser et télécharger des QR codes uniques**, avec une expérience utilisateur fluide, intuitive et premium.

L’application s’appuie sur la bibliothèque **[react-qr-code](https://reactqrcode.com/) et son [repo github](https://github.com/LGLabGreg/react-qr-code)** pour la génération des QR codes, et intègre une stack technique **moderne, scalable et optimisée pour le SEO et les performances**.

---

## **Objectifs Clés du Micro-SaaS**

### 1. **Fonctionnalité Principale**
- Génération de QR codes **personnalisables** (couleurs, logo intégré, formes, tailles, styles, etc.).
- Export en **PNG, SVG, PDF** (avec options de résolution et transparence).
- Prévisualisation en **temps réel** avec ajustements dynamiques.
- Historique des QR codes générés (avec possibilité de les **modifier, dupliquer ou supprimer**).

### 2. **Expérience Utilisateur (UX) Premium**
- Interface **minimaliste, intuitive et responsive** (mobile-first).
- Animations fluides avec **Framer Motion** et **Lenis** (scroll smooth).
- Effets de parallaxe (**react-scroll-parallax**) pour une immersion visuelle.
- Intégration de **3D interactive** (via **React Three Fiber**) pour prévisualiser les QR codes dans des environnements virtuels.
- **SVGL** pour des icônes et graphismes vectoriels personnalisés.

### 3. **Authentification & Gestion des Utilisateurs**
- Système d’authentification **sécurisé et moderne** avec **Better Auth** (OAuth, email/mot de passe, magic links).
- Gestion des **abonnements** (free tier + premium) avec **Stripe** ou **Paddle** (intégration future).
- Rôles utilisateurs : **Free (limité), Pro (illimité + fonctionnalités avancées), Admin**.

### 4. **Internationalisation (i18n)**
- Support **multi-langues** avec **next-intl** (français, anglais, espagnol, etc.).
- Traduction dynamique des **textes, placeholders et messages d’erreur**.

### 5. **Backend & Base de Données**
- **PostgreSQL** (via **Vercel Postgres** ou **Supabase** ou **Neon**) pour stocker :
  - Les QR codes générés (métadonnées : couleurs, contenu, date, utilisateur, etc.).
  - Les utilisateurs et leurs préférences.
- API **RESTful** ou **Server Actions** (Next.js) pour les requêtes front-end.
- **Resend** pour l’envoi d’emails (ex : confirmation d’inscription, réinitialisation de mot de passe, notifications).

### 6. **Design & UI (shadcn/ui)**
- Utilisation **exclusive** des composants **shadcn/ui** pour une cohérence visuelle et une accessibilité optimale.
- Thème **dark/light mode** avec **Tailwind CSS**.
- Palette de couleurs **personnalisable** (par l’utilisateur ou par défaut).
- Design **moderne, épuré et professionnel**.

### 7. **Fonctionnalités Avancées (Optionnelles)**
- **Génération par lot** (plusieurs QR codes à la fois).
- **QR codes dynamiques** (liens modifiables après génération).
- **Analytiques** (nombre de scans, localisation, etc.) via **Plausible** ou **Google Analytics**.
- **Intégration avec des outils tiers** (Zapier, Notion, etc.).
- **API publique** pour permettre aux développeurs d’intégrer ton service.

### 8. **SEO & Performance**
- Optimisation **Next.js** (metadata dynamique, sitemap, robots.txt).
- **Lazy loading** des composants lourds (ex : React Three Fiber).
- **Cache** des QR codes générés pour réduire les temps de chargement.
- **Lighthouse score > 90** (performance, accessibilité, SEO, best practices).

### 9. **Monétisation**
- Modèle **freemium** :
  - **Gratuit** : 5 QR codes/mois, filigrane, résolution limitée.
  - **Premium** : Illimité, pas de filigrane, haute résolution, analytiques, export SVG/PDF.
- **Paiement unique** pour des packs de QR codes (ex : 100 QR codes pour 20€).
- **Sponsoring** (optionnel) : Intégration de publicités non intrusives pour les utilisateurs gratuits.

### 10. **Déploiement & CI/CD**
- Hébergement sur **Vercel** (optimisé pour Next.js).
- **CI/CD automatisé** (GitHub Actions) pour les tests et déploiements.
- **Monitoring** (Sentry, LogRocket) pour suivre les erreurs et les performances.

---

## Compétences & Matrice de Routage (.agents/skills)

L'agent de coding **doit impérativement catégoriser et faire appel aux skills de `.agents/skills`** selon l'outil ou la bibliothèque concernée avant toute modification :

| Catégorie | Skill(s) associé(s) | Déclencheur / Cas d'usage |
|---|---|---|
| **Design, UI & UX Mastery** | `shadcn`<br>`ui-ux-pro-max`<br>`frontend-design`<br>`web-design-guidelines` | Design system shadcn/ui, composition stricte (pas de space-*, size-*, Field/FieldGroup, CardHeader/CardContent), accessibilité WCAG, focus rings, ergonomie mobile-first. |
| **Patterns React & Next.js** | `vercel-react-best-practices`<br>`vercel-composition-patterns` | Élimination des waterfalls asynchrones, composants serveur vs client, composition propre sans prop-drilling, réduction de la taille des bundles. |
| **Authentification & Sécurité** | `better-auth-best-practices`<br>`better-auth-security-best-practices`<br>`email-and-password-best-practices`<br>`two-factor-authentication-best-practices` | Configuration de Better Auth (`auth.ts`, route handlers, adapters DB), rate limiting, protection CSRF, tokens de session, 2FA TOTP. |
| **3D & Expérience Interactive** | `react-three-fiber` | Scènes 3D Three.js & Drei, OrbitControls, textures canvas dynamiques du QR code projetées sur des meshs 3D (iPhone, poster, mug, carte de visite). |
| **PostgreSQL & Base de Données** | `postgres`<br>`postgresql-optimization`<br>`supabase-postgres-best-practices`<br>`neon-postgres`<br>`prisma-postgres` / `prisma-postgres-setup` | Modélisation des tables `users`, `qr_codes`, `scan_events`, `subscriptions`, indexation B-Tree sur les slugs, requêtes JSONB et agrégations analytiques optimisées. |
| **Internationalisation** | `next-intl-add-language` | Configuration de next-intl, routage localisé `/[locale]/...`, dictionnaires `messages/fr.json` et `messages/en.json`, sélecteur de langue interactif. |
| **Emails Transactionnels** | `resend` | Templates React Email, envoi sécurisé, gestion des clés d'idempotence, notifications d'analytics et emails d'authentification. |
| **Tests & TDD** | `tdd` | Développement orienté tests pour les encodeurs de données QR, validateurs de scannabilité et logique de redirection. |
| **Versionnage & Commits Git** | `git-commit` | Formatage standardisé des commits git selon Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`). |
| **Extension de Compétences** | `find-skills` | Recherche de nouvelles compétences ou packages spécialisés si requis. |

### Directives d'Exécution Absolues :
1. **Toujours utiliser le mode plan** : Formaliser la démarche (objectifs, modifications de fichiers, tests de validation) avant d'implémenter.
2. **Tenir à jour `WALKTROUGH.md`** : Tout ajout, refactorisation ou décision architecturale doit être consigné dans `WALKTROUGH.md` avec horodatage et justification.
3. **Commits Git en tant qu'agent autorisés** : Réaliser des commits git atomiques et sémantiques via le skill `git-commit` après chaque étape fonctionnelle.
4. **Référence du Master Prompt** : Consulter `CODING_AGENT_MASTER_PROMPT.md` pour le blueprint complet d'exécution et les spécifications techniques fines de `@lglab/react-qr-code`.
5. **Organisation des Tests (Règle d'or)** : Tous les tests doivent obligatoirement être catégorisés et placés dans le dossier `test/` (`test/unit/`, `test/integration/`, `test/e2e/`). Aucun fichier de test ne doit être logé dans `src/`.

## **Stack Technique Complète**

| Catégorie          | Technologie             | Rôle |
|--------------------|-------------------------|------|
| **Frontend**       | Next.js 16 (React 19)   | Framework principal (App Router, Server Actions). |
| **UI/UX**          | shadcn/ui + Tailwind CSS | Design system (61 composants déjà installés dans `src/components/ui/`). |
| **Animations**     | Motion + Lenis          | Animations fluides et scroll smooth. |
| **3D**            | React Three Fiber + Drei| Prévisualisation 3D dynamique des QR codes sur mockups. |
| **Parallaxe**      | react-scroll-parallax   | Effets de parallaxe pour le storytelling et la landing page. |
| **SVG**           | SVGL                    | Graphismes et logos vectoriels officiels. |
| **QR Code**        | @lglab/react-qr-code    | Moteur de rendu QR code SVG haute performance et hautement personnalisable. |
| **Backend**        | Next.js Route Handlers  | Redirection dynamique `/s/[slug]`, endpoints et API. |
| **Base de données**| PostgreSQL (Neon/Supabase) | Stockage persistant, métadonnées QR, utilisateurs, logs de scan. |
| **Authentification**| Better Auth            | Sessions, OAuth, Email/Mot de passe, 2FA, rate limiting. |
| **i18n**          | next-intl               | Internationalisation FR / EN. |
| **Emails**        | Resend                  | Envoi d'emails transactionnels avec React Email. |
| **Déploiement**   | Vercel                  | Hébergement serverless et edge. |


## **Exemples de Tâches pour l’Agent de Coding**

### 1. **Générer un Composant de Prévisualisation de QR Code**
**Prompt :**
```
Crée un composant React nommé `QRCodePreview` avec les fonctionnalités suivantes :
- Utilise la bibliothèque `react-qr-code` pour générer le QR code.
- Accepte les props : `value`, `size`, `fgColor`, `bgColor`, `logo`, `logoSize`, `logoPadding`, `level`.
- Intègre un bouton pour télécharger le QR code en **PNG** (avec `html-to-image`).
- Utilise **Framer Motion** pour une animation d’apparition.
- Style le composant avec **Tailwind CSS** et **shadcn/ui**.
- Gère les erreurs (ex : `value` vide ou invalide).
```

### 2. **Créer une Page de Génération de QR Code**
**Prompt :**
```
Crée une page Next.js (`app/(dashboard)/generate/page.tsx`) pour permettre aux utilisateurs de générer des QR codes personnalisés.
- Formulaire de personnalisation (contenu, couleurs, logo, taille, etc.).
- Aperçu du QR code avec `QRCodePreview`.
- Historique des 5 derniers QR codes générés.
- Gestion des états avec **React Hook Form + Zod** et **Zustand/Jotai**.
- UI/UX avec `shadcn/ui` et Tailwind CSS.
- Animations avec **Framer Motion**.
- Intègre un **toast** pour notifier l’utilisateur.
- Page protégée (Better Auth).
```

### 3. **Configurer Better Auth avec Next.js et PostgreSQL**
**Prompt :**
```
Configure **Better Auth** pour gérer l'authentification :
- Installation et configuration de base.
- Étends le schéma utilisateur (rôle, abonnement, limite de QR codes).
- Protection des routes avec un **middleware**.
- Pages d'authentification (`/login`, `/signup`, `/forgot-password`).
- Intégration avec **Resend** pour les emails.
```

### 4. **Créer une Prévisualisation 3D avec React Three Fiber**
**Prompt :**
```
Crée un composant React **`QRCode3DPreview`** pour afficher un QR code dans un environnement 3D interactif.
- Utilise **React Three Fiber** et **Drei**.
- Intègre un sélecteur de mockups 3D (téléphone, affiche, etc.).
- Applique le QR code comme texture sur l'objet 3D.
- Ajoute des contrôles pour zoomer, tourner et déplacer la vue.
- UI avec `shadcn/ui` et Tailwind CSS.
```

### 5. **Configurer PostgreSQL avec Vercel Postgres**
**Prompt :**
```
Configure **PostgreSQL** pour ton micro-SaaS :
- Crée les tables : `users`, `qr_codes`, `subscriptions`, `analytics`.
- Requêtes utiles pour récupérer l’historique des QR codes, mettre à jour les scans, etc.
- Intégration avec Next.js (Server Actions ou API Routes).
```

### 6. **Créer une Landing Page avec Effets de Parallaxe**
**Prompt :**
```
Crée une landing page (`app/(marketing)/page.tsx`) avec :
- Navbar, Hero Section, Fonctionnalités, Tarifs, Témoignages, CTA Final, Footer.
- Effets de parallaxe avec `react-scroll-parallax`.
- Animations avec **Framer Motion** et **Lenis**.
- UI/UX avec `shadcn/ui` et Tailwind CSS.
- i18n avec `next-intl`.
- SEO avec des metadata.
```

### 7. **Configurer Resend pour l'Envoi d'Emails**
**Prompt :**
```
Configure **Resend** pour envoyer des emails transactionnels :
- Modèles d’emails : bienvenue, réinitialisation de mot de passe, magic link, notification de génération de QR code.
- Intégration avec Better Auth.
- Fonction utilitaire `sendEmail` pour envoyer des emails.
```

---

## **Bonnes Pratiques pour un Micro-SaaS Réussi**

1. **Monétisation** :
   - Lance avec un **plan gratuit limité** pour attirer des utilisateurs.
   - Propose un **essai gratuit de 7 jours** pour le plan Pro.
   - Utilise **Stripe** ou **Paddle** pour les paiements récurrents.

2. **Analytiques** :
   - Intègre **Plausible** ou **Google Analytics** pour suivre les performances.

3. **Feedback Utilisateurs** :
   - Ajoute un **bouton "Feedback"** dans l’application.
   - Utilise **Canny** ou **Upvoty** pour les suggestions.

4. **Marketing** :
   - Crée un **blog** (Next.js + MDX).
   - Optimise le **SEO** pour des mots-clés pertinents.
   - Partage sur les **réseaux sociaux**.

5. **Support** :
   - Ajoute une **FAQ** ou un **chatbot**.
   - Propose un **support par email** (via Resend).

6. **Scalabilité** :
   - Utilise **Vercel** pour le frontend et **Vercel Postgres** pour la base de données.

7. **Sécurité** :
   - **HTTPS** obligatoire.
   - **Rate limiting** sur les API.
   - **Sauvegardes automatiques** de la base de données.

8. **Tests** :
   - **Tests unitaires** (Jest + React Testing Library).
   - **Tests E2E** (Cypress ou Playwright).
   - **Tests de performance** (Lighthouse).


## **Ressources Utiles**
- **Next.js** : [Next.js Docs](https://nextjs.org/docs)
- **Better Auth** : [Better Auth Docs](https://better-auth.com/docs)
- **React Three Fiber** : [R3F Docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **Resend** : [Resend Docs](https://resend.com/docs)
- **shadcn/ui** : [shadcn/ui Docs](https://ui.shadcn.com/docs)
- **i18n** : [next-intl Docs](https://next-intl-docs.vercel.app/)
- **Parallaxe** : [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax)


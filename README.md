# DevisGo

DevisGo est une application SaaS de gestion pour petites entreprises et indépendants au Maroc.

## Ce que cette version contient

- Landing page et tarification
- Authentification Supabase (inscription, connexion, récupération du mot de passe)
- Onboarding entreprise
- Dashboard alimenté par PostgreSQL/Supabase
- Clients : création, modification, suppression, recherche et fiche client
- Services : création, modification, suppression et suggestions selon le type d'entreprise
- Rendez-vous : CRUD connecté à Supabase
- Français / العربية / English avec RTL pour l'arabe
- Schéma PostgreSQL + Row Level Security dans `supabase/schema.sql`

Les sections Devis, Factures, Abonnement et Page publique sont prévues dans le schéma et l'interface, mais ne doivent pas être présentées comme des paiements ou fonctions externes déjà opérationnels.

## 1. Installation

```bash
npm install
npm run dev
```

## 2. Configuration Supabase

Créez `.env.local` à la racine :

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY
```

La clé doit être la clé publique/publishable. **Ne mettez jamais `service_role` dans le frontend.**

## 3. Créer la base

Dans Supabase : **SQL Editor → New query** puis copiez tout le contenu de :

`supabase/schema.sql`

Ce script crée les tables, relations, index, RLS et le trigger qui crée automatiquement `profiles` après une inscription Auth.

## 4. Authentification

Dans Supabase → Authentication → URL Configuration, ajoutez :

```text
http://localhost:5173/reset-password
```

Ajoutez ensuite l'URL équivalente de votre domaine de production.

## 5. Storage

Le schéma contient les politiques pour un bucket `logos`. Créez le bucket `logos` dans **Storage** et rendez-le public si vous voulez afficher les logos sur une page publique.

## 6. Vérification

```bash
npm run build
```

Si les dépendances ne sont pas encore installées, lancez d'abord `npm install` depuis le dossier du projet.

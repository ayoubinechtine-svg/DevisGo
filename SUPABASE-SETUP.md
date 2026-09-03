# Connexion Supabase de DevisGo

## Variables locales

Le projet utilise :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Copiez `.env.example` vers `.env.local` puis renseignez vos valeurs.

## Base de données

1. Ouvrez votre projet Supabase.
2. Allez dans **SQL Editor**.
3. Créez une nouvelle requête.
4. Copiez tout `supabase/schema.sql`.
5. Cliquez sur **Run**.

Le script est conçu pour être relancé : il recrée/remplace les policies et triggers nécessaires sans demander de supprimer manuellement les tables.

## Auth

Dans **Authentication → URL Configuration** :

- ajoutez `http://localhost:5173/reset-password`
- ajoutez l'URL de production avec `/reset-password`

Le trigger PostgreSQL `handle_new_user` crée le profil dans `profiles` à chaque inscription Auth.

## Storage

Créez un bucket public nommé `logos` si vous voulez utiliser l'upload de logo. Le frontend ne doit jamais recevoir de clé `service_role`.

## Lancer

```bash
npm install
npm run dev
```

## Vérification

```bash
npm run build
```

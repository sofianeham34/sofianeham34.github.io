# Portfolio — Sofiane Hammar

Site personnel : [sofianeham34.github.io](https://sofianeham34.github.io).
Next.js (App Router) et TypeScript, exporté en site statique et hébergé sur GitHub Pages.
Français à la racine, anglais sous `/en`.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # génère le site statique dans out/
```

## Ajouter un projet

1. Ajoutez un objet au tableau `projects` dans [`content/projects.ts`](content/projects.ts).
   Le type `Project` liste les champs attendus ; chaque texte existe en `fr` et en `en`.
   L'ordre du tableau est l'ordre d'affichage, et le premier projet est mis en avant sur l'accueil.
2. Placez ses captures dans `public/img/<slug>/`.
3. Choisissez le type de démo (`demo.kind`) :
   - `iframe` : une application web compilée en version statique, copiée dans `public/demos/<slug>/` ;
   - `phone` : une application Android, avec une clé publique Appetize (`appetizeKey`) ou, à défaut, ses écrans ;
   - `agents` : le déroulé du système multi-agents, dont les données sont dans `content/agentRun.ts`.
4. Pour le citer dans la section Stack, ajoutez son slug aux technologies concernées dans [`content/site.ts`](content/site.ts).

La page `/projets/<slug>` est générée automatiquement dans les deux langues.

## Structure

```
app/(fr)/            pages françaises (/, /projets/[slug])
app/(en)/en/         pages anglaises (/en, /en/projets/[slug])
components/          accueil, page projet, démos, schéma d'architecture
content/             projets, stack, parcours, données de la démo multi-agents
lib/i18n.ts          libellés de l'interface et URL selon la langue
styles/globals.css   thème clair et sombre, mise en page
public/demos/        démos statiques d'Ace Arena et d'Ascendia
```

## Déploiement

Chaque push sur `main` lance [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), qui compile le site
et le publie sur GitHub Pages. Dans les réglages du dépôt, choisir **Pages → Source : GitHub Actions**.

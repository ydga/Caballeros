# Caballeros School News

An Astro news website for school announcements, with Sveltia CMS for authorized editors.

## Local development

```bash
npm install
npm run dev
```

## Publish

GitHub Pages must use **GitHub Actions** as the build source. The included workflow builds and deploys the site whenever changes are pushed to `main`.

## CMS login

Open `/admin/` on the deployed site and sign in with a GitHub personal access
token that has write access to this repository.

To edit the home page, use **Inicio** in the CMS to add or edit hero slides,
including their cover photos, titles, subtitles, and CTA links. You can also edit
the other home page button labels there. The slideshow advances automatically
and includes pause, arrow, and dot controls. The welcome message, school
introduction, and gallery content are edited under **Paginas**; the news section
is populated from **Noticias**.

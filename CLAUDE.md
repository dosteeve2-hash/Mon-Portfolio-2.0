# CLAUDE.md — Steeve Portfolio SDC

## Projet

**Portfolio personnel de Steve Donald Compaoré** — Software Engineer & Cybersecurity student, Tokat GOP, Turquie.

- **URL prod** : https://steeve-portfolio-mocha.vercel.app
- **Stack** : Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + next-intl
- **Repo** : `dosteeve2-hash/steeve-portfolio`
- **Local** : `C:\Users\pc\Documents\GitHub\steeve-portfolio`

---

## Charte graphique FORGE Afrika — Navy × Gold × Cyan

```css
--navy:  #0A1628   /* Fond principal */
--bg2:   #0e1f3d   /* Sections alternées */
--bg3:   #142b52   /* Cartes, modals */
--text:  #f5f0e8   /* Texte principal */
--text2: #9ba8c4   /* Texte secondaire */
--text3: #4e5f82   /* Placeholders */
--gold:  #D4AF37   /* Accent primaire — CTAs, highlights */
--gold2: #F5D67A   /* Gold clair */
--gold3: #b8962e   /* Gold foncé — hover */
--cyan:  #00BCD4   /* Accent secondaire */
```

Typographie : **Playfair Display** (titres, italic) · **Outfit** (body) · **JetBrains Mono** (codes, labels)
Tailwind config : `tailwind.config.ts` — tokens `bg.DEFAULT`, `gold.DEFAULT`, `accent.cyan`

---

## Architecture

```
app/
  [locale]/         — i18n via next-intl (fr / en)
components/
  CustomCursor.tsx  — curseur custom (desktop only)
  sections/         — Hero, About, Projects, Contact, etc.
data/
  projects.json     — liste des projets FORGE Afrika
messages/           — fr.json / en.json
```

---

## Règles

- TypeScript strict — zéro `any`
- Server Components par défaut, `'use client'` si animations/curseur
- `npm run build` → 0 erreur avant tout push
- Headers HTTP dans `next.config.ts` (X-Frame-Options, X-Content-Type-Options...)
- Toujours synchroniser `fr.json` et `en.json` pour chaque texte

### Mise à jour portfolio (Règle #6)
Quand un projet FORGE Afrika est livré :
1. Ajouter dans `data/projects.json`
2. Commit + push → Vercel CI/CD auto

---

## Karpathy Guidelines

1. **Réfléchis avant de coder** — expose les compromis, pose les questions en amont
2. **Simplicité d'abord** — code minimal, pas d'abstractions prématurées
3. **Modifications chirurgicales** — touche seulement ce qui est nécessaire
4. **Exécution orientée objectif** — `npm run build` → 0 erreur → commit → done

### Sécurité
- `getUser()` TOUJOURS côté serveur, jamais `getSession()`
- `.env.local` jamais commité
- Rate limit sur tous les endpoints AI : 20 req/user/heure

---

*Maintenu par Steve Donald Compaoré — FORGE Afrika*
*Dernière mise à jour : 2026-07-25*

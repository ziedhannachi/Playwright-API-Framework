# 🚀 PLAYWRIGHT-API-FRAMEWORK

![Playwright](https://img.shields.io/badge/Playwright-API-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Node](https://img.shields.io/badge/Node.js-18+-brightgreen?logo=node.js)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-success?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

> **ApiTestForge** est un framework professionnel d’automatisation des tests API basé sur **Playwright Test**.
>
> Il est conçu pour les **QA Engineers, Automaticiens, QA Tech Leads** et pour des usages **entreprise, formation et open-source**.

---

## 🎯 Objectifs du projet

- Fournir une **architecture API propre, maintenable et scalable**
- Appliquer les **bonnes pratiques Playwright & TypeScript**
- Séparer clairement **tests, services, fixtures et validations**
- Être **prêt CI/CD dès le premier commit**
- Servir de **template GitHub public**

---

## 🧱 Stack technique

- **Playwright Test** (API Testing)
- **TypeScript**
- **AJV** (JSON Schema Validation)
- **GitHub Actions** (CI)
- **JSONPlaceholder API** (API publique de démonstration)

---

## 📁 Architecture du projet

```
ApiTestForge/
│
├── src/
│   └── api/
│       ├── endpoints.ts           # Centralisation des routes
│       ├── restClient.ts          # Client HTTP générique
│       ├── fixtures/
│       │   └── api.fixture.ts     # Fixtures Playwright
│       ├── services/
│       │   └── postsService.ts    # Logique métier API
│       └── schemas/
│           └── post.schema.json   # JSON Schema (AJV)
│
├── tests/
│   └── api/
│       └── posts.spec.ts          # Tests API
│
├── configs/
│   └── env.ts                     # Variables d’environnement
│
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI GitHub Actions
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🔁 Méthodes API couvertes

✔ GET  
✔ POST  
✔ PUT  
✔ PATCH  
✔ DELETE  

Toutes les méthodes sont encapsulées dans des **services réutilisables**.

---

## 🧪 Exemple de test API

```ts
import { test, expect } from '../../src/api/fixtures/api.fixture';

test('POST /posts', async ({ posts }) => {
  const response = await posts.create({
    title: 'foo',
    body: 'bar',
    userId: 1
  });

  expect(response.status()).toBe(201);
});
```

---

## 🧬 Validation JSON Schema (AJV)

Chaque réponse API peut être validée via un **JSON Schema**.

```ts
import Ajv from 'ajv';
import schema from '../schemas/post.schema.json';

const ajv = new Ajv();
expect(ajv.validate(schema, responseBody)).toBeTruthy();
```

✔ Détection rapide des régressions API  
✔ Contrôle du contrat backend  

---

## 🧩 Fixtures Playwright (Best Practice)

Les services API sont injectés via des **fixtures Playwright**.

```ts
export const test = base.extend({
  posts: async ({ request }, use) => {
    await use(new PostsService(request));
  }
});
```

✅ Pas de `new` dans les tests  
✅ Gestion automatique du cycle de vie  

---

## ▶️ Installation

### Prérequis
- Node.js **18+**

### Installation

```bash
npm install
npx playwright install
```

---

## ▶️ Lancer les tests

### Tous les tests API

```bash
npm run test:api
```

### Un test spécifique

```bash
npx playwright test tests/api/posts.spec.ts
```

### Mode debug

```bash
npx playwright test --debug
```

---

## 📊 Rapport HTML

```bash
npx playwright show-report
```

---

## 🔄 CI GitHub Actions

Le projet inclut un pipeline CI prêt à l’emploi.

Déclenchement :
- `push`
- `pull_request`

Étapes :
- Installation Node
- Installation Playwright
- Exécution des tests API

📁 `.github/workflows/ci.yml`

---

## 🌍 Environnements

Les URLs et paramètres peuvent être gérés via :

```ts
configs/env.ts
```

(extensible vers `.env`, dev / qualif / prod)

---

## 🚀 Cas d’usage

- Framework entreprise
- Formation QA / automation
- Projet vitrine GitHub
- Base pour tests API avancés

---

## 🛣️ Roadmap (évolutions possibles)

- 🔐 Authentification (Bearer / OAuth)
- 🔁 Retry & timeout global
- 📜 Logging request / response
- 📦 Allure Report
- 🌐 Multi-environnements
- 📄 Contract testing avancé

---

## 📜 Licence

Ce projet est sous licence **MIT**.

---

## 👨‍💻 Auteur

**Zied Hannachi**  
QA Tech Lead | Test Automation | Playwright | CI/CD

---

⭐ Si ce projet t’aide, n’hésite pas à lui mettre une étoile sur GitHub !

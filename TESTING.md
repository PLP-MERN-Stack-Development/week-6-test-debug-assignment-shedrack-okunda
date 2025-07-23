# 🧪 Testing Guide for MERN Stack Application

This document outlines the testing strategies and practices used in this MERN stack application, including unit, integration, and end-to-end tests.

---

## 📁 Test Structure

```
project-root/
├── server/
│   ├── tests/
│   │   ├── unit/         # Unit tests (e.g., utils, services)
│   │   ├── integration/  # Integration tests (e.g., routes)
│   │   └── setup.js      # Test setup file (e.g., DB connection)
│
├── client/
│   ├── src/
│   │   └── __tests__/    # Frontend unit/component tests
│
├── cypress/             # Cypress E2E tests
│   ├── e2e/
│   │   ├── auth.cy.js
│   │   └── dashboard.cy.js
│   └── support/
```

---

## ✅ Test Categories

### 🔹 Unit Tests

Test individual components or functions in isolation.

-   **Backend**: services, utils, middleware
-   **Frontend**: components, hooks

Run:

```bash
npm run test:unit
```

---

### 🔹 Integration Tests

Test interactions between multiple modules or systems.

-   Example: Auth routes, User creation/login, Post creation

Run:

```bash
NODE_ENV=test npm run test:integration
```

---

### 🔹 End-to-End (E2E) Tests

Simulate real user interactions using Cypress.

-   Register, login, view dashboard

Run Cypress:

```bash
npx cypress open
# OR for headless run
npx cypress run
```

---

## 📊 Code Coverage

Jest is configured to collect coverage metrics.

Run all tests with coverage:

```bash
npm run test:coverage
```

Coverage thresholds are set to:

```json
"coverageThreshold": {
  "global": {
    "branches": 70,
    "functions": 70,
    "lines": 70,
    "statements": 70
  }
}
```

Check `coverage/lcov-report/index.html` for report.

---

## 🛠 Debugging Tools

-   `console.log` / `console.error` with custom context
-   Express global error handler
-   React error boundaries
-   DevTools & Redux DevTools

---

## 🧪 Cypress Test Coverage Plan

### `auth.cy.js`

-   ✅ User can register
-   ✅ User can login
-   ❌ Invalid login shows error
-   ❌ Login redirects to dashboard

### `dashboard.cy.js`

-   ❌ Dashboard loads user info
-   ❌ User can logout

---

## 📝 Notes

-   Backend uses `supertest` + `jest`
-   Frontend uses `@testing-library/react`
-   E2E uses `Cypress`
-   Add `.env.test` for test DB config

---

## 🚀 Contribution

-   Write descriptive test names
-   Isolate tests (reset DB or mocks)
-   Keep tests fast & deterministic

Happy Testing! 💻✨

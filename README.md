
# FakeStore React Application

A modern React e‑commerce SPA built with React 18 + Vite. It integrates the FakeStore API for product discovery, includes admin‑style create/edit flows, and ships with a persistent cart powered by Redux Toolkit and React Query. Optional Firebase Authentication protects editor pages. Production is hosted on Vercel with a GitHub Actions CI/CD pipeline.

**Live site:** https://fake-store-react-application.vercel.app/

---

## ✨ Features
- Browse products from a live external API with search and category filters.
- Product detail page with rating stars and quantity selection.
- Add, edit, and delete product flows (simulated writes against the FakeStore API).
- Auth‑gated Add/Edit pages via Firebase Authentication.
- Cart overlay with add/update/remove, live totals, and persistent storage.
- Checkout flow that creates a demo order and clears the cart.
- Profile page with (demo) order history.
- Reusable UI components (alert overlay, rating stars, title header, product card, category option builder).
- Responsive styling using Bootstrap + custom CSS.

## 🧭 Routing & Pages (React Router v6)
- `/`, `/home` → Home
- `/product-listing` → Product listing with search & category filtering
- `/view-product?productid=ID` → Product detail + add to cart
- `/add-product` → Create product (protected)
- `/edit-product?productid=ID` → Update/delete product (protected)
- `/checkout` → Shipping/payment form (creates order and clears cart)
- `/profile` → Basic user info + order history

## 🧩 Components (selected)
Header (nav, cart toggle, search, category select), Cart & CartItem, Product card, RateStar, Alert overlay, TitleHeader, and a category `<option>` helper.

## 🌐 Data Fetching (FakeStore API)
- Categories: `https://fakestoreapi.com/products/categories`
- Products: list and single product endpoints
- No API key required

## 🔐 Authentication & Access
Firebase Authentication powers sign‑in. Protected routes gate Add/Edit Product pages. Some sensitive actions may require recent login (reauthentication).

## 🧠 State Management (Redux Toolkit)
- Store configured with `configureStore({ reducer: { cartData } })`.
- Cart slice actions: `addToCart`, `updateItem`, `removeItem`, `setCart`, `loadCart`, `resetCart`, and helpers like `updateCartStatus`/`tallyCart` to derive `total` and `items`.
- `store.subscribe` persists the cart to `localStorage` under the key `cart-1`.

## 💾 Persistence
- Cart and demo orders use `localStorage` for offline‑friendly behavior and rehydration on load.

## 🎨 Styling
Global styles in `index.css`; overlays in `cart.css` and `alert.css`; admin/editor in `common.css`; checkout in `checkout.css`; orders in `orders.css`.

## 🗂️ Representative Project Structure
```
src/
├─ App.jsx
├─ main.jsx
├─ index.css
├─ assets/RatingStar.png
├─ components/
│  ├─ Header.jsx
│  ├─ Cart.jsx
│  ├─ CartItem.jsx
│  ├─ Product.jsx
│  ├─ RateStar.jsx
│  ├─ Alert.jsx
│  ├─ TitleHeader.jsx
│  └─ catagoryOption.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ ProductListing.jsx
│  ├─ ViewProduct.jsx
│  ├─ AddProduct.jsx
│  ├─ EditProduct.jsx
│  ├─ CheckOut.jsx
│  └─ Orders.jsx
└─ state/
   ├─ Store.jsx
   └─ slices/cartslice.jsx
```

## 🛠️ Tech Stack
React 18 + Vite • React Router v6 • @tanstack/react-query • Redux Toolkit + React Redux • Firebase Auth • Bootstrap + React‑Bootstrap

## 🚀 Local Development
```bash
git clone https://github.com/Jonathanch2022/FakeStore-React-Application.git
cd FakeStore-React-Application
npm install
npm run dev   # http://localhost:5173
```
Optional `.env` for Firebase:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

## 🧪 Testing
Jest + React Testing Library for unit/integration tests (rendering, interactions, reducers, and cart math).

Run locally:
```bash
npm test
```

---

# 🔁 CI/CD — GitHub Actions → Vercel (added)
**Flow:** Push/PR → install + test → on push to `main`/`master`, pull Vercel env → build → deploy (only if tests passed).

**Required repo secrets:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

**Workflow example (`.github/workflows/ci-deploy.yml`):**
```yaml
name: CI & Deploy

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

concurrency:
  group: vercel-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --ci --watchAll=false

  deploy:
    needs: test
    if: ${{ github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master') }}
    runs-on: ubuntu-latest
    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npx vercel pull --yes --environment=production
      - run: npx vercel build --prod
      - run: npx vercel deploy --prebuilt --prod
```

> Tip: Don’t pass the token via CLI flags if you can avoid it. Let the Vercel CLI read `VERCEL_TOKEN` from the environment to prevent whitespace/quote issues.

## 🌐 Deployment on Vercel
- This is a static Vite build deployed on Vercel.
- For client‑side routing (deep links like `/product-listing`) add a SPA fallback in the project root:

`vercel.json`
```json
{
  "rewrites": [
    { "source": "/((?!.*\..*|_next).*)", "destination": "/index.html" }
  ]
}
```

**Header navigation:** Use React Router links with React‑Bootstrap to avoid full reloads:
```jsx
<Nav.Link as={NavLink} to="/product-listing">Shop</Nav.Link>
```

## 📦 NPM Scripts
- `dev` — Vite dev server
- `build` — Production build
- `preview` — Preview local production build
- `test` — Run Jest tests

## 📄 License
GPL‑2.0 — see `LICENSE.txt`.

—
Last updated: 2025-10-01

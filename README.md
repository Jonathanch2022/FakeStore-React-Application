# FakeStore React Application

A modern React storefront that integrates the **FakeStore API** for product discovery, simple admin-style create/edit flows, and a live, interactive cart powered by **Redux Toolkit** and **React Query** — with **Firebase Authentication** gated admin pages and a **Profile + Order History** experience.

> This README merges your original sections (Features, Routing & Pages, Components, Data Fetching, State, Persistence, Styling, File Structure, Tech, Setup, Developer Notes) and adds recent capabilities (auth, profile/orders) and a dated changelog based on your commits.


## ✨ Features

- Browse products from a live external API (FakeStore)
- Search & category filtering via URL query parameters
- Detailed product view with rating stars and quantity selection
- **Admin-style add, edit, and delete product flows** (simulation to FakeStore API)
- **Auth-gated admin pages** (Add/Edit) via Firebase Authentication
- Cart overlay: add/update/remove items, live totals
- Checkout: shipping + payment form, order confirmation, and a simple local order history
- **Profile page with Order History**
- Persistent state: cart and (demo) orders via `localStorage`
- Reusable components: alert overlay, rating stars, title header, product card, category `<option>` builder
- Responsive styling using Bootstrap + custom CSS


## 🧭 Routing & Pages (React Router v6)

- `/`, `/home` → Home: intro/hero + CTA to shop
- `/product-listing` → ProductListing: list, search, and category filtering
- `/view-product?productid=ID` → ViewProduct: product details + rating + add to cart
- `/add-product` → AddProduct: create product form (validation + POST) **(protected)**
- `/edit-product?productid=ID` → EditProduct: update/delete product (PUT/DELETE) **(protected)**
- `/checkout` → CheckOut: shipping & payment form; creates an order and clears cart
- `/profile` → Profile: show basic user info and **order history**


## 🧩 Components (selected)

- **Header.jsx** — top navigation (Home, Shop, Add Product), cart toggle, search to `?search=...`, category `<select>` to `?category=...`
- **Cart.jsx** — overlay cart reading Redux (`cartList`, `total`, `items`); hydrates from `localStorage`; click‑outside to close
- **CartItem.jsx** — image, title, price×qty; quantity input dispatches `updateItem({ id, quantity })`
- **Product.jsx** — card (image, title, price, stars, View/Add)
- **RateStar.jsx** — “Rating(s)” label with star icons (`assets/RatingStar.png`)
- **Alert.jsx** — reusable overlay for success/error
- **TitleHeader.jsx** — consistent section headings
- **catagoryOption.jsx** — category `<option>` builder + `OptionsCategory` helper


## 🔌 Data Fetching (FakeStore API)

- Categories: `https://fakestoreapi.com/products/categories`
- Products: list & single in `ProductListing.jsx` / `ViewProduct.jsx`
- No API key required


## 🗳️ Authentication & Access

- **Firebase Authentication** powers sign-in.
- **Protected routes**: Add/Edit Product require an authenticated user.
- Sensitive actions (e.g., account delete) may require **recent login** — reauthenticate first.


## 🛒 State Management (Redux Toolkit)

- Store configured in `Store.jsx` with `configureStore({ reducer: { cartData } })`.
- Cart slice (`state/slices/cartslice.jsx`) APIs:
  - `addToCart` — add or increment
  - `updateItem` — set quantity
  - `removeItem` — remove by id
  - `setCart` / `loadCart` — hydrate/replace from storage
  - `resetCart` — clear
  - `updateCartStatus` — derive totals / item count
  - `tallyCart(itemList)` — helper for `total` and `items`
- `store.subscribe` persists cart to `localStorage` (`cart-1`).


## 💾 Persistence

- **Cart**: saved to `localStorage` as `cart-1`, loaded on boot.
- **Orders**: (demo) can be saved/loaded from `localStorage` via `Orders.jsx`.


## 🎨 Styling

- Global: `index.css`
- Overlays: `cart.css`, `alert.css`
- Admin/editor: `common.css`
- Checkout: `checkout.css`
- Orders: `orders.css`


## 🗂️ Suggested File Structure (representative)

```
src/
├─ App.jsx
├─ main.jsx
├─ index.css
├─ assets/
│  └─ RatingStar.png
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
   └─ slices/
      └─ cartslice.jsx
```


## 🧱 Tech Stack

- React 18 + Vite
- React Router v6
- **@tanstack/react-query**
- **Redux Toolkit** + React Redux
- **Firebase Auth**
- Bootstrap + React‑Bootstrap


## ⚙️ Installation & Setup

### 1) Clone & Install
```bash
git clone https://github.com/Jonathanch2022/FakeStore-React-Application.git
cd FakeStore-React-Application
npm install
```

### 2) (Optional) Environment for Firebase
Create a `.env` with your Firebase config if enabling auth:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
# etc.
```

### 3) Providers (in `main.jsx`)
```tsx
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./state/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
```

### 4) Run / Build
```bash
# Vite dev
npm run dev       # http://localhost:5173
# Build & preview
npm run build
npm run preview
```

## 📄 License

**GPL‑2.0** — see [`LICENSE.txt`](./LICENSE.txt).


---

Made by **Jonathan Hubbard** — API integration, Redux‑powered global state, and modular React architecture.  
_Last updated: Sep 24, 2025_

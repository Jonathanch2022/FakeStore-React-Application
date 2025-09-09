# 🛒 FakeStore React Application

A modern React storefront that integrates the **FakeStore API** for product discovery, simple admin-style create/edit flows, and a live, interactive cart powered by **Redux Toolkit** and **React Query**. The app uses **React Router v6** for page routing and **Bootstrap / React‑Bootstrap** for fast, consistent UI.

## ✨ Features

- **Browse products** from a live external API (FakeStore)
- **Search & category filtering** via URL query parameters
- **Detailed product view** with rating stars and quantity selection
- **Admin-style** add, edit, and delete product flows (simulation)
- **Cart overlay**: add/update/remove items, live totals
- **Checkout**: shipping + payment form, order confirmation, and a simple local order history
- **Persistent state**: cart and orders via `localStorage`
- **Reusable components**: alert overlay, rating stars, title header, product card, category `<option>` builder
- **Responsive styling** using Bootstrap + custom CSS

---

## 🧭 Routing & Pages

Routes are defined in `App.jsx` using **React Router v6**:

- `/`, `/home` → **Home**: Intro/hero with CTA linking to the shop
- `/product-listing` → **ProductListing**: List, search, and category filtering
- `/view-product?productid=ID` → **ViewProduct**: Product details + rating + add to cart
- `/add-product` → **AddProduct**: Create product form (validation + POST)
- `/edit-product?productid=ID` → **EditProduct**: Update/delete product (PUT/DELETE)
- `/checkout` → **CheckOut**: Shipping & payment form; creates an order and clears cart

### `Home.jsx`
Simple hero + CTA that navigates to the product listing page.

### `ProductListing.jsx`
- Fetches products with **React Query** (a shared `getProduct` util is used for list/single fetches).
- Reads `search` and `category` from `location.search` and a `productListingContext` value.
- Filters the fetched array and renders a grid of `<Product />` cards.
- Passes `rating`/`ratingCount` to the rating stars component.

### `ViewProduct.jsx`
- Reads `productid` from the URL.
- Fetches product details with **React Query** (reusing the listing fetcher).
- Displays image, price, category, stock badge, description, and rating via **RateStar**.
- Quantity input (defaults to 1); **Add to Cart** uses the cart handler; **Edit** navigates to `/edit-product?productid=...`.

### `AddProduct.jsx`
- Admin-style create form with client-side validation and an **Alert** overlay for UX feedback.
- Composes a product object and **POSTs** to `https://fakestoreapi.com/products`.
- Uses `react-bootstrap/Button` for the UI.

### `EditProduct.jsx`
- Reads `productid` from the URL; loads product into controlled form state.
- Uses **React Query `useMutation`** to **PUT** updates and **DELETE** products.
- Client-side validation toggles visible alerts; includes a hidden file input for image selection.
- Success/error surfaced via **AlertBox**.

### `CheckOut.jsx`
- Full shipping + payment form with validation.
- Pulls `cartList`, `total`, and `items` from Redux; computes **shipping** and **tax**.
- On submit: composes an order via the `order` class, shows an Alert, **resets the cart**, and can display simple order history.

### `Orders.jsx`
- `class order` models a checkout with full billing/shipping fields, line items, totals, timestamps.
- `order.createOrder(form)` builds an order from the checkout form inputs and saves it to an in-memory array with optional `localStorage` support.
- The `Orders` component can render a minimal order history section.

---

## 🧩 Components

### `Header.jsx`
- Top navigation with **Home**, **Shop**, **Add Product**, and a **cart icon** that toggles the cart overlay.
- Search bar submits to `/product-listing?search=...`.
- Category `<select>` navigates to `/product-listing?category=...`; also updates a `productListingContext` used by the listing page.

### `Cart.jsx`
- Overlay cart that reads from Redux (`cartList`, `total`, `items`). 
- Loads/hydrates from `localStorage` on mount if present.
- Recalculates totals using a shared helper and dispatches a status update.
- Click-outside logic collapses the overlay.

### `CartItem.jsx`
- Shows item image, title, price × qty; quantity input dispatches `updateItem({ id, quantity })` on change/blur.
- Keeps in sync with Redux (no need to rebuild React element arrays).

### `Product.jsx`
- Product card with image, title, **price**, rating stars, and buttons:
  - **View**: navigates to the details page
  - **Add to Cart**: calls the cart handler

### `RateStar.jsx`
- Displays a “Rating(s)” label and renders rounded star icons using `assets/RatingStar.png`.

### `Alert.jsx` + `alert.css`
- Reusable overlay with a title, message area, optional loading indicator/image, and a **Close** control.

### `TitleHeader.jsx`
- Tiny atom to render consistent section headings (`.title-header`).

### `catagoryOption.jsx`
- Category `<option>` builder component plus an `OptionsCategory` helper.

---

## 🌐 Data Fetching (FakeStore API)

- Categories are fetched in `App.jsx` via **React Query** (`useQuery`) from  
  `https://fakestoreapi.com/products/categories` and rendered with `CategoryOption`.
- Products are fetched in `ProductListing.jsx` / `ViewProduct.jsx` (list and single).  
- **No API key required**. Ensure network access while developing.

---

## 🛠️ State Management (Redux Toolkit)

- Store is configured in `Store.jsx` with `configureStore({ reducer: { cartData } })`.
- **Cart slice** (`state/slices/cartslice.jsx`) exposes:
  - `addToCart` — add new item or increment an existing item’s quantity
  - `updateItem` — set a specific item’s quantity
  - `removeItem` — remove an item by id
  - `setCart` / `loadCart` — hydrate/replace cart from storage
  - `resetCart` — clear the cart
  - `updateCartStatus` — write derived totals and item count to state
  - `tallyCart(itemList)` — helper that computes `total` and `items`
- `store.subscribe` persists the cart list to `localStorage` under the key **`cart-1`**.

> **Tip:** Keep the cart as the single source of truth in Redux. Derive UI directly from data; avoid storing React elements in state.

---

## 💾 Persistence

- **Cart**: saved to `localStorage` as `cart-1`; loaded on boot (via `loadCart`).
- **Orders**: `Orders.jsx` can load/save a simple order history (e.g., `localStorage`) for demo purposes.

---

## 🎨 Styling

- **Global styles**: `index.css`
- **Cart overlay**: `cart.css`
- **Alert overlay**: `alert.css`
- **Admin/editor**: `common.css`
- **Checkout layout**: `checkout.css`
- **Orders view**: `orders.css`

These styles cover product cards, rating rows, header banner, cart overlay transitions, form layouts, and responsive adjustments.

---

## 📁 Suggested File Structure (representative)

```
src/
├─ App.jsx
├─ main.jsx
├─ index.css
├─ assets/
│  ├─ RatingStar.png
│  └─ (header banner, cart icons, etc. referenced by CSS)
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

> Your actual folders may differ slightly; adjust imports accordingly. (For example, some CSS files may live at `src/` root rather than under a `css/` folder.)

---

## 🧰 Tech Stack

- **React 18**
- **Vite** (recommended dev server) or CRA
- **React Router v6**
- **@tanstack/react-query** (data fetching/caching)
- **Redux Toolkit** + **React Redux** (cart state)
- **Bootstrap** + **React-Bootstrap**

---

## ⚙️ Installation & Setup

### 1) Clone & install
```bash
git clone https://github.com/yourusername/fakestore-react.git
cd fakestore-react
npm install
```

### 2) Providers (already wired in `main.jsx`)
Make sure your root wraps `<App />` with both providers:
```jsx
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./state/Store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
```

Also import Bootstrap styles once (e.g., in `main.jsx`):
```js
import "bootstrap/dist/css/bootstrap.min.css";
```

### 3) Run the app
- **Vite:**
  ```bash
  npm run dev
  # open http://localhost:5173
  ```
- **Create React App:**
  ```bash
  npm start
  # open http://localhost:3000
  ```

### 4) Build/preview (Vite)
```bash
npm run build
npm run preview
```

---

## 🔎 Developer Notes

- Inputs that feel “read-only” are usually controlled without updating state in `onChange`. Ensure `value` pairs with a setter (or use `defaultValue` for uncontrolled inputs).
- In React 18 **Strict Mode (dev)**, components may render twice; this is normal and helps catch side effects.
- Keep **derived calculations** (e.g., cart totals) in reducers or a central helper and call once per update to avoid extra renders.
- Use **URL-driven filtering** so users can deep link to a specific view (e.g., `?search=chair&category=furniture`).

---

## 📄 License

MIT (add a `LICENSE` file in the repository root).

---

**Created by Jonathan Hubbard** — demonstrating API integration, Redux-powered global state, and a modular React architecture.

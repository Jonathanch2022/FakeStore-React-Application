🛒 FakeStore React Application

FakeStore is a modern, fully functional e-commerce frontend built with React. It integrates the FakeStore API to provide users with a simulated shopping experience that includes product listing, searching, viewing, editing, and cart management. This app is structured with reusable components, a global cart context, and persistent state via localStorage.

🚀 Features

Browse products from a live external API

Search functionality with query param filtering

Detailed product views and editing capabilities

Add, update, and delete products (admin simulation)

Interactive cart using context and localStorage

Modular component-based architecture

Form validation and user input handling

🗂️ Pages Overview

Home.jsx

Welcomes users with an intro

Navigation to product listing

ProductListing.jsx

Fetches and displays all products

Supports search filtering via URL query

Adds products to cart

ViewProduct.jsx

Displays detailed info about a product

Add to cart with quantity selection

Navigate to edit page

AddProduct.jsx

Admin-style page to create new products

Validates input before POSTing to API

EditProduct.jsx

Fetches product details by ID

Allows updating or deleting the product

📦 Components

Header.jsx

Navbar with navigation links

Integrated search bar

Toggleable cart icon

Cart.jsx

Container for cart items (shown/hidden dynamically)

CartItem.jsx

Displays individual cart item details

Allows quantity editing and removal

Product.jsx

Displays product summary with "View" and "Add to Cart" buttons

RateStar.jsx

Renders visual star rating based on rating value

🌐 State Management

CartContext.jsx

Provides cartItems and setCartItems via Context API

Used by components like CartItem to sync cart state

CartData Class

Centralized class for constructing and storing cart item data

Includes logic for updating and removing items

💾 Persistence

Cart data is saved to localStorage for session persistence

Product data is fetched live via fetch() from FakeStore API

📁 File Structure

src/
├── components/
│   ├── Header.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Product.jsx
│   ├── RateStar.jsx
│   └── CartContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── ProductListing.jsx
│   ├── ViewProduct.jsx
│   ├── AddProduct.jsx
│   └── EditProduct.jsx
└── assets/
    ├── shoppingCart.png
    ├── placeholder.png
    └── RatingStar.png

🧪 Getting Started

Clone the repo:

git clone https://github.com/yourusername/fakestore-react.git
cd fakestore-react

Install dependencies:

npm install

Run the app:

npm start

Open http://localhost:3000 in your browser

🔮 Future Improvements

Authentication for product editing

Better error handling on API failures

Responsive mobile layout

Backend for real product management

📄 License

This project is open-source and available under the MIT License.

Created with ❤️ by Jonathan Hubbard – FakeStore is built to demonstrate full-stack integration, dynamic UI updates, and context-based global state.


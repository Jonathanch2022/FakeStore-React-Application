# FakeStore React Application 🛒

[⬇️ **Download the latest source (ZIP)**](https://github.com/Jonathanch2022/FakeStore-React-Application/archive/refs/heads/master.zip)

---

## Overview

**FakeStore React Application** is a modern e-commerce demo built with React. It fetches real-time data from the Fake Store API and allows users to browse, search, and view product details. The app demonstrates frontend development skills, API integration, component reusability, and state management in React.

---

## Features

- 🛍️ Product listing and category filtering  
- 🔍 Search functionality  
- 🧾 Product detail view  
- 💾 Persistent cart using localStorage  
- ⚙️ State management using React Context or Redux Toolkit  
- 🧭 Navigation via React Router  
- 🧑‍💻 Modern component-based architecture  
- 📱 Responsive UI for desktop and mobile

---

## Tech Stack

- **Frontend:** React, Vite, JSX  
- **State Management:** React Context / Redux Toolkit  
- **Routing:** React Router DOM  
- **API:** Fake Store API  
- **Styling:** CSS / Bootstrap / Custom components

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Jonathanch2022/FakeStore-React-Application.git
   cd FakeStore-React-Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```bash
   http://localhost:5173
   ```

---

## Project Structure

```
FakeStore-React-Application/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── state/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

---

## API Endpoints

This app uses the [Fake Store API](https://fakestoreapi.com/) to fetch data.

**Examples:**
- `GET /products` → List all products  
- `GET /products/:id` → Get product details  
- `GET /products/categories` → List categories  
- `GET /products/category/:category` → Filter by category  

---

## Testing

Run unit and integration tests using:
```bash
npm test
```

Ensure your tests cover:
- Component rendering  
- User interactions (e.g., adding to cart)  
- API responses and UI updates

---

## Deployment

You can deploy this project easily to **Vercel** or **Netlify**.  
For Vercel:
```bash
npm run build
vercel deploy
```

---

## Future Enhancements

- 🧺 Checkout and order summary pages  
- 🔐 Auth0 authentication  
- 🧠 Advanced Redux selectors  
- 💳 Payment gateway integration  
- 🧪 Continuous Integration & Deployment (CI/CD)

---

## Contributing

Pull requests are welcome!  
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Add new feature"`)  
4. Push to your branch (`git push origin feature-name`)  
5. Submit a pull request

---

## License

This project is licensed under the MIT License.

---

## Author

👨‍💻 **Jonathan Hubbard**  
Full Stack Developer | React | Java | Python  
GitHub: [Jonathanch2022](https://github.com/Jonathanch2022)


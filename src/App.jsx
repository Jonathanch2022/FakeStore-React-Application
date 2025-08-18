
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Home  from "./pages/Home"
import AddProduct  from "./pages/AddProduct" 
import EditProduct  from "./pages/EditProduct"
import ViewProduct  from "./pages/ViewProduct"
import ProductListing from "./pages/ProductListing"


function App() {
  

  return (

      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product" element={<EditProduct />} />
              <Route path="/view-product" element={<ViewProduct />} />
              <Route path="/product-listing" element={<ProductListing />} />
              
          </Routes>

      </Router>

  )
}

export default App

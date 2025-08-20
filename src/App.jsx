
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Home  from "./pages/Home"
import AddProduct  from "./pages/AddProduct" 
import EditProduct  from "./pages/EditProduct"
import ViewProduct  from "./pages/ViewProduct"
import ProductListing, {productListingContext } from "./pages/ProductListing"
import { HeaderContext } from "./components/Header.jsx"
import CategoryOption from "./components/catagoryOption.jsx"
import {useState} from "react"


export default function App() {
  
    const options = [];
    const productCollection = [];
    const [search, setSearch] = useState("");
    const [shopCatagory, setShopCatagory] = useState("");
    const [products, setProducts] = useState(productCollection);
    const [cartItems, setCartItems] = useState([]);
    options.push(<CategoryOption name="men's clothing" selected={false} key="Test-Options" value="men's clothing" />);

    return (
        <productListingContext.Provider value={{ productCollection, search, setSearch, shopCatagory, setShopCatagory, products, setProducts, cartItems, setCartItems }}>
        <HeaderContext.Provider value={{ options }}>
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
            </HeaderContext.Provider>
        </productListingContext.Provider>


    );
}

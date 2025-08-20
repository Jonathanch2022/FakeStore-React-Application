
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Home  from "./pages/Home"
import AddProduct  from "./pages/AddProduct" 
import EditProduct  from "./pages/EditProduct"
import ViewProduct  from "./pages/ViewProduct"
import ProductListing, {productListingContext } from "./pages/ProductListing"
import { HeaderContext } from "./components/Header.jsx"
import CategoryOption from "./components/catagoryOption.jsx"
import { useState, useEffect } from "react"

async function getCategories() {

    let results = await fetch("https://fakestoreapi.com/products/categories").then((data) => {

        if (data.ok) {

            return (data.json());
        }
    }).then((a) => {

        return (a);
    })
    return (results);
}

export default function App() {
  
 
   
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [shopCatagory, setShopCatagory] = useState("All");
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

            getCategories().then(data => {


                let list = data.map((cat) => {

                    return (<CategoryOption name={cat} selected={false} />)

                });
                setOptions(list);
            })
        
    },[])
    return (
        <productListingContext.Provider value={{ search, setSearch, shopCatagory, setShopCatagory, products, setProducts, cartItems, setCartItems }}>
        <HeaderContext.Provider value={{ options,setOptions }}>
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

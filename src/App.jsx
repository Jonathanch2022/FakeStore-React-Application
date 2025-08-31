
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Home  from "./pages/Home"
import AddProduct  from "./pages/AddProduct" 
import EditProduct  from "./pages/EditProduct"
import ViewProduct  from "./pages/ViewProduct"
import ProductListing, {productListingContext } from "./pages/ProductListing"
import { HeaderContext } from "./components/Header.jsx"
import CategoryOption, { OptionsCategory } from "./components/catagoryOption.jsx"
import { useState, useEffect } from "react"
import Cart, { CartContext, getCartItems, CartData } from "./components/Cart.jsx";
import {useQuery} from "@tanstack/react-query"
import CartItem from './components/CartItem'



async function getCategories() {

    
    let results = await fetch("https://fakestoreapi.com/products/categories").then((data) => {

        if (data.ok) {

            return (data.json());
        }
    })

    return (results);
}


export default function App() {



    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [shopCatagory, setShopCatagory] = useState("All");
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotle, setCartTotle] = useState(0);
    const [cartItemCount, setCartItemCount] = useState(0);
    const { data, isLoading, error } = useQuery({ queryKey: ['categories'], queryFn: getCategories });
  

    useEffect(() => {

        if (isLoading) {

            console.log("Loading...");
        }
        else {

            let list = data.map((cat) => {

                return (<CategoryOption key={OptionsCategory.getId()} name={cat} selected={false} />)
            });

            setOptions(list);

        }


    }, [isLoading])

    const updateCartList = () => {

        localStorage.setItem("cart-data", JSON.stringify(Array.from(cartItems)));
    }
    const updateCartItem = (id,quantity) => {
       
      let newCartList =  cartItems.map((item) => {

            if (item.props.id == id) {

                return (<CartItem key={item.props.id} id={item.props.id} title={item.props.title} quantity={quantity} price={item.props.price} image={item.props.image} />)
            }
            else {

                return (<CartItem key={item.props.id} id={item.props.id} title={item.props.title} quantity={item.props.quantity} price={item.props.price} image={item.props.image} />)
            }
      })
        setCartItems(newCartList);
        return (newCartList);
       
    }
    const handleAddToCart = (e) => {


        let qty = e.target.getAttribute("data-qty");
        let itemData = JSON.parse(e.target.getAttribute("data-item"));
     
         if(!CartData.cartList.get(itemData.id)) {

             let item = new CartData(itemData.id, itemData.title, itemData.price, (itemData.imageSrc) ? itemData.imageSrc : itemData.image, itemData.description, (qty != null) ? qty : itemData.quantity);
           
             updateCartList();
             setCartItems(returnCartItems(CartData.cartList.values()));
             


        }
       

    }
    const returnCartItems = (list) => {

        if (list) {
            let itemList = Array.from(list).map((cartItem) => {

                return (<CartItem key={cartItem.id} id={cartItem.id} title={cartItem.title} quantity={cartItem.quantity} price={cartItem.price} image={cartItem.image} />)
            });
            
            return (itemList);
        }
        else {
            return ([]);
        }
    }
    const handleRemove = (e) => {
        
        let prdid = e.target.getAttribute("data-itemid");
        CartData.cartList.delete(parseInt(prdid));
        updateCartList();
        setCartItems(returnCartItems(CartData.cartList.values()));
       

    }
    const updateQuantity = (e) => {

        let itemid = parseInt(e.target.getAttribute("data-itemid"));
        CartData.cartList.get(itemid).quantity = e.target.value;
        updateCartList();

    }
    return (

        <CartContext.Provider value={{ updateQuantity, setCartItemCount, cartItemCount, cartTotle, setCartTotle, cartItems, setCartItems, updateCartList, handleAddToCart, handleRemove, returnCartItems, updateCartItem }}>
        <productListingContext.Provider value={{ search, setSearch, shopCatagory, setShopCatagory, products, setProducts}}>
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
            </CartContext.Provider>
        


    );
}

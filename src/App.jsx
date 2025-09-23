
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home  from "./pages/Home"
import AddProduct  from "./pages/AddProduct" 
import EditProduct  from "./pages/EditProduct"
import ViewProduct from "./pages/ViewProduct"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import { auth } from "./firebaseConfig"
import ProductListing, {productListingContext } from "./pages/ProductListing"
import { HeaderContext } from "./components/Header.jsx"
import CategoryOption, { OptionsCategory } from "./components/catagoryOption.jsx"
import { useState, useEffect } from "react"
import { CartContext} from "./components/Cart.jsx";
import {useQuery} from "@tanstack/react-query"
import CartItem from './components/CartItem'
import CheckOut from './pages/CheckOut.jsx'
import {removeItem,addToCart } from "./state/slices/cartslice"
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged, signOut } from "firebase/auth"
import UserProfile from "./pages/UserProfile"



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
    const { data, isLoading} = useQuery({ queryKey: ['categories'], queryFn: getCategories });
    const ItemsList = useSelector((state) => state.cartData.cartList);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    useEffect(() => {

        if (!isLoading) {

            let list = data.map((cat) => {

                return (<CategoryOption key={OptionsCategory.getId()} name={cat} selected={false} />)
            });

            setOptions(list);

        }


    }, [isLoading])
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);
        });
        return () => unSubscribe();
    }, [])

  
    const updateCart = () => {

      
        let list = [];
        let itemc = 0;
        let totalc = 0;
        const results = {

            cartList:[],
            total:0,
            items:0
        }

        

        if (ItemsList) {

           
            list = ItemsList.map((item) => {
                itemc += item.quantity;
                totalc += item.price * item.quantity;


                return (

                   
                    <CartItem key={item.id} id={item.id} title={item.title} quantity={item.quantity} price={item.price} image={item.imageSrc} />
                )
            });
            results.total = totalc;
            results.items = itemc;
            results.cartList = list;

            return (results);
        }
        else {
            results.cartList = [];
            results.items = 0;
            results.total = 0;

            return (results);
        }
       
    }
    const handleAddToCart = (e) => {

      
        let qty = parseInt(e.target.getAttribute("data-qty"));
       
        let itemData = JSON.parse(e.target.getAttribute("data-item"));
       
        const prd = {
            description: itemData.description,
            id: itemData.id,
            image: (itemData.imageSrc) ? itemData.imageSrc : itemData.image,
            price: itemData.price,
            quantity: (itemData.quantity) ? parseInt(itemData.quantity) : (qty < 1) ? 1:qty,
            rating: itemData.rating,
            ratingCount: itemData.ratingCount,
            title: itemData.title
               
        }
      
        dispatch(addToCart(prd));
        
       
                
             

    }
    const returnCartItems = (list) => {

        if (list) {
            let itemList = Array.from(list).map((cartItem) => {

                return (<CartItem key={cartItem.id} id={cartItem.id} orginid={cartItem.id} title={cartItem.title} quantity={cartItem.quantity} price={cartItem.price} image={cartItem.image} />)
            });
            
            return (itemList);
        }
        else {
            return ([]);
        }
    }
    const handleRemove = (e) => {
        
        let prdid = e.target.getAttribute("data-itemid");
        dispatch(removeItem(prdid));
       
    }
    return (
       
            <CartContext.Provider value={{ handleAddToCart, handleRemove, returnCartItems, updateCart}}>
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
                                    <Route path="/checkout" element={<CheckOut />} />
                                    <Route path="/signup" element={<SignUp />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/profile" element={<UserProfile/> } />
                                </Routes>
                            </Router>
                        </HeaderContext.Provider>
                    </productListingContext.Provider>
                </CartContext.Provider>
            
        


    );
}

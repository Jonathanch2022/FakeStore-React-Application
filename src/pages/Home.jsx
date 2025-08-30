
import { useNavigate} from 'react-router-dom' 
import Button from 'react-bootstrap/Button';
import Header from "../components/Header.jsx"
import Cart,{ getCartItems, CartData } from '../components/Cart.jsx';
import CartItem from '../components/CartItem.jsx';
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
    let place = "Home Page";
   
    const navigate = useNavigate();
    let productid = -1;
  
    

   //Needed for product cart function
    const [cartItems, setCartItems] = useState(getCartItems() || []);
    const returnCartItems = () => {

        return (
            cartItems.map((item) => {

                return (

                    <CartItem key={item.id} id={item.id} image={item.image} quantity={item.quantity} price={item.price} title={item.title} updateQuantity={updateQuantity} remove={handleRemove} />                )
            })
        )
    }
    const updateCartList = () => {

        localStorage.setItem("cart-data", JSON.stringify(Array.from(CartData.cartList.values())));
    }
    const updateQuantity = (e) => {

        let itemid = parseInt(e.target.getAttribute("data-itemid"));
        CartData.cartList.get(itemid).quantity = e.target.value;
        updateCartList();

    }
    const handleRemove = (e) => {

        let prdid = e.target.getAttribute("data-itemid");
        CartData.cartList.delete(parseInt(prdid));
        updateCartList();
        setCartItems(Array.from(CartData.cartList.values()));

    }

    //End of product cart function requirement 

    const handleButtonClick = () => {

        navigate('/product-listing', {

            state: { productid }
        })
    }
    return (
        <>
            <Header cart={

                <Cart>
                    {
                        //returnCartItems()
                        cartItems
                    }
                </Cart>
            } />
            <h1 className="mb-3">Welcome to the FakeStore Application</h1>
            <p className="heroText mb-5">Welcome to the FakeStore React Application a sleek, user-friendly e-commerce interface built with React. This app allow you to browse a variety of products, view detailed item descriptions, and simulate a shopping experience using data from the FakeStore API. This application was  designed using a modern style UI and responsive layout, it's perfect for exploring the fundamentals of dynamic frontend development, component-based architecture, and API integration.</p>
            <Button variant="primary" onClick={handleButtonClick}>Continue</Button>
          
        </>
    )
}
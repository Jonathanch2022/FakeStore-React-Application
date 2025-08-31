import Header from "../components/Header"
import "../css/checkout.css"
import { useState, useContext, useEffect } from 'react'
import Cart, { getCartItems, CartData, CartContext } from "../components/Cart"
import CartItem from "../components/CartItem";
import placeholder from "../assets/placeholder.png"
import TitleHeader from "../components/TitleHeader"
import Orders, { order } from "../components/Orders"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
export default function CheckOut() {

    const { cartItems, setCartItems } = useContext(CartContext);
   

    useEffect(() => {


        let list = [];
        list.push(<CartItem key={1} id={1} title={"TEST"} price={10} image={placeholder} quantity={5} />);
        list.push(<CartItem key={2} id={1} title={"TEST"} price={10} image={placeholder} quantity={5} />);
        setCartItems(list);


    }, [])

    const handleCompleteOrder = (e) => {

        console.log("order completed!!!!");
    }
    return (
        <>
            <Header />
            <div className="checkout-container2">

            </div>
            <div className="cartBody2">

                <div>
                    <TitleHeader title={"Address"} />
                </div>
                <div>
                    <TitleHeader title={"Payment Method"} />
                </div>

            </div>
            <div className="cartitem-container2">

                <TitleHeader title={"Order Summary"} />

                <div className="cart-data2">
                    {
                        cartItems
                    }

                </div>
                <button type="button" id="checkout-button" onClick={handleCompleteOrder}>Check Out</button>
            </div>
        </>

    );
}
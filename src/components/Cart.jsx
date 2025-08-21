import { useState, useEffect,createContext,useContext } from "react"
import "../css/cart.css"
export default function Cart(props) {

    const { setCartItemCount, cartItemCount, cartTotle, setCartTotle }  = useContext(CartContext);

    return (
        <>
            <div id="cart-container" className="cart-container cart-container-hidden" data-cart="cart">
                {
                    props.children
                }
                <div className="cart-total">
                    <label id="totle">Total: {cartTotle}</label>
                    <label id="items">Items: {cartItemCount}</label>
                </div>
            </div>
        </>
    )
}
export const CartContext = createContext(null);
import { useState, useEffect } from "react"
import "../css/cart.css"
export default function Cart(props) {


    return (
        <>
            <div id="cart-container" className="cart-container cart-container-hidden" data-cart="cart">
                {
                    props.children
                }
            </div>
        </>
    )
}
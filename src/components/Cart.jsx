import { useState, useEffect,createContext,useContext } from "react"
import "../css/cart.css"
import CartItem from "./CartItem";

export class CartData {

    constructor(id, title, price, image, description, quantity) {

        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.description = description;
        this.quantity = quantity;
        CartData.key++;
        CartData.cartList.set(this.id, this);

    }

    id = 0;
    title = "";
    price = 0;
    image = ""
    description = "";
    quantity = 1;
    static cartList = new Map();
    static key = 0;

    remove() {

        CartData.cartList.delete(this.id);

    }


}
export const handleCartClick = () => {

    const cartElement = document.getElementById("cart-container");
    if (cartElement) {

        if (cartElement.className.includes("cart-container-hidden")) {

            cartElement.focus();
            cartElement.className = "cart-container cart-container-show";
        }
        else {

            cartElement.className = "cart-container cart-container-hidden";
            if (cartElement.style.height) {

                cartElement.style.visibility = "hidden";
            }
        }
    }
}

const handleCollapseCart = (e) => {

    if (e.target.getAttribute("data-cart") == undefined) {

        const cartElement = document.getElementById("cart-container");

        if (!cartElement.className.includes("cart-container-hidden")) {


            cartElement.className = "cart-container cart-container-hidden";
        }
    }

}
const handleCheckOut = (e) => {


}
   document.addEventListener("click", (e) => { 

       document.getElementById("root").addEventListener("mouseover", (e) => {

         
           if (e.target.getAttribute("data-cart") == null){

               document.addEventListener("mousedown", handleCollapseCart);
           }


       })
      

   });
   
export function getCartItems() {

    const cartobject = localStorage.getItem("cart-data");

    if (cartobject != undefined && cartobject != null) {

        let jsonData = JSON.parse(cartobject);
        return (
            jsonData.map((item) => {

                return (new CartData(item.id, item.title, item.price, item.image, item.description, item.quantity));

            })
        )
    }

}

export default function Cart(props) {

    const { setCartItemCount, cartItemCount, cartTotle, setCartTotle, cartItems, setCartItems,updateCartList } = useContext(CartContext);

 
    return (
        <>

            <div id="cart-container" className="cart-container cart-container-hidden" data-cart="cart" >
                <div className="cartid0" data-cart="cart">

                    {
                        cartItems
                    }


                </div>
                <div className="cartid1" data-cart="cart">
                    <div className="cart-total" data-cart="cart">
                        <label id="totle" data-cart="cart">Total: ${cartTotle}</label>
                        <label id="items" data-cart="cart">Items: {cartItemCount}</label>
                    </div>
                    <button type="button" data-cart="cart" onClick={handleCheckOut} >Check Out</button>
                </div>

            </div>
           
        </>
    )
}
export const CartContext = createContext(null);
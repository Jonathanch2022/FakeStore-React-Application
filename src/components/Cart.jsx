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

    const { setCartItemCount, cartItemCount, cartTotle, setCartTotle, cartItems, setCartItems } = useContext(CartContext);
 
    return (
        <>
          
            <div id="cart-container" className="cart-container cart-container-hidden" data-cart="cart">
              <div id="cart-items">
                    {
                        console.log(cartItems),
                    cartItems
                }

                </div>
                <div className="cart-total">
                    <label id="totle">Total: {cartTotle}</label>
                    <label id="items">Items: {cartItemCount}</label>
                </div>
            </div>
           
        </>
    )
}
export const CartContext = createContext(null);
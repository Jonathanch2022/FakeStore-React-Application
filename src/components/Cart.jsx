import {createContext,useContext,useEffect } from "react"
import "../css/cart.css"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { loadCart, setCart, updateCartStatus, tallyCart } from "../state/slices/cartslice"
import  CartItem  from "./CartItem";

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

export default function Cart(props) {

    const { updateCart, handleAddToCart} = useContext(CartContext);
    const navigate = useNavigate();
    const cartList = useSelector((state) => state.cartData.cartList);
    const total = useSelector((state) => state.cartData.total);
    const items = useSelector((state) => state.cartData.items);
    const dispatch = useDispatch();

    const handleCheckout = (e) => {

       navigate("/checkout");
    }
    useEffect(() => {

        dispatch(loadCart());

        document.addEventListener("click", (e) => {

            document.getElementById("root").addEventListener("mouseover", (e) => {


                if (e.target.getAttribute("data-cart") == null) {

                    document.addEventListener("mousedown", handleCollapseCart);
                }


            })


        });

    }, [])
    useEffect(() => {

        const values = tallyCart(cartList);
        dispatch(updateCartStatus(values));
        

    }, [cartList])
   
    return (
        <>

            <div id="cart-container" className="cart-container cart-container-hidden" data-cart="cart" >
                <div className="cartid0" data-cart="cart">
                    {
                        (cartList) ? cartList.map((item) => {
                           
  
                            return (

                                <CartItem key={item.id} id={item.id} orginid={item.id} title={item.title} quantity={item.quantity} price={item.price} image={(item.imageSrc) ? item.imageSrc : item.image} />
                            )
                        }) : []
                    }
                </div>
                <div className="cartid1" data-cart="cart">
                    <div className="cart-total" data-cart="cart">
                        <label id="totle" data-cart="cart">Total: ${total}</label>
                        <label id="items" data-testid="cart-count" data-cart="cart">Items: {items}</label>                     
                    </div>
                    <button type="button" data-cart="cart" onClick={handleCheckout} >Check Out</button>
                   
                </div>

            </div>
           
        </>
    )
}
export const CartContext = createContext(null);
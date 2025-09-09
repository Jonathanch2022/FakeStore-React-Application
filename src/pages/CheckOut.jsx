import Header from "../components/Header"
import "../css/checkout.css"
import { useState, useContext, useEffect } from 'react'
import { CartContext } from "../components/Cart"
import placeholder from "../assets/placeholder.png"
import TitleHeader from "../components/TitleHeader"
import Orders, { order } from "../components/Orders"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { AlertBox } from "../components/Alert"
import sucessCheckout from "../assets/sucessCheckout.png"
import { loadCart, setCart, updateCartStatus, tallyCart, resetCart } from "../state/slices/cartslice"
import { useSelector, useDispatch } from "react-redux"
import CartItem from "../components/CartItem"
export default function CheckOut() {

   
    const [showAlet, setShowAlert] = useState([]);
    const cartList = useSelector((state) => state.cartData.cartList);
    const total = useSelector((state) => state.cartData.total);
    const items = useSelector((state) => state.cartData.items);
    const dispatch = useDispatch();
    const shipping = 5;
    const tax = 8;
    const checkOutProperties = {
        shippingRate: 5,
        taxrate: 8,
        shippingTotal: 0,
        taxTotal:0,
        itemTotal:0,
        subTotal:0,
        total:0
       
    }
    const validateForm = (e) => {

        let valid = true;
        if (e.firstName.value === "") {

           
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "First name field cannot be empty", "All Fields are required!"));
        }
      
        if (e.lastName.value === "") {

          
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Last name field cannot be empty", "All Fields are required!"));
        }
       
        if (e.address.value === "") {

           
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Address field cannot be empty", "All Fields are required!"));
        }
      
        if (e.city.value === "") {

         
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "City field cannot be empty", "All Fields are required!"));
        }
       
        if (e.state.value === "") {

            
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "State field cannot be empty", "All Fields are required!"));
        }
        if (e.zip.value === "") {

           
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Zipcode field cannot be empty", "All Fields are required!"));
        }
      
        if (e.country.value === "") {

            
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Country field cannot be empty", "All Fields are required!"));

        }
       
        if (e.email.value === "") {

         
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Email field cannot be empty", "All Fields are required!"));

        }
      
        if (e.phone.value === "") {

          
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Phone number field cannot be empty", "All Fields are required!"));

        }
        if (e.cardNumber.value === "") {
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Card number field cannot be empty", "All Fields are required!"));

        }
        if (e.expirationDate.value === "") {
            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "Expiration date field cannot be empty", "All Fields are required!"));

        }
        if (e.cvv.value === "") {

            valid = false;
            setShowAlert(AlertBox.showAlert(false, "Form Validation Error", "CVV field cannot be empty", "All Fields are required!"));

        }
        return (valid);
    }
    const handleCompleteOrder = (e) => {
        e.preventDefault();

        if (!validateForm(e.target)) {
            setShowAlert(AlertBox.showAlert(false, "Purchase Complete!", "Thank you, Your order has been successfully submitted!", "Order Complete", sucessCheckout));
            let orderData = order.createOrder(e.target);
            dispatch(resetCart());
            console.log(orderData);
            console.log(order.orderHistory);
        }
       
    }
    
    return (
        <>
            <Header />
            {
                showAlet
            }
            <form id="checkout-form" onSubmit={handleCompleteOrder}>
                <div className="checkout-container2">
                  Check Out
                </div>
                <div className="cartBody2">
                
                        <div>
                            <TitleHeader title={"Shipping Details"} />
                            <input id="firstName" type="text" placeholder="First Name"></input>
                            <input id="lastName" type="text" placeholder="Last Name"></input>
                            <input id="address" type="text" placeholder="Address"></input>
                            <input id="city" type="text" placeholder="City"></input>
                            <input id="state" type="text" placeholder="State"></input>
                            <input id="zip" type="text" placeholder="Zip Code"></input>
                            <input id="country" type="text" placeholder="Country"></input>
                            <input id="email" type="email" placeholder="Email"></input>
                            <input id="phone" type="tel" placeholder="Phone Number"></input>
                        </div>
                        <div>
                            <TitleHeader title={"Payment Method"} />
                            <select id="paymentMethod" className="cartSelect">
                            <option value="creditCard">Credit Card</option>
                            <option value="debitCard">Debit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bankTransfer">Bank Transfer</option>
                            </select>
                            <input id="cardNumber" type="text" placeholder="Card Number"></input>
                            <input id="expirationDate" type="text" placeholder="Expiry Date (MM/YY)"></input>
                            <input id="cvv" type="text" placeholder="CVV"></input>
                    </div>
                    <input type="hidden" id="cart" value={JSON.stringify(cartList)}></input>
                    <input type="hidden" id="items" value={items}></input>
                    <input type="hidden" id="total" value={(items > 0)? total + shipping + ((tax / 100) * (total + shipping)):0}></input>
                    <input type="hidden" id="tax" value={(items > 0)?(tax / 100) * (total + shipping):0}></input>
                    <input type="hidden" id="subtotal" value={total}></input>
                    <input type="hidden" id="shipping" value={shipping * items}></input>



                </div>
                <div className="cartitem-container2">
                   
                    <TitleHeader title={"Order Summary"} />

                    <div className="cart-data2">
                        {
                            cartList.map((item) => {


                                return (

                                    <CartItem key={item.id + "C"} id={item.id + "C"} orginid={item.id} title={item.title} quantity={item.quantity} price={item.price} image={(item.imageSrc) ? item.imageSrc : item.image} />
                                )
                            })
                        }

                    </div>
              
                    <div className="cart-total2">
                       
                        <div className="cart-total2-div">

                            <div id="subtotal">Subtotal: <span className="cart-total2-text">${total}</span></div>
                            <div id="shipping">Shipping: <span className="cart-total2-text">${shipping * items}</span></div>
                            <div id="taxies">Taxs: <span className="cart-total2-text">${(items > 0) ? (tax / 100) * (total + shipping) : 0}</span></div>
                            <div id="total">Total: <span className="cart-total2-text">${(items > 0) ? total + shipping + ((tax / 100) * (total + shipping)) : 0}</span></div>
                            <div id="items">Items: <span className="cart-total2-text">{items}</span></div>
                        </div>

                    </div>
                    <button type="submit" id="checkout-button">Place Order</button>
                </div>
              
            </form>
            
        </>

    );
}
import "../css/cart.css"
import { useState, useContext, useEffect } from "react"
import { CartContext, getCartItems, CartData } from '../components/Cart' 
import { productListingContext } from "../pages/ProductListing";

export function updateCartTotals(cartList) {
	let cartTotal = 0;
	let cartQty = 0;
	for (let t in cartList) {

		cartTotal += parseInt(cartList[t].props.price) * parseInt(cartList[t].props.quantity);
		cartQty += parseInt(cartList[t].props.quantity);
		
		
	}
	
	return ([cartTotal, cartQty]);
}
export default function CartItem(props) {
	const {updateQuantity,setCartItemCount, cartItemCount, cartTotle, setCartTotle, cartItems, setCartItems,handleRemove,updateCartItem } = useContext(CartContext);
	const [qty, setQty] = useState(props.quantity);
	const [total, setTotal] = useState(0);
	let qtybox = document.getElementById("qty" + props.id);
	const handleUpdateQty = (e) => {
		
		let newvalue = document.getElementById("qty" + props.id).value;
		updateCartItem(props.id, newvalue);
		updateQuantity(e);
		
	}
	
	useEffect(() => {

		if (CartItem.length > 0) {
			let values = updateCartTotals(cartItems);

			setCartTotle(values[0]);
			setCartItemCount(values[1]);
		}

	}, [qty, cartItems])
	return (
		<>
			<div className="cartitem-container" id={"item" + props.id} data-qty={props.quantity} key={props.id} data-cart="cart" data-total={total}>
				<div className="cartitem-image" data-cart="cart">
					<img src={props.image} alt="cart item image" data-cart="cart" />
				</div>
				<div className="cartitem-details" data-cart="cart">
					
					<div className="cartitem-dt" data-cart="cart">

						<h5 data-cart="cart">{props.title}</h5>
						<p data-cart="cart">Qty:
							<span data-cart="cart">
								{qty}
							</span>
						</p>
						<p data-cart="cart">
							Price: {qty} x ${parseFloat(props.price).toFixed(2)}
						</p>
						<div className="input-group mb-2" data-cart="cart">
							<label className="input-group-text" htmlFor="quantity" data-cart="cart">Quantity</label>
							<input type="number" className="form-control" id={"qty" + props.id} data-itemid={props.id} onBlur={(e) => { handleUpdateQty(e), setQty(e.target.value) }} defaultValue={props.quantity} data-cart="cart" data-total={total} />
						</div>

					</div>
					<div className="remove-cartitem" data-cart="cart">
						<button id="remove-item" data-item={"item" + props.id} data-itemid={props.id} onClick={handleRemove} className="remove-item btn btn-danger" data-cart="cart">X</button>
					</div>
				</div>

			</div>


		</>
	)

}
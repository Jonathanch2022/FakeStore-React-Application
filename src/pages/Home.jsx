
import { useNavigate} from 'react-router-dom' 
import Button from 'react-bootstrap/Button';
import Header from "../components/Header.jsx"
import Cart from '../components/Cart.jsx';
import CartItem from '../components/CartItem.jsx';
import { useState } from 'react'


//Product cart requirement 
class CartData {

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
function getCartItems() {

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
//End of product cart requirements 
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
                        returnCartItems()
                    }
                </Cart>
            } />
            <h1 className="mb-3">Welcome to the FakeStore Application</h1>
            <p className="heroText mb-5">Welcome to the FakeStore React Application a sleek, user-friendly e-commerce interface built with React. This app allow you to browse a variety of products, view detailed item descriptions, and simulate a shopping experience using data from the FakeStore API. This application was  designed using a modern style UI and responsive layout, it's perfect for exploring the fundamentals of dynamic frontend development, component-based architecture, and API integration.</p>
            <Button variant="primary" onClick={handleButtonClick}>Continue</Button>
          
        </>
    )
}
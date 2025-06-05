import {useSearchParams } from 'react-router-dom'
import Header from "../components/Header.jsx"
import "../css/common.css";
import Button from "react-bootstrap/Button"
import Cart from "../components/Cart.jsx"
import CartItem from "../components/CartItem.jsx"
import {useState } from 'react' 


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

class ProductItem {
    constructor(id, title, price, description, category, image) {
        this.id = parseInt(id);
        this.title = title;
        this.price = parseFloat(price);
        this.description = description;
        this.category = category;
        this.image = image;
       
       
       
    }
    
    id = 0;
    title;
    price = 0;
    description;
    category;
    image;
    
   
    
}
async function postData(data) {

    
    const prd = new ProductItem(data.product_name.value, data.product_id.value, data.product_image.value, data.product_price.value, data.product_category.value, data.product_description.value);
    let jsonData = JSON.stringify(prd);
 
    let response = await fetch("https://fakestoreapi.com/products", {

        method: "post",
        headers: {

            "Content-Type": "application/json"
        },
        body: jsonData
            
        


    }).then((e) => {

        if (e.status == 200) {

            alert("Product Created Successfully!");
            return ("Post Successful Product Created");
        }
        else {

            alert("Error: Product could not be created!")
            return ("Error Product could not be created!");
        }
    })

}
const validateForm = (e) => {
   
    let valid = true;
    if (e.product_name.value === "") {

        document.getElementById("alert-product-name").className = "alert-show";
        valid = false;
    }
    else {

        document.getElementById("alert-product-name").className = "alert-hidden";
    }
    if (e.product_id.value === "") {

        document.getElementById("alert-product-id").className = "alert-show";
        valid = false;
    }
    else {

        document.getElementById("alert-product-id").className = "alert-hidden";
    }
    if (e.product_image.value === "") {

        document.getElementById("alert-product-image").className = "alert-show";
        valid = false;
    }
    else {
        document.getElementById("alert-product-image").className = "alert-hidden";
    }
    if (e.product_price.value === "") {

        document.getElementById("alert-product-price").className = "alert-show";
        valid = false;
    }
    else {
        document.getElementById("alert-product-price").className = "alert-hidden";
    }
    if (e.product_category.value === "") {

        document.getElementById("alert-product-category").className = "alert-show";
        valid = false;
    }
    else {
        document.getElementById("alert-product-category").className = "alert-hidden";
    }
    if (e.product_description.value === "") {

        document.getElementById("alert-product-description").className = "alert-show";
        valid = false;
    }
    else {
        document.getElementById("alert-product-description").className = "alert-hidden";
    }
    return (valid);
}
export default function AddProduct() {
    let place = "Create Product Page";
    const [searchParams, setSearchParams] = useSearchParams();



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



    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(e.target)) {

            postData(e.target);
        }
        
    }
    const handleBrowse = (e) => {
        let fileinput = document.getElementById("file-browser");
        let filename = document.getElementById("product_image");
        fileinput.click();
        filename.value = fileinput.value;
        
        
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
            <div className="content-container">
                <div className="editor-header">Create Product </div>
                <div className="editor-fields-container">
                   

                    <div className="editor-fields">

                        <form id="product-form" onSubmit={handleSubmit}>
                            <label>Product Name:</label>
                            <input type="text" id="product_name" name="title" placeholder="Enter Product Name" />
                            <div id="alert-product-name" className="alert-hidden">Product name must not be blank</div>
                            <label>Product ID:</label>
                            <input type="text" id="product_id" name="id" placeholder="Enter Product ID" />
                            <div id="alert-product-id" className="alert-hidden">Please enter a vaild product id</div>
                            <label>Product Image:</label>              
                            <input type="text" name="product_image" disabled={true} onError={(e) => { console.log(e) }} id="product_image" />
                            <div id="alert-product-image" className="alert-hidden">Product image must not be blank</div>
                            <Button id="inputFile" className="btn btn-dark" onClick={handleBrowse}>Browse</Button>
                            <label htmlFor="product_price">Product Price:</label>
                            <input type="number" name="product_price" id="product-price" placeholder="Enter Product Price" />
                            <div id="alert-product-price" className="alert-hidden">Please enter a valid price</div>
                            <label htmlFor="product_category">Product Category:</label>
                            <input type="text"  name="category" id="product_category" placeholder="Enter Product Category" />
                            <div id="alert-product-category" className="alert-hidden">Please enter a valid category</div>
                            <label htmlFor="product-description">Product Description:</label>
                            <textarea id="product_description" name="description" placeholder="Enter Product Description"></textarea>
                            <div id="alert-product-description" className="alert-hidden">Please enter a valid product description</div>
                            <Button type="submit" variant="primary" id="save-product">Create Product</Button>
                            <input type="file" id="file-browser" className="file-browser" accept="image/*" onChange={handleBrowse}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
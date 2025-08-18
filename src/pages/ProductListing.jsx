import {  useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from "../components/Header.jsx"
import Product from "../components/Product.jsx"
import CartItem from "../components/CartItem.jsx"
import Cart from "../components/Cart.jsx"
async function getProducts() {

    let results = await fetch("https://fakestoreapi.com/products/").then((e) => {

        if (e.ok) {
            return (e.json());
        }

    }).then((data) => { 


        if (data || data.length > 0) {

            return (data);
        }
    })
    return (
        results
    )
}

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


export default function ProductListing() {

   
    const [cartItems, setCartItems] = useState(getCartItems() || []);
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const location = useLocation();
    
    const handleRemove = (e) => {

        let prdid = e.target.getAttribute("data-itemid");
        CartData.cartList.delete(parseInt(prdid));
        updateCartList();
        setCartItems(Array.from(CartData.cartList.values()));

    }
    const updateQuantity = (e) => {

        let itemid = parseInt(e.target.getAttribute("data-itemid"));
        CartData.cartList.get(itemid).quantity = e.target.value;
        updateCartList();
       
    }
    const returnCartItems = () => {

        return(
            cartItems.map((item) => {

                return (

                    <CartItem key={item.id} id={item.id} image={item.image} quantity={item.quantity} price={item.price} title={item.title} updateQuantity={updateQuantity} remove={handleRemove} />                )
            })
        )
    }
   
    const updateCartList = () => {

        localStorage.setItem("cart-data", JSON.stringify(Array.from(CartData.cartList.values())));
    }
   
   
    const handleAddToCart = (e) => {


        
        let itemData = JSON.parse(e.target.getAttribute("data-item"));
        if (!CartData.cartList.get(itemData.id)) {

            new CartData(itemData.id, itemData.title, itemData.price, itemData.imageSrc, itemData.description, itemData.quantity);

            updateCartList();
           
            setCartItems(Array.from(CartData.cartList.values()));


        }
       


        





    }
    useEffect(() => { 

        let search_keywords = searchParams.get("search");
        if (search_keywords) {

            search_keywords = decodeURIComponent(search_keywords).toUpperCase();
           
        }
        getProducts().then((data) => {

            if (data) {

                if (search_keywords) {

                    let list = data.filter((product) => 

                       
                            product.title.toUpperCase().includes(search_keywords)
                        
                    )
                    setProducts(list);
                }
                else {
                    setProducts(data);
                }
               
            }
            else {

                console.log("No Results found")
            }
        })

    }, [location.search, localStorage.getItem("cart-data")])

    function productList (){

        
          let prd =  products.map((product) => {

                return (

                    <Product productid={product.id} title={product.title} imageSrc={product.image} price={product.price} category={product.category} description={product.description} key={product.id} setCart={setCartItems} cartData={cartItems} addToCart={handleAddToCart} />
                )
            })

        return (prd)
        
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
           
            <div className="product-container">
                {
                    
                    productList()
                    
                }
            </div>
        </>
    )
}
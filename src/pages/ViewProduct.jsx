import { useNavigate,useSearchParams } from 'react-router-dom'
import Header from "../components/Header.jsx"
import CartItem from "../components/CartItem.jsx"
import { useEffect, useState} from 'react'
import Cart from "../components/Cart.jsx"

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
async function getProduct(id) {

    let response = await fetch("https://fakestoreapi.com/products/" + id, {

        method: "get"
      

    }).then((e) => {

        if (e.ok) {

            return (e.json());
        }
    }).then((b) => {

        if (b) {

            
            return (b);
        }
    })
    return (response);
}
export default function ProductDetails() {
    let place = "Product Details Page";
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
   
    let id = -1;
    let stocked = 15;

    if (searchParams.get("productid")) {

        id = searchParams.get("productid");
    }


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
    const updateQuantity = (e) => {

        let itemid = parseInt(e.target.getAttribute("data-itemid"));
        CartData.cartList.get(itemid).quantity = e.target.value;
        updateCartList();

    }
    const updateCartList = () => {

        localStorage.setItem("cart-data", JSON.stringify(Array.from(CartData.cartList.values())));
    }
    const handleRemove = (e) => {

        let prdid = e.target.getAttribute("data-itemid");
        CartData.cartList.delete(parseInt(prdid));
        updateCartList();
        setCartItems(Array.from(CartData.cartList.values()));

    }

    //End of product cart function requirement 
    useEffect(() => {

        getProduct(id).then((a) => {
           
            
            setProduct(a);
            
           
        });
    },[])
   

    
   
  
   
    const handleEdit = () => {

        navigate("/edit-product?productid=" + product.id);
    }
    const handleAddToCart = () => {

       
        let qty = document.getElementById("quantity").value;
        let alert = document.getElementById("alert-addtocart");
        
        if (qty > 0) {
            alert.className = "alert-hidden";
            let updatedQty = parseInt(qty);


            if (!CartData.cartList.get(product.id)) {

                new CartData(product.id, product.title, product.price, product.image, product.description, updatedQty);

                updateCartList();

                setCartItems(Array.from(CartData.cartList.values()));


            }

            
            
                
            
        }
        else {

            alert.className = "alert-show";
        }
        
        
        

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
            <div className="product-details-contianer">

                <h1>{product.title }</h1>
                <div className="product-item-box">
                    
                    <p>SKU:
                        <span>{product.id}</span>
                    </p>

                </div>
                <div className="line-divider"></div>
                <div className="content-devider">
                    <img src={product.image} alt="Product Image" className="product-image" />
                    <div className="product-details">
                        <h2>${product.price }</h2>
                       
                        <p>Status: <span id="stock" className="instock">Instock</span></p>
                        <p>Category: {product.category}</p>
                        <p className="stock-status">Stock:
                            <span>{stocked}</span>
                        </p>
                        <div className="line-divider"></div>
                       
                        <ul>
                            <li> lorem ipsum dolor sit amet, consectetur adipiscing</li>
                            <li> lorem ipsum dolor sit amet, consectetur adipiscing</li>
                            <li>lorem ipsum dolor sit amet, consectetur adipiscing</li>
                            <li>lorem ipsum dolor sit amet, consectetur adipiscing</li>
                            <li>lorem ipsum dolor sit amet, consectetur adipiscing</li>
                        </ul>                     
                        <div className="line-divider"></div>
                       
                        <div className="action-buttons">
                            <label htmlFor="quantity">Quantity:</label>
                            <input type="number" name="quantity" id="quantity" />
                            <button className="btn btn-primary cart-bt" onClick={handleAddToCart}>Add to Cart</button>
                            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                        </div>
                        <div id="alert-addtocart" className="alert-hidden">invalid Quantity</div>
                      
                    </div>
                   
                   
                </div>
                <div className="product-description">
                    <h3>Description</h3>
                    <div className="line-divider"></div>
                    <p>{product.description}</p>

                </div>
                
            </div>
        </>
    )
}
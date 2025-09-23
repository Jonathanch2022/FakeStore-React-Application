import { useNavigate,useSearchParams } from 'react-router-dom'
import Header from "../components/Header.jsx"
import { useState, useContext } from 'react'
import { CartContext } from "../components/Cart.jsx"
import Rating from "../components/RateStar.jsx"
import { useQuery} from '@tanstack/react-query'
import { firestore } from "../components/firestore.jsx";
export default function ProductDetails() {


    
  
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [rating, setRating] = useState(0);
    const [rateCount, setRatingCount] = useState(0);
    const [qty, setQty] = useState(0);
    const {handleAddToCart} = useContext(CartContext);
    /*
    const { mutateAsync: getData, isLoading } = useMutation({
        mutationFn: handleGetData
    })
    */
   
    let stocked = 15;

   
    const handleGetData = async () => {
      
        let id = searchParams.get("productid");
        let prdList = await firestore.getProducts("products");
        let item = prdList.data.filter((prd) => prd.id == id)[0];
           
            setProduct(item);
            setRatingCount(item.rating.count);
            setRating(item.rating.rate);
                  
        return (item);
    }

    useQuery({ queryKey: ['productItem'], queryFn: handleGetData});

   
    const handleEdit = () => {

        navigate("/edit-product?productid=" + product.id);
    }
   
    return (
        <>
            <Header />
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

                        <Rating rating={rating} ratingCount={rateCount} />
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
                            <input type="number" name="quantity" id="quantity" onBlur={(e) => { setQty(e.target.value) }} defaultValue={1} min={1} />
                            <button className="btn btn-primary cart-bt" data-qty={qty} data-item={JSON.stringify(product)} onClick={handleAddToCart}>Add to Cart</button>
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
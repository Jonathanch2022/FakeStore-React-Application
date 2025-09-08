import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import RateStar from './RateStar';
import { CartContext } from "../components/Cart.jsx"
import { useState, useEffect, useContext} from 'react'
import { addToCart } from "../state/slices/cartslice"
import { useSelector, useDispatch } from 'react-redux'
export class ProductItem {
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

export default function Product(props) {

   
    let value = parseInt(props.price).toFixed(2);
    const Navigate = useNavigate();
    let productID = props.productid;
    const { handleAddToCart } = useContext(CartContext);
    const dispatch = useDispatch();


    const itemData = {

        id : props.productid,
        title : props.title,
        price : props.price,
        imageSrc : props.imageSrc,
        description : props.description,
        quantity: 1,
        rating: props.rating,
        ratingCount: props.ratingCount

    }
   

   
   const handleClick = () => {

       Navigate("/view-product?productid=" + productID);

    }
    return (
        <>
            <div className="product-box">
                <h5>{props.title }</h5>
                <img src={props.imageSrc} alt="procuct image" />
                <div className="product-price">${value}</div>
                <RateStar rating={props.rating} ratingCount={props.ratingCount} />
                <Button variant="primary btn-space" onClick={handleClick}> View </Button>
                <Button variant="primary" onClick={handleAddToCart} data-item={JSON.stringify(itemData)}> Add to cart </Button>
            </div>
        </>
    )
}
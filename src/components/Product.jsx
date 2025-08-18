import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'



export default function Product(props) {

   
    let value = parseInt(props.price).toFixed(2);
    const Navigate = useNavigate();
    let productID = props.productid;

    const itemData = {

        id : props.productid,
        title : props.title,
        price : props.price,
        imageSrc : props.imageSrc,
        description : props.description,
        quantity : 1

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
                <Button variant="primary btn-space" onClick={handleClick}> View </Button>
                <Button variant="primary" onClick={props.addToCart} data-item={JSON.stringify(itemData)}> Add to cart </Button>
            </div>
        </>
    )
}
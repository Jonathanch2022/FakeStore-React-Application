import Header from "../components/Header.jsx"
import "../css/common.css";
import Button from "react-bootstrap/Button"
import { useState,useEffect} from 'react'
import { useMutation } from '@tanstack/react-query'
import {ProductItem} from "../components/Product.jsx" 
import Success from "../assets/SuccessfulCheckmark.png"
import { AlertBox } from "../components/Alert.jsx"
import { firestore } from "../components/firestore.jsx"
import { auth } from "../firebaseConfig"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"
async function postData(data) {

    
    const prd = new ProductItem(data.product_id.value, data.product_name.value, data.product_price.value, data.product_description.value, data.product_category.value, data.product_image.value);
    //let jsonData = JSON.stringify(prd);
    await firestore.addProduct("products", prd);
    if (!await firestore.catagorieExist("categories", data.product_category.value)) {

        await firestore.addCatagories([data.product_category.value], "categories");

    }

   
    return ("Success");

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
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const {mutateAsync:AddPost } = useMutation({
        mutationFn: postData
       
    })
    //Needed for product cart function
  
   
    const [Alert, setAlert] = useState([]); 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(e.target)) {

            AddPost(e.target).then((a) => {
                
                if (a == "Success") {

                    setAlert(AlertBox.showAlert(false, "Product Created", "Product Created Successfully", "Product Created", Success));
                }
                else {

                    setAlert(AlertBox.showAlert(false, "Unsuccessful product creation", "Product coult not be created at this time", "Error Creating Product"));
                }

            });
         
            
        }
        
    }
    const handleBrowse = (e) => {
        let fileinput = document.getElementById("file-browser");
        let filename = document.getElementById("product_image");
        fileinput.click();
        filename.value = fileinput.value;
        
        
    }
    useEffect(() => {

        const usb = onAuthStateChanged(auth, (user) => {
            if (user) {

                setUser(user);
            }
            else {
                navigate("/login");
            }
        })


   

    },[])
    return (
        <>
          
               
                    <Header />
                    {
                        Alert
                    }
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
                                    <label>Product Image Url:</label>              
                                    <input type="text" name="product_image" disabled={false} onError={(e) => { console.log(e) }} id="product_image" />
                                    <div id="alert-product-image" className="alert-hidden">Product image must not be blank</div>
                          
                                    <label htmlFor="product_price">Product Price:</label>
                                    <input type="text" name="product_price" id="product-price" placeholder="Enter Product Price" />
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
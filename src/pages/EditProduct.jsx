import { useSearchParams,useNavigate} from 'react-router-dom'
import Header from "../components/Header.jsx"
import "../css/common.css";
import placeholder from "../assets/placeholder.png"
import Button from "react-bootstrap/Button"
import { useEffect, useState} from 'react'
import { ProductItem } from "../components/Product.jsx"
import { useMutation } from '@tanstack/react-query'
import Success from "../assets/SuccessfulCheckmark.png"
import { AlertBox } from "../components/Alert.jsx"
import { firestore } from "../components/firestore.jsx"
import { auth } from "../firebaseConfig"

async function deleteData(id) {

    let response = await fetch("https://fakestoreapi.com/products/" + id, {
        method: "DELETE",
    })
    
    return (response);
}

async function postData(datax) {

   
    const prd = new ProductItem(datax.product_id.value, datax.product_name.value, datax.product_price.value, datax.product_description.value, datax.product_category.value, datax.product_image.value);
    let jsonData = JSON.stringify(prd);
 
    let response = await fetch("https://fakestoreapi.com/products/"+datax.id.value, {

        method: "put",
        headers: {

            "Content-Type": "application/json"
        },
        body: jsonData




    })
    
    return (response);
}
export default function EditProduct() {
   
    const [searchParams] = useSearchParams();
    const id = searchParams.get("productid");
    const { mutateAsync: UpdateData } = useMutation({

        mutationFn: postData
        
    })
    const { mutateAsync: removeData } = useMutation({

        mutationFn: deleteData
    })
    
    const [product, setProduct] = useState({

            id: "",
            title: "",
            price: "",
            description: "",
            category: "",
            image: ""

    });
   
    const [Alert, setAlert] = useState([]);
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();
    //End of product cart function requirement 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm(e.target)) {
            let item = e.target;
            let prd = new ProductItem(item.product_id.value, item.product_name.value, item.product_price.value, item.product_description.value, item.product_category.value, item.product_image.value);
            let pr = productList.map((it) => {

                if (it.id == prd.id) {

                    it.title = prd.title;
                    it.price = prd.price;
                    it.description = prd.description;
                    it.category = prd.category;
                    it.image = prd.image;
                   
                    return (it);
                }
                else {
                    return (it);
                }
            })
            
            try {

                firestore.saveProducts("products", pr);
                setAlert(AlertBox.showAlert(false, "Product Updated", "Item updated successfully", "Product Updated", Success));
            }
            catch (e) {

                setAlert(AlertBox.showAlert(false, "Update Error", "Product could not be updated", "Error updating product"));
            }
                     
       
        }
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
    const handleDelete = (e) => {

        let id = searchParams.get("productid");
        if (id) {

            if (window.confirm("Are you sure you want to delete this product?")) {


              
                let updatedList = productList.filter((item) => item.id != id);
              
                try {
                    firestore.saveProducts("products", updatedList);

                    setAlert(AlertBox.showAlert(false, "Product Has Been Deleted", "Item deleted successfully", "Product Deleted", Success));
                    navigate("/product-listing");
                }
                catch (e) { 
                 
                    setAlert(AlertBox.showAlert(false, "Delete Error", "Product could not be deleted", "Error deleting product"));
                }
               
              
                
            }
            
            
        }
        
    }
    const handleBrowse = (e) => {
        let fileinput = document.getElementById("file-browser");
        let filename = document.getElementById("product_image");
        
        fileinput.click();
        filename.value = fileinput.value;


    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    }
    useEffect(() => {

       
        let id = searchParams.get("productid");

        if (id != null) {

            
            let prdList = firestore.getProducts("products").then((list) => {
                    setProductList(list.data);
                    const a = list.data.filter((d) =>  d.id == id )[0];
                  
                    setProduct({

                        id: a.id,
                        title: a.title,
                        price: a.price,
                        description: a.description,
                        category: a.category,
                        image: a.image


                    });

                })
               
               
           
        }


    }, [])
    
    return (

        <>

            { 

               (auth.currentUser)? <>
            <Header />
            {
                Alert
            }
            <div className="content-container">
                <div className="editor-header">Product Editor</div>
                <div className="editor-fields-container">
                    <img src={

                        product.image ? product.image : placeholder
                        

                    } alt="placeholder image" />

                    <div className="editor-fields">

                        <form id="product-form" onSubmit={handleSubmit}>
                            <label>Product Name:</label>
                            <input type="text" id="product_name" name="title" value={product.title} onChange={handleChange} placeholder="Enter Product Name" />
                            <div id="alert-product-name" className="alert-hidden">Product name must not be blank</div>
                                <label>Product ID:</label>
                            <input type="text" id="product_id" name="id" value={product.id} onChange={handleChange} placeholder="Enter Product ID" />
                            <div id="alert-product-id" className="alert-hidden">Please enter a vaild product id</div>
                                <label>Product Image:</label>
                            <input type="text" id="product_image" value={product.image} onChange={handleChange} name="image" disabled={false} />
                            <div id="alert-product-image" className="alert-hidden">Product image must not be blank</div>
                               
                        
                                <label htmlFor="product-price">Product Price:</label>
                            <input type="number" id="product_price" value={product.price} onChange={handleChange} name="price" placeholder="Enter Product Price" />
                            <div id="alert-product-price" className="alert-hidden">Please enter a valid price</div>
                                <label htmlFor="product-category">Product Category:</label>
                            <input type="text" id="product_category" value={product.category} onChange={handleChange} name="category" placeholder="Enter Product Category" />
                            <div id="alert-product-category" className="alert-hidden">Please enter a valid category</div>
                                <label htmlFor="product-description">Product Description:</label>
                            <textarea id="product_description" value={product.description } onChange={handleChange} name="description" placeholder="Enter Product Description"></textarea>
                            <div id="alert-product-description" className="alert-hidden">Please enter a valid product description</div>
                            <Button type="submit" variant="primary" id="save-product">Save Product</Button>
                            <Button variant="warning" onClick={handleDelete} id="delete-product">Delete</Button>
                            <input type="file" id="file-browser" className="file-browser" accept="image/*" onChange={handleBrowse} />

                        </form>
                    </div>
                </div>
            </div>
        </>: navigate("/login")
            }
        </>
    )
}
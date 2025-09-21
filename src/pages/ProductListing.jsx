import { useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useContext, createContext } from 'react'
import Header from "../components/Header.jsx"
import Product from "../components/Product.jsx"
import { useQuery } from '@tanstack/react-query'
import { firestore } from '../components/firestore.jsx'

export async function getProduct(id) {
    
    let destination = (typeof (id) == 'string' || typeof (id) == "number") ? "https://fakestoreapi.com/products/" + id : "https://fakestoreapi.com/products";

    let response = await fetch(destination, {

        method: "get"


    }).then((e) => {

        if (e.ok) {
           
            return (e.json());
        }
    })
    return (response);
}
export default function ProductListing() {
    
   
    const [searchParams, setSearchParams] = useSearchParams();
    const { search, setSearch, shopCatagory, setShopCatagory, products, setProducts } = useContext(productListingContext);
  
    const location = useLocation();
    
    
    let handleProductQuery = async () => {
       
        
        
        if (await firestore.getProducts("products", "") == null) {
         
            let prdData = await getProduct();
            const docid = await firestore.uploadProducts("products", prdData);
            let list = await firestore.getProducts("products");
           
            return (list.data);
        }
        else {

            let list = await firestore.getProducts("products");
           
            return (list.data);
        }

    }
    const { data, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: handleProductQuery });

   
    let handleGetData = async () => {

        let search_keywords = searchParams.get("search") || "";

        if (search_keywords) {

            search_keywords = decodeURIComponent(search_keywords).toUpperCase();

        }

       
        if (data) {
       
            

            if (search_keywords != "") {

                let list = data.filter((product) =>


                    product.title.toUpperCase().includes(search_keywords)


                )
                setProducts(list);


            }
            else {

                if (shopCatagory != "All") {


                    let list = data.filter((product) => product.category == shopCatagory)
                    setProducts(list);
                }
                else if (shopCatagory == "All") {
                    setProducts(data);
                }
            }

        }
        else {

            console.log("No Results found")
        }


    }
    useEffect(() => { 

        handleGetData();

    }, [location.search, localStorage.getItem("cart-data"), isLoading])

    function productList (){

       
          let prd =  products.map((product) => {

                return (

                    <Product productid={product.id} title={product.title} imageSrc={product.image} price={product.price} category={product.category} description={product.description} key={product.id} rating={product.rating.rate} ratingCount={product.rating.count} />
                )
            })
        
        return (prd)
        
    }
    return (
        <>
            <Header />
           
            <div className="product-container">
                {
                    
                    productList()
                    
                }
            </div>
        </>
    )
}
export const productListingContext = createContext(null);
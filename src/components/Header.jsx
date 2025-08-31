import { Navbar, Nav, Container } from 'react-bootstrap'
import {useNavigate, useLocation,useSearchParams} from "react-router-dom"
import cartIcon from "../assets/shoppingCart.png"
import { Button } from 'react-bootstrap'
import { createContext, useContext } from "react"
import CatagoryOption from "../components/catagoryOption"
import {productListingContext} from "../pages/ProductListing" 
import { useEffect } from 'react'
import Cart, { getCartItems, CartData, handleCartClick } from "../components/Cart"
export default function Header(props) {

    const navigate = useNavigate();
    const { options } = useContext(HeaderContext);
    const {products,shopCatagory,setShopCatagory } = useContext(productListingContext); 
    const [searchParams, setSearchParams] = useSearchParams();

  
    const handleSearchSubmit = (e) => {

        e.preventDefault();
        let searchValue = document.getElementById("search-input").value;
        navigate("/product-listing?search=" + encodeURIComponent(searchValue));
       
    }
   
   
    
    let handleCategoryChange = (e) => {
        
        let selectedValue = e.target.value;
        let urlString = "/product-listing?";
        // window.location.href = "/product-listing?category=" + selectedValue;
        let searchValue = document.getElementById("search-input").value;
        
        urlString += "category=" + encodeURIComponent(selectedValue);
        
        navigate(urlString);
        
        setShopCatagory(e.target.value);
        
    }
    return (
      <>
           
            <header className="mb-4">            
                <div className="header-bar">
                    <div className="header-input">
                        <form id="header-form" onSubmit={handleSearchSubmit}>
                            <div className="input-group">
                            <label htmlFor="search-input" className="input-group-text">Search</label>
                            <input type="text" className="form-control" id="search-input" placeholder="Search for products..." />
                                <Button type="submit" variant="primary" id="search-button">Search</Button>
                                <div id="cartIcon" className="cartIcon" src={cartIcon} onClick={handleCartClick} alt="cart icon" data-cart="cart" />
                                    <Cart />
                            </div>
                        </form>
                    
                    </div>
               
                </div>
                <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/">FakeStore</Navbar.Brand>
                        <Navbar.Toggle aria-controls="main-navbar-nav" />
                        <Navbar.Collapse id="main-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/product-listing">Shop</Nav.Link>
                                <Nav.Link href="/add-product">Add Product</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <label id="catagoryLabel">Category:   
                            <select className="categorySelection" onChange={handleCategoryChange}>
                                <option value="All">All</option>
                            {
                                options
                            }
                        </select>
                        </label>
                    </Container>
                </Navbar>
            </header>
            
          
           
      </>
    )
}
export const HeaderContext = createContext();

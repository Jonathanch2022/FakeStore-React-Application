
import { useNavigate} from 'react-router-dom' 
import Button from 'react-bootstrap/Button';
import Header from "../components/Header.jsx"
export default function Home() {
    let place = "Home Page";
   
    const navigate = useNavigate();
    let productid = -1;
  
   
    //End of product cart function requirement 

    const handleButtonClick = () => {

        navigate('/product-listing', {

            state: { productid }
        })
    }
    return (
        <>
            <Header />
            <h1 className="mb-3">Welcome to the FakeStore Application</h1>
            <p className="heroText mb-5">Welcome to the FakeStore React Application a sleek, user-friendly e-commerce interface built with React. This app allow you to browse a variety of products, view detailed item descriptions, and simulate a shopping experience using data from the FakeStore API. This application was  designed using a modern style UI and responsive layout, it's perfect for exploring the fundamentals of dynamic frontend development, component-based architecture, and API integration.</p>
            <Button variant="primary" onClick={handleButtonClick}>Continue</Button>
          
        </>
    )
}
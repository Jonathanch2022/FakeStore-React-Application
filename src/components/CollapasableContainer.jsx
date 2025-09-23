import "../css/collapseContainer.css"
import CartItem from "./CartItem"
export default function CollapsContainer(props) {

   

    return (
        <>
       

                <div id="h1container">
                    <div id="header">Date: {props.date}</div>
                    <div id="header1">ID: {props.id}</div>
                </div>
                <div className="collapseDiv">
           
         
                    <div  className="collapseHeading">
                        {
                            props.history.map((item) => {

                        
                                return (
                                    <CartItem key={item.id } id={item.id} quantity={item.quantity} image={item.image} title={item.title} price={item.price} cantEdit={true} ></CartItem>
                                )
                            })
                        }

                    </div>
                    <div id="h1containerbt">
                        <div id="headerbt">Total: {props.total}</div>
                    </div>
            </div>
       
        

    </>)
}
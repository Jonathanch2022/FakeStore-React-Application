import TitleHeader from "../components/TitleHeader"
import "../css/collapseContainer.css"
import CartItem from "./CartItem"
export default function CollapsContainer(props) {



    return (<>

        <div className="collapseDiv">
           
            <div id="h1container">
                <div id="header">Date: {props.date}</div>
                <div id="header1">ID: {props.id}</div>
            </div>
            <div className="collapseHeading">
                {
                    props.history
                }
                <CartItem></CartItem>
                <CartItem></CartItem>
                <CartItem></CartItem>
               
            </div>
            <div id="h1containerbt">
                <div id="headerbt">Total: {props.total}</div>
            </div>
            
            
          


        </div>

    </>)
}
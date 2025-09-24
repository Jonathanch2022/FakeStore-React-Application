import "../css/alert.css"
import TitleHeader from "./TitleHeader"
import loadingAnimation from "../assets/loadingCircle.gif"
import alertIcon  from "../assets/alerticonExclimationMark.png"
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export class AlertBox {

    static instaceid = 0;

    static getId() {
        AlertBox.instaceid++;
        return (AlertBox.instaceid);
    }
    static showAlert(isLoading, topMessage,bottomMessage,title,image,redirect) {

        AlertBox.instaceid++;
        return (<Alert key={AlertBox.getId()} loading={isLoading} messageTop={topMessage} messageBottom={bottomMessage} title={title} image={(image) ? image : null} redirect={redirect} />)
    }
}
export default function Alert(props) {

    const handleCloseAlert = (e) => {

        document.getElementById("alert").style.display = "none";
        if (props.redirect != null || props.redirect != "") {

            navigate(props.redirect);
        }
        
    }
    const [alertImage, setAlertImage] = useState((props.loading) ? loadingAnimation : (props.image) ? props.image : alertIcon);
    const [messageTop, setMessageTop] = useState((props.messageTop) ? props.messageTop : "");
    const [messageBottom, setMessageBottom] = useState((props.messageBottom) ? props.messageBottom : "");
    const [alertTitle, setAlertTitle] = useState((props.title) ? props.title : "Alert");
    const navigate = useNavigate();
    return (
        <>

            <div className="alert-Box" id="alert">
                <TitleHeader title={alertTitle} />
                <div id="message-top">{messageTop} </div>
                <img src={alertImage} alt="Loading..." className="alertImage" />
                <div id="message-bottom">{messageBottom} </div>
                <button className="close-alert" onClick={handleCloseAlert}>Close</button>

            </div>
        </>
    )
}
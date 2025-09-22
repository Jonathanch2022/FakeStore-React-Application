import Header from "../components/Header"
import TitleHeader from "../components/TitleHeader"
import "../css/profile.css"
import CollapsContainer from "../components/CollapasableContainer"
import { useState, useEffect } from "react"
import { auth } from "../firebaseConfig"
import { firestore } from "../components/firestore"
export default function UserProfile() {
    const [firstName, setFirstName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [user, setUser] = useState();
    const [userDocs, setUserDocs] = useState();
    const [userDoc, setUserDoc] = useState();
    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("Form Submitted!");
    }
    useEffect(() => {

        setUser(auth.currentUser);
        
       

    }, [auth.currentUser]);
    const handleLoadUser = async (e) => {
        const col = await firestore.getUserDocs("users");
        if (col) {
            setUserDocs(col);
            console.log(col);
        }
        const Udoc = await firestore.getUserDoc(e, col);
        if (Udoc) {

            setUserDoc(Udoc);
            setFirstName(Udoc.name);
            console.log(Udoc);
        }
        

    }
    useEffect(() => {

        if (user) {
            setEmail(user.email);
            handleLoadUser(user.email);
            
        }

    }, [user]);
    return (<>

        <Header />
        <TitleHeader title="Welcome User" />
        <div class="formdiv">
            <form id="form1" onSubmit={handleSubmit} class="form2">
                <label for="userFirstName">Full Name:</label>
                <input type="text" name="userFirstName" onChange={(e) => { e.target.value }} defaultValue={firstName}></input>
                <label for="userEmail">Email:</label>
                <input type="email" name="userEmail" onChange={(e) => { e.target.value }} defaultValue={email}></input>
                <label for="address">Address:</label>
                <input type="text" name="address" onChange={(e) => { e.target.value }} defaultValue={address}></input>
                <label for="city">City:</label>
                <input type="text" name="city" onChange={(e) => { e.target.value }} defaultValue={city}></input>
                <label for="state">State:</label>
                <input type="text" name="State" onChange={(e) => { e.target.value }} defaultValue={state}></input>
                <label for="zip">Zip:</label>
                <input type="text" name="zip" onChange={(e) => { e.target.value }} defaultValue={zip }></input>
                <label for="country">Country:</label>
                <input type="text" name="country" onChange={(e) => { e.target.value }} defaultValue={country}></input>
            <button type="submit">Save</button>

            </form>
            <TitleHeader title="Order History" />
            <div class="orderHistory">
                <CollapsContainer title="testing" />
            </div>

        </div>

    </>);

}
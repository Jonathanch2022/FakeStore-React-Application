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
    const [phone, setPhone] = useState();
    const [user, setUser] = useState();
    const [userDocs, setUserDocs] = useState();
    const [userDoc, setUserDoc] = useState();
    const [userOrders, setUserOrders] = useState();
    const [colList, setColList] = useState();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const userData = {
            name: e.target.userFirstName.value,
            address: e.target.address.value,
            city: e.target.city.value,
            state: e.target.State.value,
            zip: e.target.zip.value,
            country: e.target.country.value,
            phone: e.target.phone.value,
     

        }
        await firestore.updateUserDocument(userData, "users");
        console.log(userData);
    }
    useEffect(() => {

        setUser(auth.currentUser);
        
       

    }, [auth.currentUser]);
    const handleLoadUser = async (e) => {
        const col = await firestore.getUserDocs("users");
        if (col) {
            setUserDocs(col);
         
        }
        const Udoc = await firestore.getUserDoc(e, col);
        if (Udoc) {

            setUserDoc(Udoc);
            setFirstName(Udoc.name);
            setEmail(Udoc.email);
            setAddress(Udoc.address);
            setCity(Udoc.city);
            setState(Udoc.state);
            setZip(Udoc.zip);
            setCountry(Udoc.country);
            setPhone(Udoc.phone);
            const uOrders = await firestore.getUserOrders("orders", auth.currentUser.uid);
            setUserOrders(uOrders);
        
        }
        

    }
    useEffect(() => {

        if (user) {
            setEmail(user.email);
            handleLoadUser(user.email);
            
        }

    }, [user]);

    useEffect(() => {
        let itemList = [];
        for (let t in userOrders) {
            let cartlist = JSON.parse(userOrders[t].cart);
            itemList.push(<CollapsContainer date={userOrders[t].orderdate} id={userOrders[t].id} total={"$" + userOrders[t].total} history={cartlist} />);
        }
        setColList(itemList);
    }, [userOrders]);
    return (<>

        <Header />
        <TitleHeader title={"Welcome " + firstName} />
        <div class="formdiv">
            <form id="form1" onSubmit={handleSubmit} class="form2">
                <label for="userFirstName">Full Name:</label>
                <input type="text" name="userFirstName" onChange={(e) => { e.target.value }} defaultValue={firstName}></input>
                <label for="userEmail">Email:</label>
                <input type="email" name="userEmail" onChange={(e) => { e.target.value }} defaultValue={email}></input>
                <label for="phone">Phone:</label>
                <input type="text" name="phone" onChange={(e) => { e.target.value }} defaultValue={phone}></input>
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
                {


                    colList
                  
                    
                    
                }
                
            </div>

        </div>

    </>);

}
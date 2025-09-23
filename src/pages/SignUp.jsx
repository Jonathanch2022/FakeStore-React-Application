import { useEffect, useState } from "react"
import "../css/signup.css"
import Header from "../components/Header"
import TitleHeader from "../components/TitleHeader"
import {firestore } from "../components/firestore"
export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [userDocCollection, setUserDocCollection] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [user, setUser] = useState(null);
    

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (e.target.password.value == e.target.comfirmpassword.value) {
            
            try {

                const uid = await firestore.createAccount(email, password, {
                    name: e.target.name.value,
                    address: '',
                    city: "",
                    state: "",
                    zip: "",
                    country: '',
                    phone:"",
                    orderHistory: []

                }, "users");
                if (uid.user) {

                    setUser(uid.user);
                }
                console.log("Account Created");
            }
            catch (e) {

                setMsg(e.message);
             
            }
        }
        else {
            setMsg("Passwords do not match!");
            
        }
    };
   
    useEffect(() => {

        firestore.getUserDocs("users").then((e) => {
            setUserDocCollection(e);      
        });
       
        
    }, [userDoc]);
    return (<>

        <Header />
        <div className="signUpContainer">
            <TitleHeader title="Sign Up"/>
            <form id="signupform" onSubmit={handleSignUp}>
                <label htmlFor="name" >Full Name:</label>
                <input type="text" id="name" onChange={(e) => { setName(e.target.value) }}></input>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) } }></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                <label htmlFor="comfirmpassword">Comfirm Password:</label>
                <input type="password" id="comfirmpassword"></input>
                <button type="submit">Submit</button>
                
              

            </form>

        </div>

    </>)
}
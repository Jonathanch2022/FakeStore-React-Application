import { useEffect, useState } from "react"
import { auth, database } from "../firebaseConfig"
import {collection,addDoc,getDocs,deleteDoc,doc } from "firebase/firestore"
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
        let em = e.target.email.value;
        let ps = e.target.password.value;
        let cps = e.target.comfirmpassword.value;
     
        if (ps == cps) {
            
            try {

                const uid = await firestore.createAccount(email, password, {
                    name: "",
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

            }
            catch (e) {

                setMsg(e.message);
             
            }
        }
        else {
            setMsg("Passwords do not match!");
            
        }
    };
  
   
    const updateDocument = async (id,updatedDoc) => {

        try {
            await collection("users").doc(id).update(updatedDoc);
            const doc = await collection("users").doc(id).get();
            console.log(doc);
        }
        catch (e) {


        }
    }
    useEffect(() => {

        console.log(msg);

    }, [msg])
    useEffect(() => {

        firestore.getUserDocs("users").then((e) => {
            setUserDocCollection(e);      
        });
        if (userDoc) { 

            console.log(userDoc.id);
        }
        
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
                <button type="button" onClick={(e) => { firestore.deleteUserDoc}}>Delete</button>
                <button type="button" onClick={(e) => { }}>Update</button>

            </form>

        </div>

    </>)
}
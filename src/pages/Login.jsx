import { useState } from "react"
import { firestore } from "../components/firestore"
import "../css/login.css"
import Header from "../components/Header"
import TitleHeader from "../components/TitleHeader"
import { useEffect } from "react"
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState(null);

    const handlelogin = async (e) => {
        e.preventDefault();

        try {
           
       
            await firestore.logIn(email, password);
            
        }
        catch (e) {

            setMsg(e.message);
        }
    };
    const handleUpdate = () => {
      
        
                
                const data = {
                    name: "update6"
                }
                firestore.updateUserDocument(data,"users");
             

       
    }
    const handleDeleteUserDoc = () => {

        firestore.deleteUserDoc(firestore.userAccount.email, "users");
    }
    const handleLogOut = () => {

       
            
            firestore.logOut();
            setMsg("Signed out successfully");
       
    }
    const handleDeleteAccount = () => {

        firestore.deleteAccount("users");
    }
    useEffect(() => {

        firestore.getUsers().then((e) => {

            console.log(e);
        });

    }, [])
    
    return (<>

        <Header />
        <div className="loginContainer">
            <TitleHeader title="Login" />
            <form id="loginform" onSubmit={handlelogin}>
               
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }}></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                <button type="submit">Login</button>
                <button type="button" onClick={handleLogOut}>Logout</button>
                <button type="button" onClick={handleUpdate}>update</button>
                <button type="button" onClick={handleDeleteUserDoc}>delete</button>
                <button type="button" onClick={handleDeleteAccount}>delete account</button>
            </form>
           
        </div>

    </>)

}
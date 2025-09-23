import { useState } from "react"
import { firestore } from "../components/firestore"
import {auth } from "../firebaseConfig"
import "../css/login.css"
import Header from "../components/Header"
import TitleHeader from "../components/TitleHeader"
import { useNavigate } from "react-router-dom"
export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handlelogin = async (e) => {
        e.preventDefault();

        try {
           
       
            await firestore.logIn(email, password);
            navigate("/profile");
            
        }
        catch (e) {

            setMsg(e.message);
        }
    };
  
   
    const handleLogOut = async () => {

       
            
           await firestore.logOut();
          
       
    }

    const handleSignUp = () => {

        navigate("/signup");
    }
    
    return (<>

        <Header />
        <div className="loginContainer">
            <TitleHeader title="Login" />
            <form id="loginform" onSubmit={handlelogin}>
                {
                    (auth.currentUser) ?
                        <>
                            <button type="button" onClick={handleLogOut}>Logout</button>
                        </> :
                <>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={(e) => { setEmail(e.target.value) }}></input>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                <button type="submit">Login</button>
                <button type="button" onClick={handleSignUp}>Signup</button>
                </>
                
               
                }
            </form>
           
        </div>

    </>)

}
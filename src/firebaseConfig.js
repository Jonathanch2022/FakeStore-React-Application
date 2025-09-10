// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFireStore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKz_zUdbpuwCg80W0XBX3yVC4-QpVBHhk",
    authDomain: "react-ecommerce-app-9d528.firebaseapp.com",
    projectId: "react-ecommerce-app-9d528",
    storageBucket: "react-ecommerce-app-9d528.firebasestorage.app",
    messagingSenderId: "540141067218",
    appId: "1:540141067218:web:d72096bde684cbc8ffc60b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFireStore();
const auth = getAuth();
export { database,auth };
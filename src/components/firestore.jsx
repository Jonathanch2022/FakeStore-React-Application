import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, database } from "../firebaseConfig"
import { collection, addDoc, getDocs, deleteDoc, doc,updateDoc } from "firebase/firestore"
import { useState } from "react"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import ProductListing from "../pages/ProductListing"
import { updateItem } from "../state/slices/cartslice"

class firestore {

    static userCollection = null;
    static userDoc = null;
    static userAccount = null;
    static productDocId = null;

    static getProductDocId = async(table) => {

        if (firestore.productDocId == null) {

            const prdList = await this.getProducts(table);
          
            this.productDocId = prdList.id;
            return (this.productDocId);

        }
        else {

            return (firestore.productDocId);
        }
    }
    static getUsers = async (table) => {
       
        if (auth.currentUser) {
            
            firestore.userAccount = auth.currentUser;


            firestore.userCollection = await firestore.getUserDocs(table).then((e) => { return (e) });


            firestore.userDoc = await firestore.getUserDoc(firestore.userAccount.email, firestore.userCollection).then((e) => { return (e) });

            return (firestore.userAccount);

        }
        else {

            return (false);
        }
    }
    static createAccount = async (email, password, data,table) => {
        try {
            // Create a new user with email + password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Save extra user data to Firestore
            await addDoc(collection(database, table), {
                uid: userCredential.user.uid,
                email: email,
                ...data,
            });
            firestore.userAccount = userCredential;
            return { user: userCredential, success: true, message: "Signup Successful!" };

        } catch (e) {
            console.error("Error creating account:", e.message);
            return { success: false, message: e.message };
        }
    }
    static deleteUser(user) {

      
        
          
            user.delete();
            console.log("Account Deleted");
    
    }
    static logIn = async (email,password) => {
       
        try {

            const user = await signInWithEmailAndPassword(auth, email, password);
            if (user) {
                firestore.userAccount = user.user;
                console.log("Signed in successfully");
                return (user.user);
            }
            else {
               
                return (null);
            }

        }
        catch (e) {
            console.log(e);
            return (e);
        }
    };
    static logOut = () => {

        if (auth.currentUser) {

            signOut(auth);
            firestore.userAccount = null;
            firestore.userCollection = null;
            firestore.userDoc = null;
            console.log("Loged out successfully");
            return ("Signed Out");
           
        }
        else {
            console.log("No login found!");
            return ("No User Found");
        }
    }
    static uploadProducts = async (table, Productlist) => {
        console.log(Productlist);
        const docid = await addDoc(collection(database, table), {
            data: Productlist
        });
        return (docid);
    }
    static getProducts = async (table) =>{

        console.log("loading data");
        const data = await getDocs(collection(database, table));
        const list = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return (list[0]);

    }
    static getUserDocs = async (table) => {
        try {
            const data = await getDocs(collection(database, table));
            const list = await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            firestore.userCollection = list;
            return (list);


        }
        catch (e) {
            return (e);
        }
    }
    static getUserDoc = (mail, userDocCollection) => {

       
      
        const userDoc = userDocCollection.filter((useItem) => useItem.email == mail)[0];
       
        firestore.userDoc = userDoc;
        
        return (userDoc);



    }
    static deleteDocument = async (id,docCollection,table) => {
     
        if (id) {
            try {
                deleteDoc(doc(database, table, id));
                const col = docCollection.filter(it => it.id != id);
                firestore.userCollection = col;
                console.log("Document deleted");
                return (col);
                
            }
            catch (e) {

            }
        }
    }
    static deleteAccount = async (table) => {
      
        if (await firestore.getUsers(table)) {
          
            if (firestore.userDoc) {

                firestore.deleteDocument(firestore.userDoc.id, firestore.userCollection, table);
            }
            firestore.deleteUser(auth.currentUser);
            return ("Account Deleted");

        }
        else {
            return ("No user account found");
        }

    }
    static deleteUserDoc = async (email,table) => {

        if (await firestore.getUsers(table)) {
         
            firestore.deleteDocument(firestore.userDoc.id, firestore.userDocCollection, table);
            console.log("Document deleted");

        }
    }
    static UpdateProduct = async (table, prd) => {

        const prdDoc = await firestore.getProducts(table);
        const docItems = prdDoc.data.map((item) => {

            if (item.id == prd.id) {

                return (prd);
            }
            else {

                return (item);
            }
        });
        this.saveProducts(table, docItems);


    }
    static deleteProduct = async (table, prd) => {

        const prdDoc = await firestore.getProducts(table);
        const docItems = prdDoc.filter((item) => item.id != prd.id);
        this.saveProducts(table, docItems);


    }
    static addProduct = async (table, prd) => {

        const prdDoc = await firestore.getProducts(table);
        const docItems = prdDoc.data;
        

        docItems.push((prd.rating) ? {...prd} : { ...prd, rating: {count:0,rate:0} });
       
        this.saveProducts(table, docItems);
       


    }
    static saveProducts = async (table, updatedProductList) => {

        const docid = await firestore.getProductDocId(table);
      
        try {
            updateDoc(doc(database, table, docid), {

                data: updatedProductList
            });

            console.log("Produts updated");
        }
        catch (e) {
          
            console.log(e);
        }
           
    }
    static updateUserDocument = async (data, table) => {

        
        if (auth.currentUser) {
            if (await firestore.getUsers(table)) {
               
                try {

                    updateDoc(doc(database, table, firestore.userDoc.id), data);
                    console.log("Document Updated");
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
            
        

           
    }
            
    
}
export { firestore };

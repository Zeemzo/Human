import { auth } from './firebase';
import * as routes from '../constants/routes'
import axios from "axios";
import { HUMANBACKEND } from "../constants/routes"
import { ToastContainer, ToastStore } from 'react-toasts';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => {
  if (localStorage.getItem("chat") != null) {
    const pop = localStorage.getItem("chat");

    console.log(pop)
    const token = localStorage.getItem('token')
    axios
      .post(HUMANBACKEND + '/api/user/updateChat',
        { chat: btoa(pop), userId: auth.currentUser.uid },
        {
          headers: {
            'Authorization': "bearer " + token,
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
          }
        })
      .then((res) => {
        console.log(res)
        localStorage.removeItem("chat")
        localStorage.removeItem("chatty")
        localStorage.removeItem("fulfilled")
        localStorage.removeItem("unfulfilled")
        localStorage.removeItem("image")
    
    
        var lol = localStorage.getItem("remember")
        if (lol !== null) {
          if (lol === "false") {
            localStorage.removeItem("email")
            localStorage.removeItem("p")
          }
        }

        auth.signOut();

        window.location.href = routes.HUMANAPP + '/signin'

      }).catch(res => { console.log(res.data) })
   
  }else{
    localStorage.removeItem("chat")
    localStorage.removeItem("chatty")
    localStorage.removeItem("fulfilled")
    localStorage.removeItem("unfulfilled")
    localStorage.removeItem("image")
    auth.signOut();


    var lol = localStorage.getItem("remember")
    if (lol !== null) {
      if (lol === "false") {
        localStorage.removeItem("email")
        localStorage.removeItem("p")
      }
    }
    window.location.href = routes.HUMANAPP + '/signin'
  }

}


// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);


// auth.
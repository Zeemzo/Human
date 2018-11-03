import { auth } from './firebase';
import * as routes from '../constants/routes'
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => {
  auth.signOut();
  localStorage.removeItem("fulfilled")
  localStorage.removeItem("unfulfilled")
  localStorage.removeItem("image")
  
  var lol=localStorage.getItem("remember")
  if (lol !== null) {
    if (lol === "false") {
      localStorage.removeItem("email")
      localStorage.removeItem("p")
    }
  }
  window.location.href=routes.HUMANAPP+'/signin'
}


// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);


// auth.
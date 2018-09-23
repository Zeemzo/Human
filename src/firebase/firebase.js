import firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
    apiKey: "AIzaSyDd1bmOXMc1gs1RrsygS4B-qIf22o0zaI4",
    authDomain: "human-24b1b.firebaseapp.com",
    databaseURL: "https://human-24b1b.firebaseio.com",
    projectId: "human-24b1b",
    storageBucket: "human-24b1b.appspot.com",
    messagingSenderId: "534180446796"
  };

const devConfig = {
    apiKey: "AIzaSyDd1bmOXMc1gs1RrsygS4B-qIf22o0zaI4",
    authDomain: "human-24b1b.firebaseapp.com",
    databaseURL: "https://human-24b1b.firebaseio.com",
    projectId: "human-24b1b",
    storageBucket: "human-24b1b.appspot.com",
    messagingSenderId: "534180446796"
  };

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
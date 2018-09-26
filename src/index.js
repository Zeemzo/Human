import React from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { HUMANBACKEND } from './constants/routes'
// import './firebase/messaging'

import { messaging } from './firebase/firebase';
// import { auth } from './firebase/index';
import { auth as Auth } from './firebase/firebase'


// const config= {
//     apiKey:"AIzaSyDd1bmOXMc1gs1RrsygS4B-qIf22o0zaI4" ,
//     authDomain: "human-24b1b.firebaseapp.com",
//     databaseURL: "https://human-24b1b.firebaseio.com",
//     projectId: "human-24b1b",
//     storageBucket: "human-24b1b.appspot.com",
//     messagingSenderId: "534180446796"
//   };


//   export default messaging;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
registerServiceWorker();

messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
    // const token = localStorage.getItem('token')
    // const email = localStorage.getItem('email')

    messaging.getToken().then(function (currentToken) {
        if (currentToken) {
            console.log(currentToken);
            localStorage.setItem('pushToken', currentToken)

            if (Auth.currentUser !== null) {
                console.log("already logged in during push token save");
                axios
                    .post(HUMANBACKEND + '/api/push/token', { pushToken: currentToken, userId: Auth.currentUser.uid })
                    .then((res) => {
                        console.log(res.data);
                        // this.setState(byPropKey('error', res))
                    }).catch((error) => {
                        console.log(error);
                        // this.setState(byPropKey('error', error.message))

                    });
            };

            localStorage.setItem('pushTokenStatus', true);

            // sendTokenToServer(currentToken);
            // updateUIForPushEnabled(currentToken);
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            // updateUIForPushPermissionRequired();
            // setTokenSentToServer(false);
            localStorage.setItem('pushTokenStatus', false);

        }
    }).catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
        localStorage.setItem('pushTokenStatus', false);

    });


}).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
});

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.


//   / Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
        console.log('Token refreshed.' + refreshedToken);
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        // setTokenSentToServer(false);
        // Send Instance ID token to app server.
        // sendTokenToServer(refreshedToken);
        // ...

    }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err);
        // showToken('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    // appendMessage(payload);
    // [END_EXCLUDE]
});

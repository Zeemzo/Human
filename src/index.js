import React from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as routes from './constants/routes'
import registerServiceWorker from './registerServiceWorker';
import { HUMANBACKEND } from './constants/routes'
import { messaging } from './firebase/firebase';
import { auth as Auth } from './firebase/firebase'
import * as cron from 'cron';
import { auth } from "./firebase";

import { ToastContainer, ToastStore } from 'react-toasts';




ReactDOM.render(
    <div>
        <App height="100%" />
        <ToastContainer position={ToastContainer.POSITION.TOP_CENTER} store={ToastStore} />
    </div>
    ,
    document.getElementById('root')

);
// var CronJob = require('cron').CronJob;

// new CronJob('*/2 * * * * *',(()=>{
//     if(localStorage.getItem("remember")==null){
//         auth.doSignOut
//     }})
// , null, true, 'America/Los_Angeles');
// if(localStorage.getItem("remember")!=null){
//     if(localStorage.getItem("remember")===false){
//                 auth.doSignOut

//     }
// }else{
//     auth.doSignOut

// }

window.addEventListener("offline",()=>{
    ToastStore.error("You are offline! Some of the features may not work! Cached data may be available!")

})
window.addEventListener("online", () => {
    ToastStore.success("You are online!")

  });// navigator.vibrate
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
                    .post(HUMANBACKEND + '/api/push/token', { pushToken: currentToken, userId: Auth.currentUser.uid }, {
                        headers: {
                            "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                        }
                    })
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
        localStorage.setItem('pushToken', refreshedToken)

        if (Auth.currentUser !== null) {
            console.log("already logged in during push token save");
            axios
                .post(HUMANBACKEND + '/api/push/token', { pushToken: refreshedToken, userId: Auth.currentUser.uid }, {
                    headers: {
                        "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    // this.setState(byPropKey('error', res))
                }).catch((error) => {
                    console.log(error);
                    // this.setState(byPropKey('error', error.message))

                });
        };
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

// const Demo = React.createClass({
//     displayName: 'ReactToasterDemo',
//     onShow: function(){
//         this.refs.toast.show('<span>Hei, hei</span>');
//     },
//     onHide: function(){
//         this.refs.toast.hide();
//     },
//     render: function(){
//         return (
//             <div className="demo">
//                 <ReactToaster ref="toast" />
//                 <input type="button" value="Show" onClick={this.onShow}/>
//                 <input type="button" value="Hide" onClick={this.onHide}/>
//             </div>
//         );
//     }
// });

Notification.requestPermission(function (result) {
    if (result === 'granted') {
        console.log("im here to vibrate")

        //   navigator.serviceWorker.ready.then(function (registration) {
        //     registration.showNotification('payload.notification.title', {
        //       body: 'Your request was accepted',
        //       icon: './human.png',
        //       vibrate: [200, 100, 200, 100, 200, 100, 200],
        //       tag: 'BUZZ'
        //     });
        //   });
    }
});

messaging.onMessage(function (payload) {
    switch (payload.notification.title) {
        case 'Confirm Contributer Identity':
            console.log('Message received. ', payload);
            localStorage.setItem('confirmDetails', payload.notification.body)
            console.log(payload.notification.body)
            window.alert(payload.notification.title)
            window.location.href = routes.HUMANAPP + '/confirm';
            ; break;
        case 'You have a message from a fellow Human':
            console.log('Message received. ', payload);
            var repeat = false;
            if (localStorage.getItem('chat') != null) {

                var temp = JSON.parse(localStorage.getItem('chat'));
                var arr = temp.chats
                // console.log(arr.length)
                console.log(arr.length)

                for (var i = 0; i < arr.length; i++) {
                    // if (arr[i].roomId == payload.notification.body.roomId) {
                   
                    if (arr[i].roomId == JSON.parse(payload.notification.body).roomId) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    temp.chats.push(JSON.parse(payload.notification.body))
                    localStorage.setItem('chat', JSON.stringify(temp))
                }


                console.log(payload.notification.body)
            } else {
                var chats= []
                
                chats.push(
                    {
                        roomId: JSON.parse(payload.notification.body).roomId,
                        sender: JSON.parse(payload.notification.body).sender
                    }
                )
                console.log(chats)
                var chat={chats:chats};
                // chat.chats=;
                console.log(chat)

                localStorage.setItem('chat', JSON.stringify(chat))
            }

            window.alert(payload.notification.title)
            // setTimeout(( window.location.href = routes.HUMANAPP + '/chat'),60)
            window.location.href = routes.HUMANAPP + '/chat';
            ; break;
        case 'Accepted':
            console.log('Message received. ', payload);
            // localStorage.setItem('roomId', payload.notification.body)
            console.log(payload.notification.body)
            ToastStore.success("Fulfillment Verification Accepted")
                // window.alert(payload.notification.title)
                // window.location.href = 'https://human-24b1b.firebaseapp.com/chat';
                ; break;
        case 'Declined':
            console.log('Message received. ', payload);
            // localStorage.setItem('roomId', payload.notification.body)
            console.log(payload.notification.body)
            ToastStore.error("Fulfillment Verification Declined")

                // window.alert(payload.notification.title)
                // window.location.href = 'https://human-24b1b.firebaseapp.com/chat';
                ; break;
        default:
    }

    navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(payload.notification.title, {
            body: 'Your request was accepted',
            icon: './human.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'BUZZ'
        });
    });

    {/* <ReactToaster ref="toast" duration="1000" modal={false} auto={true} css={{background: 'red'}} /> */ }


    // window.location.href='https://human-24b1b.firebaseapp.com/chat';




    // [START_EXCLUDE]
    // Update the UI to include the received message.
    // appendMessage(payload);
    // [END_EXCLUDE]
});

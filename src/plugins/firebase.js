// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import { firebase } from '@firebase/app'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";
import '@firebase/analytics'
// Add the Firebase products that you want to use
// import "firebase/auth";
import '@firebase/auth'
// import "store";
import store from '../store';


const FirebasePlugin = {
  install (Vue) {
    //////////////////////////////////////////
    // INIT //////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyACQj9dzz83OaRde4iltV1gpCbm7ib_y4A",
      authDomain: "chekt-login-demo.firebaseapp.com",
      projectId: "chekt-login-demo",
      storageBucket: "chekt-login-demo.appspot.com",
      messagingSenderId: "550172301891",
      appId: "1:550172301891:web:f21e2400011c122c9cd2f6",
      measurementId: "G-RZDGL54FVZ"
    };

    // INIT - firebase
    var app = firebase.initializeApp(firebaseConfig)

    //////////////////////////////////////////
    // AUTH //////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////

    var signUp = function ({email, password}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
      // .then((user) => {
      //   // Signed in 
      //   // ...
      // })
      // .catch((error) => {
      //   var errorCode = error.code
      //   var errorMessage = error.message
      //   // ..
      // })
    }

    var signIn = function ({email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    var sendPasswordResetEmail = function ({email}) {
      return firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        console.log('Reset Email send success!')
      }).catch(function(error) {
        // An error happened.
        alert(error);
      });
    }

    var emailConfig = {
      // Get the action to complete.
      mode: null,
      // Get the one-time code from the query parameter.
      actionCode: null,//'j8l-NDnwfSN0BjKn-ZKXBoPjw_GwmWRcrcRi9ZlTztgAAAF5xxyVhQ',
      // (Optional) Get the continue URL from the query parameter if available.
      continueUrl: null,
      // (Optional) Get the language code if available.
      lang: null,
      // Configure the Firebase SDK.
      // This is the minimum configuration required for the API to be used.
      auth: app.auth()
    }

    // var getParameterByName = function (name, url = window.location.href) {
    //   console.log('getParameterByName start');
    //   name = name.replace(/[\[\]]/g, '\\$&');
    //   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    //       results = regex.exec(url)
    //   if (!results) return null
    //   if (!results[2]) return ''
    //   return decodeURIComponent(results[2].replace(/\+/g, ' '))
    // }

    var emailHandling = function () {
      document.addEventListener('DOMContentLoaded', () => {
        // URL에서 actionCode 뽑아오기.
        emailConfig.actionCode = Vue.tool.getParameterByName('oobCode')
        console.log(emailConfig.actionCode);
        if (!emailConfig.actionCode) return
        verifyPasswordResetCode()
      }, false);
    }

    var verifyPasswordResetCode = function () {
      // Verify the password reset code is valid.
      console.log('verifyPasswordResetCode start');
      emailConfig.auth.verifyPasswordResetCode(emailConfig.actionCode).then((email) => {
        console.log('verifyPasswordResetCode success');
        store.commit('CHECK_RESET_EMAIL_VERIFY_STATUS', 'successful')
      }).catch((error) => {
        console.log('verifyPasswordResetCode error');
        store.commit('CHECK_RESET_EMAIL_VERIFY_STATUS', error)
        // Invalid or expired action code. Ask user to try to reset the password again.
      })
    }

    var handleResetPassword = function (password) {

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        var newPassword = password

        // Save the new password.
        emailConfig.auth.confirmPasswordReset(emailConfig.actionCode, newPassword).then((resp) => {
          // Password reset has been confirmed and new password updated.
          store.commit('CHECK_RESET_EMAIL_CONFIRM_STATUS', 'sucessful')

          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          // auth.signInWithEmailAndPassword(accountEmail, newPassword);

          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
          }).catch((error) => {
            console.log(error)
            store.commit('CHECK_RESET_EMAIL_CONFIRM_STATUS', error)
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });

    }
    
    // SET - signOut
    var signOut = function() {
      firebase.auth().signOut().then(function() {
      }).catch(function() {
        alert('signOut failed')
      })
    }

    // Deletes the user's account.
    var deleteAccount = function() {
      firebase.auth().currentUser.delete().catch(function(error) {
        if (error.code == 'auth/requires-recent-login') {
          // The user's credential is too old. She needs to sign in again.
          firebase.auth().signOut().then(function() {
            // The timeout allows the message to be displayed after the UI has
            // changed to the signed out state.
            setTimeout(function() {
              alert('Please sign in again to delete your account.');
            }, 1)
          })
        }
      })
    }
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    
    let fb = {
      firebase,
      auth: {
        signUp,
        signIn,
        signOut,
        deleteAccount,
        sendPasswordResetEmail,
        emailHandling,
        handleResetPassword,
        verifyPasswordResetCode,
        getUser: function () {
          return firebase.auth().currentUser
        },
      },
    }
    Vue.prototype.$firebase = fb
    Vue.firebase = fb
  }
}

export default FirebasePlugin

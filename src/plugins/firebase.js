// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import { firebase } from '@firebase/app'
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";
import '@firebase/analytics'
// Add the Firebase products that you want to use
// import "firebase/auth";
import '@firebase/auth'


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
    firebase.initializeApp(firebaseConfig)

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
        alert('Reset Email send success!')
      }).catch(function(error) {
        // An error happened.
        alert(error);
      });
    }

    var emailHandling = function ({password}) {
      document.addEventListener('DOMContentLoaded', () => {
        // TODO: Implement getParameterByName()
      
        // Get the action to complete.
        var mode = getParameterByName('mode');
        // Get the one-time code from the query parameter.
        var actionCode = getParameterByName('oobCode');
        // (Optional) Get the continue URL from the query parameter if available.
        var continueUrl = getParameterByName('continueUrl');
        // (Optional) Get the language code if available.
        var lang = getParameterByName('lang') || 'en';
      
        // Configure the Firebase SDK.
        // This is the minimum configuration required for the API to be used.
        var config = {
          'apiKey': firebaseConfig.apiKey // Copy this key from the web initialization
                                  // snippet found in the Firebase console.
        };
        var app = firebase.initializeApp(config);
        var auth = app.auth();
      
        // Handle the user management action.
        switch (mode) {
          case 'resetPassword':
            // Display reset password handler and UI.
            handleResetPassword(auth, actionCode, continueUrl, lang, password);
            break;
          case 'recoverEmail':
            // Display email recovery handler and UI.
            handleRecoverEmail(auth, actionCode, lang);
            break;
          case 'verifyEmail':
            // Display email verification handler and UI.
            handleVerifyEmail(auth, actionCode, continueUrl, lang);
            break;
          default:
            // Error: invalid mode.
        }
      }, false);
    }

    this.handleResetPassword = function (auth, actionCode, continueUrl, lang, password) {
      // Localize the UI to the selected language as determined by the lang
      // parameter.

      // Verify the password reset code is valid.
      auth.verifyPasswordResetCode(actionCode).then((email) => {
        var accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        var newPassword = password;

        // Save the new password.
        auth.confirmPasswordReset(actionCode, newPassword).then((resp) => {
          console.log(resp);
          // Password reset has been confirmed and new password updated.

          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          // auth.signInWithEmailAndPassword(accountEmail, newPassword);

          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
          }).catch((error) => {
            console.log(error)
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });
        }).catch((error) => {
          console.log(error)
          // Invalid or expired action code. Ask user to try to reset the password
          // again.
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

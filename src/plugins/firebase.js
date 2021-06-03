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
import router from '../router'


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

    // SET - signUp
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

    // SET - signIn
    var signIn = function ({email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
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

    //////////////////////////////////////////////////////////
    // RESET EMAIL PASSWORD //////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

    // INIT RESET EMAIL CONFIG
    var resetEmailConfig = {
      // Get the action to complete.
      mode: null,
      // Get the one-time code from the query parameter.
      actionCode: null, //'j8l-NDnwfSN0BjKn-ZKXBoPjw_GwmWRcrcRi9ZlTztgAAAF5xxyVhQ',
      // (Optional) Get the continue URL from the query parameter if available.
      continueUrl: `https://chekt-login-demo.firebaseapp.com`,
      // (Optional) Get the language code if available.
      lang: null,
      // Configure the Firebase SDK.
      // This is the minimum configuration required for the API to be used.
      auth: app.auth()
    }

    var sendPasswordResetEmail = function (email) {
      return firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        console.log('Reset Email send success!')
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    }

    var emailHandling = function () {
      document.addEventListener('DOMContentLoaded', () => {
        // URL에서 actionCode 뽑아오기.
        resetEmailConfig.actionCode = Vue.tool.getParameterByName('oobCode')
        console.log(resetEmailConfig.actionCode);
        if (!resetEmailConfig.actionCode) return
        verifyPasswordResetCode()
      }, false);
    }

    var verifyPasswordResetCode = function () {
      // Verify the password reset code is valid.
      console.log('verifyPasswordResetCode start');
      resetEmailConfig.auth.verifyPasswordResetCode(resetEmailConfig).then((email) => {
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
        resetEmailConfig.auth.confirmPasswordReset(resetEmailConfig.actionCode, newPassword).then((resp) => {
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

    //////////////////////////////////////////////////
    // PASSWORDLESS //////////////////////////////////
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: `https://chekt-login-demo.firebaseapp.com/login`,
      // This must be true.
      handleCodeInApp: true,
      // iOS: {
      //   bundleId: 'com.example.ios'
      // },
      // android: {
      //   packageName: 'com.example.android',
      //   installApp: true,
      //   minimumVersion: '12'
      // },
      // dynamicLinkDomain: `https://chekt-login-demo.firebaseapp.com/passwordless`
    }

    var sendSignInLinkToEmail = function (email) {

      // Save the new password.
      firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        console.log('sendSignInLinkToEmail success!');
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
      })
      .catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }

    var isSignInWithEmailLink = function () {
      console.log('isSignInWithEmailLink start');
      // Confirm the link is a sign-in with email link.
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        console.log('isSignInWithEmailLink success');
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        return firebase.auth().signInWithEmailLink(email, window.location.href)
          .then((result) => {
            // successful 전달.
            store.commit('CHECK_PASSWORDLESS_CONFIRM_STATUS', 'successful')
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn')
            console.log('signInWithEmailLink success!');
            // successful 알려주기.(test용)
            alert('login success!')
            console.log(result);
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // error메세지 전달.
            store.commit('CHECK_PASSWORDLESS_CONFIRM_STATUS', error)
            // 에러발생시 passwordlessExpired 페이지 표시.
            router.push({path:'/passwordless_expired'})
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
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
        sendSignInLinkToEmail,
        isSignInWithEmailLink,        
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

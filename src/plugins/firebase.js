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

    var updatePassword = function ({password}) {
      var user = firebase.auth().currentUser
      var newPassword = password
      
      user.updatePassword(newPassword).then(function() {
        // Update successful.
        alert('Update successful.')
      }).catch(function(error) {
        // An error happened.
        alert(error)
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
        updatePassword,
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

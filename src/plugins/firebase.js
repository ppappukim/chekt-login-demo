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
    // RESET EMAIL PASSWORD & PASSWORDLESS ///////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

    // INIT RESET EMAIL CONFIG
    var actionCodeSetting = {
      // Get the action to complete.
      mode: null,
      // Get the one-time code from the query parameter.
      actionCode: null,
      // (Optional) Get the continue URL from the query parameter if available.
      continueUrl: null,
      // (Optional) Get the language code if available.
      lang: null,
      // Configure the Firebase SDK.
      // This is the minimum configuration required for the API to be used.
      auth: app.auth()
    }

    var sendPasswordResetEmail = function (email) {
      return firebase.auth().sendPasswordResetEmail(email)//.then(function() {
    }
    
    // 1. SET - Reset Password를 하기위한 actionCode를 URL에서 뽑아온다.
    var getResetEmailActionCode = function () {
      // URL 로드되면...
      document.addEventListener('DOMContentLoaded', () => {

        // URL에서 정보 뽑아넣기
        actionCodeSetting.actionCode = Vue.tool.getParameterByName('oobCode')
        actionCodeSetting.mode = Vue.tool.getParameterByName('mode')

        // URL에 actionCode가 없으면 무시.
        if (!actionCodeSetting.actionCode) return

        // CASE 1 - Reset Password
        if (actionCodeSetting.mode === 'resetPassword' ) store.commit('GET_RESET_EMAIL_ACTION_CODE_STATUS', 'successful')
        // CASE 2 - Passwordless
        else if (actionCodeSetting.mode === 'signIn' ) isSignInWithEmailLink()
        // CASE 3 - Others
        else return
      }, false);
    }


    //////////////////////////////////////////////////////////
    // RESET EMAIL PASSWORD //////////////////////////////////
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////

    // 1. SET - actionCode가 유효한 actionCode인지 검사한다.
    var verifyPasswordResetCode = function () {
      // Verify the password reset code is valid.
      console.log('verifyPasswordResetCode start');
      actionCodeSetting.auth.verifyPasswordResetCode(actionCodeSetting.actionCode).then((email) => {
        console.log('verifyPasswordResetCode success');
        //store
        store.commit('CHECK_RESET_EMAIL_VERIFY_STATUS', 'successful')
      }).catch((error) => {
        console.log('verifyPasswordResetCode error');
        //store
        store.commit('CHECK_RESET_EMAIL_VERIFY_STATUS', error)
        // Invalid or expired action code. Ask user to try to reset the password again.
      })
    }

    // 2. ACTION - actionCode가 유효하면 패스워드 reset을 진행한다.
    var handleResetPassword = function (password) {

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        var newPassword = password

        // Save the new password.
        return actionCodeSetting.auth.confirmPasswordReset(actionCodeSetting.actionCode, newPassword).then((resp) => {
          // Password reset has been confirmed and new password updated.
          console.log('confirmPasswordReset sucessful');
          store.commit('CHECK_RESET_EMAIL_CONFIRM_STATUS', 'sucessful')

          // TODO: Display a link back to the app, or sign-in the user directly
          // if the page belongs to the same domain as the app:
          // auth.signInWithEmailAndPassword(accountEmail, newPassword);

          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
          }).catch((error) => {
            console.log('confirmPasswordReset error');
            store.commit('CHECK_RESET_EMAIL_CONFIRM_STATUS', error)
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });

    }

    //////////////////////////////////////////////////
    // PASSWORDLESS //////////////////////////////////
    //////////////////////////////////////////////////
    //////////////////////////////////////////////////

    // 1. SET - Passwordless Config 준비.
    var passwordlessConfig = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      // url: `https://chekt-login-demo.firebaseapp.com/`,
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

    // 2. ACTION - Passwordless Link Email 보내기.
    var sendSignInLinkToEmail = function (email) {
      return firebase.auth().sendSignInLinkToEmail(email, passwordlessConfig)
    }

    // 3. ACTION - 링크 클릭시 로그인 실행.
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
        console.log(email);
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
        getResetEmailActionCode,
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

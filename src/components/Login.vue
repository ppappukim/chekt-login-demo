<template>
  <div class="wrapper">
    <div class="header"><img src="../assets/chekt-logo.png" style="width:100px;height:100%;"></div>
      <transition name="component-fade" mode="out-in">
        <ForgotPassword v-if="isForgotPasswordMode" @child="parents" @childresetpasswordsetting="parentsresetpasswordsetting"/>
        <ResetPassword v-else-if="isResetPasswordMode"/>
        <Passwordless v-else-if="isPasswordlessMode" @passwordlesschild="passwordlessparents"/>
        <div v-else class="login" v-bind:class="{failed:isLoginFailed}">
        <div class="form">
          <div class="form-header">
            <div class="title">
              <div v-if="isEmailExist">Hi! Bobby kim</div>
              <div v-else>Log in to your account</div>
            </div>
            <img v-if="isEmailExist" class="avatar" src="../assets/person.png" alt="bobby kim">
          </div>
          <div class="email">Email</div>
          <div class="input" style="margin-bottom:30px;">
            <input v-model="email" v-on:keyup.enter="clickLogin()" autofocus id="email" type="email" placeholder="yours@chekt.com">
          </div>
          <div class="passwords">
            <div class="password">Password</div>
            <div v-on:click="clickForgotPassword()" class="forgot-password">Forgot your Password?</div>
          </div>
          <div class="input">
            <input v-model="password" v-on:keyup.enter="clickLogin()" type="password" placeholder="your password" id="password">
          </div>
          <div v-if="isLoginFailed" class="failed-text" style="margin-top:20px;">
            <MyIcon style="color:#CD3D64;" v-bind:icon="'error'" v-bind:width="18" />
            <div style="margin-left:5px;">Incorrect email or password.</div>
          </div>
          <div v-on:click="clickLogin()" v-bind:class="{loading:isLoading}" class="login-btn" style="margin-bottom:20px; margin-top:50px;">
            <div v-if="isLoading" class="loader"></div>
            <div v-else>Log in</div>
          </div>
          <div class="passwordless">Can't log in? <span v-on:click="clickPasswordless()" class="try-passwordless">Try Passwordless Login</span></div>

        </div>
      </div>
    </transition>
    <div class="footer">
      <span class="footer-item">© CHeKT</span>
      <span> · </span> 
      <span class="footer-item">Contact</span>
      <span> · </span> 
      <span class="footer-item">Privacy & terms</span>
    </div>
  </div>
 
</template>

<script>
import MyIcon from '@/components/MyIcon'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'
import Passwordless from '@/components/Passwordless'
export default {
  components: {
    MyIcon,
    ForgotPassword,
    ResetPassword,
    Passwordless
  },
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      isLoading: false,
      isEmailExist: false,
      isLoginFailed: false,
      isForgotPasswordMode: false,
      isResetPasswordMode: false,
      isPasswordlessMode: false,
    }
  },
  watch: {
    email: function () {
      this.$store.commit('GET_EMAIL_INPUT_INFO', this.email)
      if (this.email === 'test@chekt.com') this.isEmailExist = true
      else this.isEmailExist = false
      console.log(this.emailInputInfo);
    },
    browserType: function () {
      console.log(this.browserType);
    }
  },
  computed: {
    emailInputInfo: function () {
      return this.$store.getters.emailInputInfo
    },
    browserType: function () {
      return this.$store.getters.browserType
    },
  },
  created: function () {
  },
  methods: {
    clickLogin: async function () {
      var password = document.getElementById("password");
      var email = document.getElementById("email");
      password.blur()
      email.blur()
      password.disabled = true
      email.disabled = true
      this.isLoginFailed = false
      this.isLoading = true
      await this.wait(2000)
      this.isLoading = false
      password.disabled = false
      email.disabled = false
      if (this.email === 'test@chekt.com' && this.password === 'test123') alert('login success!')
      else this.isLoginFailed = true
    },
    clickForgotPassword: function () {
      this.isForgotPasswordMode = true
      this.isLoginFailed = false
    },
    clickPasswordless: function () {
      this.isPasswordlessMode = true
    },
    // emit 데이터 받기
    parents: function () {
      this.isForgotPasswordMode = false
      this.isLoginFailed = false
    },
    // emit 데이터 받기
    passwordlessparents: function () {
      this.isPasswordlessMode = false
      this.isLoginFailed = false
    },
    // emit 데이터 받기
    parentsresetpasswordsetting: function () {
      this.isResetPasswordMode = true
      this.isForgotPasswordMode = false
    },
    wait: function (time) {
      return new Promise(resolve => {
        setTimeout(() => { resolve() }, time)
      })
    },
    
  }
}
</script>

<style scoped>
.wrapper {
  margin: auto;
  margin-top: 60px;
  width: 540px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 50px;
  margin-left: 30px;
}
.login {
  box-shadow: 0px 0px 20px 0px #e3e8ee6d;
  border: solid 1px var(--blue-gray-medium);
  border-radius: 5px;
}
.footer {
  font-size: 12px;
  color: var(--blue-gray-high);
  text-align: center;
  margin-top: 30px;
}
.footer-item {
  cursor: pointer;
}
.footer-item:hover {
  color: var(--gray-high);
}
.login.failed {
  /****** animation ******/
  animation: shake .6s linear;
}
.form {
  margin: 60px 60px 100px 60px;
}
.form-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
  position: relative;
  margin-bottom: 30px;
}
.avatar {
  position: absolute;
  display: block;
  align-self: center;
  width: 110px;
  height: 110px;
  background-color: rgb(140, 70, 70);
  box-shadow: 0px 0px 20px 0px #e3e8ee6d;
  border: solid 1px var(--blue-gray-medium);
  border-radius: 50%;
  right: 0px;
  top: -80px;
  object-fit: cover;
  /****** animation ******/
  animation: fade .4s linear;
}
.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-high);
  text-align: start;
}
.email {
  font-size: 14px;
  color: var(--gray-high);
  text-align: start;
  margin-bottom: 10px;
}
.passwords {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.password {
  font-size: 14px;
  color: var(--gray-high);
}
.password-eye {
  position: relative;
}
.forgot-password {
  font-size: 13px;
  color: var(--primary);
  cursor: pointer;
}
.forgot-password:hover {
  color: var(--gray-high);
}
.failed-text {
  font-size: 14px;
  color: var(--danger);
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: start;
  transition:all .5s;
  transition-delay: 1s;
}
.input input {
  width: calc(100% - 20px);
  font-size: 16px;
  border: solid 1px#E6E6E6;
  padding: 10px;
  border-radius: 5px;
  /****** animation ******/
  transition:box-shadow .3s;
}
.input input::placeholder {
  color: var(--gray-low);
}
input:focus {
  outline: none; 
  box-shadow: 0 0 0 3px #AAD2F5;
}
.login-btn {
  color: white;
  padding-top: 13px;
  padding-bottom: 13px;
  background-color: var(--primary);
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
}
.login-btn.loading{
  background-color: rgb(31, 137, 229, 60%);
  pointer-events: none;
}
.passwordless {
  font-size: 12px;
  color: var(--blue-gray-high);
  text-align: center;
}
.try-passwordless {
  color: var(--primary);
  cursor: pointer;

}
.try-passwordless:hover {
  color: var(--gray-high);
}
.loader {
  border: 2px solid #ffffff;
  border-top: 2px solid #ffffff00;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  /****** animation ******/
  animation: spin 1s linear infinite;
  margin: auto;
}

/****** animations ******/

.component-fade-enter-active, .component-fade-leave-active {
  transition: all .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-200px);
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg); }
}
@keyframes fade {
  0% { opacity: 0; transform: translate3d(0px, -50px, 0px); }
  100% { opacity: 100; transform: translate3d(0); }
}
@keyframes shake {
  0% { transform: translate(40px); }
  20% { transform: translate(-40px); }
  40% { transform: translate(20px); }
  60% { transform: translate(-20px); }
  80% { transform: translate(10px); }
  100% { transform: translate(0px); }
}

/****** media ******/
@media screen and (max-width: 600px) {
  .wrapper {
    width: 360px;
    margin-top: 30px;
  }
  .header {
    margin-bottom: 25px;
    margin-left: 15px;
  }
  .avatar {
    display: none;
  }
  .form {
    margin: 60px 30px 100px 30px;
  }
}
@media screen and (max-width: 380px) {
  .wrapper {
    width: 300px;
  }
}

</style>

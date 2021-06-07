<template>
  <div class="login" v-bind:class="{failed:isLoginFailed}">
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
        <input v-model="email" v-on:keyup.enter="clickLogin(email, password)" autofocus id="email" type="email" placeholder="yours@chekt.com">
      </div>
      <div class="passwords">
        <div class="password">Password</div>
        <div v-on:click="clickForgotPassword()" class="forgot-password">Forgot your Password?</div>
      </div>
      <div class="input">
        <input v-model="password" v-on:keyup.enter="clickLogin(email, password)" type="password" placeholder="your password" id="password">
      </div>
      <div v-if="isLoginFailed" class="failed-text" style="margin-top:20px;">
        <MyIcon style="color:#CD3D64;" v-bind:icon="'error'" v-bind:width="18" />
        <div style="margin-left:5px;">{{loginFailMessage}}</div>
      </div>
      <div v-on:click="clickLogin(email, password)" v-bind:class="{loading:isLoading}" class="login-btn" style="margin-bottom:20px; margin-top:50px;">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Log in</div>
      </div>
      <div class="passwordless">Can't log in? <span v-on:click="clickPasswordless()" class="try-passwordless">Try Passwordless Login</span></div>

    </div>
  </div>
 
</template>

<script>
import MyIcon from '@/components/MyIcon'
export default {
  components: {
    MyIcon,
  },
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      loginFailMessage:'',
      isLoading: false,
      isEmailExist: false,
      isLoginFailed: false,
    }
  },
  watch: {
    email: function () {
      this.$store.commit('GET_EMAIL_INPUT_INFO', this.email)
      if (this.email === 'test@chekt.com') this.isEmailExist = true
      else this.isEmailExist = false
    }
  },
  computed: {
    emailInputInfo: function () {
      return this.$store.getters.emailInputInfo
    }
  },
  created: function () {
    this.email = this.emailInputInfo
  },
  methods: {
    clickLogin: async function (email, password) {
      var passwordDom = document.getElementById("password");
      var emailDom = document.getElementById("email");
      passwordDom.blur()
      emailDom.blur()
      passwordDom.disabled = true
      emailDom.disabled = true
      this.isLoginFailed = false
      this.isLoading = true
      await this.$tool.wait(500) // Too fast
      
      ////////////////////
      // LOGIN ACTION!!!!
      try {
        // CASE 1 - Sign IN successful
        await this.$firebase.auth.signIn({email, password})
        alert('login Success!!')
      } catch (err) {
        console.log(err);
        this.isLoginFailed = true
        this.loginFailMessage = err.message
      }
      this.isLoading = false
      passwordDom.disabled = false
      emailDom.disabled = false
    },
    clickForgotPassword: function () {
      this.$router.push({path: '/forgotpassword'})
    },
    clickPasswordless: function () {
      this.$router.push({path: '/passwordless'})
    },
  }
}
</script>

<style scoped>
.login {
  box-shadow: 0px 0px 20px 0px #e3e8ee6d;
  border: solid 1px var(--blue-gray-medium);
  border-radius: 5px;
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

</style>

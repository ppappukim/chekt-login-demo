<template>
  <div class="body" v-bind:class="{failed:isEmailSendFailed}">
    <div v-if="isSend" class="form">
      <div class="title">Thanks, check your email for instructions to reset your password</div>
      <div class="desc">
        Didn't get the email? Check your spam folder or <span v-on:click="clickResend()" class="resend">Resend</span>
      </div>
      <div v-on:click="testResetPasswordsetting()" class="desc" style="color:var(--primary);cursor:pointer;">
        Test reset password setting
      </div>
    </div>
    <div v-else-if="isEmailResending" class="form">
      <div class="title">Email Reseding...</div>
      <div class="desc">
        Please note that if you make too many requests in a short time, you may not receive your email.
      </div>
    </div>
    <div v-else class="form">
      <div class="form-header">
        <div class="title">Reset your password</div>
      </div>
      <div class="desc">
        Enter the email address associated with your account and we'll send you a link to reset your password.
      </div>
      <div class="email">Email</div>
      <div class="input" style="margin-bottom:20px;">
        <input v-model="email" v-on:keyup.enter="clickSend()" id="forgotpassword-email" type="email">
      </div>
      <div v-if="isEmailSendFailed" class="failed-text" style="margin-top:20px;">
          <MyIcon v-bind:icon="'error'" v-bind:width="18" />
          <div style="margin-left:5px;">We couldn’t find that email. Please try again.</div>
        </div>
      <div v-on:click="clickSend()" class="send-btn" v-bind:class="{loading:isLoading}">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Send Email</div>
      </div>
      <div v-on:click="clickReturnToLogin()" class="return">
        <MyIcon style="color:blue;" v-bind:icon="'arrow-left'" v-bind:width="18"/>
        <div style="margin-left:5px;">Return to log in</div>
      </div>
    </div>
  </div>
</template>

<script>
import MyIcon from '@/components/MyIcon'
export default {
  components: {
    MyIcon,
  },
  name: 'forgotpassword',
  data () {
    return {
      email: '',
      isLoading: false,
      isEmailSendFailed: false,
      isForgotPasswordMode: false,
      isSend: false,
      isEmailResending: false,
    }
  },
  computed: {
    emailInputInfo: function () {
      return this.$store.getters.emailInputInfo
    },
  },
  mounted: function () {
    this.focusSyncInput()
  },
  watch: {
    
  },
  methods: {
    clickSend: async function () {
      this.isLoading = true
      this.isEmailSendFailed = false
      var email = document.getElementById("forgotpassword-email")
      email.blur()
      email.disabled = true
      await this.wait(2000)
      email.disabled = false
      this.isLoading = false
      if (this.email === 'test@chekt.com') this.isSend = true
      else this.isEmailSendFailed = true
    },
    // emit 함수
    clickReturnToLogin: function () {
      this.$emit("child")
    },
    clickResend: async function () {
      this.isEmailResending = true
      this.isSend = false
      await this.wait(2000)
      this.isEmailResending = false
      this.isSend = true
    },
    focusSyncInput: function () {
      this.email = this.emailInputInfo
      var email = document.getElementById("forgotpassword-email")
      email.focus()
    },
    testResetPasswordsetting: function () {
      this.$emit("childresetpasswordsetting")
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
.form {
  margin: 60px 60px 100px 60px;
}
.body {
  box-shadow: 0px 0px 20px 0px #e3e8ee6d;
  border: solid 1px var(--blue-gray-medium);
  border-radius: 5px;
}
.body.failed {
  /****** animation ******/
  animation: shake .6s linear;
}
.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-high);
  text-align: start;
}
.desc {
  margin-top:20px;
  font-size: 14px;
  color: var(--blue-gray-higher);
  line-height: 18px;
}
.email {
  margin-top:30px;
  font-size: 14px;
  color: var(--gray-high);
  text-align: start;
  margin-bottom: 10px;
}
.input input {
  width: calc(100% - 20px);
  font-size: 16px;
  border: solid 1px#E6E6E6;
  padding: 10px;
  border-radius: 5px;
  transition:box-shadow .3s;
}
.input input::placeholder {
  color: var(--gray-low);
}
input:focus {
  outline: none; 
  box-shadow: 0 0 0 3px #AAD2F5;
}
.send-btn {
  color: white;
  padding-top: 13px;
  padding-bottom: 13px;
  background-color: var(--primary);
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
}
.send-btn.loading{
  background-color: rgb(31, 137, 229, 60%);
  pointer-events: none;
}
.return {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: var(--gray-high);
  font-size: 14px;
  cursor: pointer;
  border: 1px solid var(--border);
  display: inline-flex;
  border-radius: 5px;
  padding: 5px 10px 5px 5px;
  box-shadow: 0px 0px 5px 0px #e3e8ee6d;
}
.return:hover {
  box-shadow: 0px 0px 10px 0px #d7dbe16d;
}
.failed-text {
  font-size: 14px;
  color: var(--danger);
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 30px;
}
.resend {
  color: var(--primary);
  font-weight: 500;
  cursor: pointer;
}
.resend:hover {
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
  .avatar {
    display: none;
  }
  .form {
    margin: 60px 30px 100px 30px;
  }
}
</style>

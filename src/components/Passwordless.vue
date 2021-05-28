<template>
  <div class="body" v-bind:class="[{failed:isEmailSendFailed}, {failed:isCodeAuthFailed}]">

    <!-- code insert form -->
    <div v-if="isSend" class="form">
      <div class="title">Please enter the code</div>
      <div class="desc">
        An email with the code has been sent to {{email}}.
      </div>
      <div v-on:click="clickActive()" class="codes">
        <div class="code" v-bind:class="{inserted:this.code[0]}">
          <div class="caret" v-bind:class="{active:codeInputActive && this.code.length === 0}">{{this.code[0]}}</div>
        </div>
        <div class="code" v-bind:class="{inserted:this.code[1]}">
          <div class="caret" v-bind:class="{active:codeInputActive && this.code.length === 1}">{{this.code[1]}}</div>
        </div>
        <div class="code" v-bind:class="{inserted:this.code[2]}">
          <div class="caret" v-bind:class="{active:codeInputActive && this.code.length === 2}">{{this.code[2]}}</div>
        </div>
        <div class="code-center"></div>
        <div class="code" v-bind:class="{inserted:this.code[3]}">
          <div class="caret" v-bind:class="{active:codeInputActive && this.code.length === 3}">{{this.code[3]}}</div>
        </div>
        <div class="code" v-bind:class="{inserted:this.code[4]}">
          <div class="caret" v-bind:class="{active:codeInputActive && this.code.length === 4}">{{this.code[4]}}</div>
        </div>
        <div class="code" v-bind:class="{inserted:this.code[5]}">
          <div class="caret" v-bind:class="{active:codeInputActive && this.code.length === 5}">{{this.code[5]}}</div>
        </div>
        <div class="code-input">
          <input @blur="codeBlur()" v-model="code" class="codeinput" type="tel" pattern="[0-9]" maxlength="6" id="passwordless-code">
        </div>
      </div>
      <div v-if="isCodeAuthFailed" class="failed-text" style="margin-top:-20px;">
        <MyIcon v-bind:icon="'error'" v-bind:width="18" />
        <div style="margin-left:5px;">The code does not match. Please re-enter </div>
      </div>
      <div v-on:click="clickSubmit()" autocomplete="false" class="code-submit-btn" v-bind:class="[{loading:isLoading}, {active:isCodeInsertDone}]">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Submit</div>
      </div>
      <div class="code-resend">Didn't receive a code? <span v-on:click="clickResend()" class="code-resend-action">Resend.</span></div>
    </div>

    <!-- code resending form -->
    <div v-else-if="isEmailResending" class="form">
      <div class="title">Code Reseding...</div>
      <div class="desc">
        Please note that if you make too many requests in a short time, you may not receive your email.
      </div>
    </div>

    <!-- general form -->
    <div v-else class="form">
      <div class="form-header">
        <div class="title">Having trouble logging in?</div>
      </div>
      <div class="desc">
        Passwordless tokens require you to have access to your email inbox.
      </div>
      <div class="email">Email</div>
      <div class="input" style="margin-bottom:20px;">
        <input v-model="email" v-on:keyup.enter="clickSend()" id="forgotpassword-email" type="email" placeholder="yours@chekt.com">
      </div>
      <div v-if="isEmailSendFailed" class="failed-text" style="margin-top:20px;">
          <MyIcon v-bind:icon="'error'" v-bind:width="18" />
          <div style="margin-left:5px;">This account doesn't use paaswordless login.</div>
      </div>
      <div v-on:click="clickSend()" class="send-btn" v-bind:class="{loading:isLoading}">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Send Login Code</div>
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
      code: '',
      codeInputActive: false,
      isCodeInsertDone: false,
      isCodeAuthFailed: false
    }
  },
  computed: {
    emailInputInfo: function () {
      return this.$store.getters.emailInputInfo
    },
  },
  mounted: function () {
    this.emailFocusInput()
  },
  watch: {
    code: function () {
      console.log(this.code.length);
      if (this.code.length > 5) {
        this.isCodeInsertDone = true
        this.clickSubmit()
      }
      else this.isCodeInsertDone = false
    }
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
      if (this.email === 'test@chekt.com') {
        this.isSend = true
        this.codeInputFocus()
      } 
      else this.isEmailSendFailed = true
    },
    clickSubmit: async function () {
      this.isCodeAuthFailed = false
      this.isLoading = true
      await this.wait(2000)
      if (this.code === '123456') {
        alert('success!')
      }
      else {
        this.isCodeAuthFailed = true
        this.code = ''
      }
      this.isLoading = false

    },
    // emit 함수
    clickReturnToLogin: function () {
      this.$emit("passwordlesschild")
    },
    clickResend: async function () {
      this.isEmailResending = true
      this.isSend = false
      await this.wait(2000)
      this.isEmailResending = false
      this.isCodeAuthFailed = false
      this.isCodeInsertDone = false
      this.isSend = true
      this.codeInputFocus()
    },
    codeInputFocus: function () {
      this.$nextTick(function() { 
        // Dom이 랜더링 된 후에 아래 코드 실행!
        var code = document.getElementById("passwordless-code")
        this.codeInputActive = true
        code.focus()
      });
    },
    emailFocusInput: function () {
      this.email = this.emailInputInfo
      var email = document.getElementById("forgotpassword-email")
      email.focus()
    },
    codeBlur: function () {
      this.codeInputActive = false
    },
    clickActive: function () {
      var code = document.getElementById("passwordless-code")
      code.focus()
      this.codeInputActive = true
      code.setSelectionRange(6,6) // 무조건 커서 끝에 가기하기.

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
.codes {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0 50px 0;
  position: relative;
  width: 100%;
}
.code {
  position: relative;
  width: 30px;
  height: 40px;
  margin: 0 5px;
  border-bottom: 3px solid var(--blue-gray-medium);
  cursor: text;
  /****** animation ******/
  transition:border-bottom .3s;

}
.code.inserted {
  border-bottom: 3px solid var(--primary);
}
.code-input {
  position: absolute;
  width: 100%;
  height: 100%;
}
.code-center {
  margin: 0 10px;
}
.caret {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 32px;
}
.caret.active {
  width: 1.4px;
  height: 20px;
  background-color: var(--gray-high);
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(2, start);
}
.codeinput {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background-size: 20px;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  border: none;
  outline: none !important;
  box-shadow: none !important;
  opacity: 0.01;
}
.codeinput:disabled{
  background: rgba(255, 255, 255, 0) !important;
}
.code-resend {
  font-size: 14px;
  color: var(--blue-gray-high);
  text-align: center;
  margin-top: -10px;
}
.code-resend-action {
  color: var(--primary);
  cursor: pointer;
}
.code-resend-action:hover {
  color: var(--gray-high);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.code-submit-btn {
  color: white;
  padding-top: 13px;
  padding-bottom: 13px;
  background-color: var(--primary);
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
  opacity: .3;
  pointer-events: none;
}
.code-submit-btn.active {
  pointer-events:initial;
  opacity: 1;
}
.code-submit-btn.loading{
  background-color: rgb(31, 137, 229, 60%);
  pointer-events: none;
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
  line-height: 18px;
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
@keyframes blink {
  0% { opacity: 1;}
  100% { opacity: 0; }
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

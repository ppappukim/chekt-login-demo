<template>
  <div class="body" v-bind:class="{failed:isEmailSendFailed}">
    <div v-if="isSend" class="form">
      <div class="title">Please enter the code</div>
      <div class="desc">
        An email with the code has been sent to bobby@gmail.com.
      </div>
      <div class="codes">
        <div class="code">
          <input @input="insertCode($event)" @keyup.delete="pressDelete()" autofocus class="codeinput" type="tel" pattern="[0-9]" maxlength="1" id="input1" name="code1">
          <label for="code1"></label>
        </div>
        <div class="code">
          <input @input="insertCode($event)" @keyup.delete="pressDelete()" class="codeinput" type="tel" pattern="[0-9]" maxlength="1" id="input2">
          <label for="code1"></label>
        </div>
        <div class="code">
          <input @input="insertCode($event)" @keyup.delete="pressDelete()" class="codeinput" type="tel" pattern="[0-9]" maxlength="1" id="input3">
        </div>
        <div class="code">
          <input @input="insertCode($event)" @keyup.delete="pressDelete()" class="codeinput" type="tel" pattern="[0-9]" maxlength="1" id="input4">
        </div>
        <div class="code">
          <input @input="insertCode($event)" @keyup.delete="pressDelete()" class="codeinput" type="tel" pattern="[0-9]" maxlength="1" id="input5">
        </div>
        <div class="code">
          <input @input="insertCode($event)" @keyup.delete="pressDelete()" class="codeinput" type="tel" pattern="[0-9]" maxlength="1" id="input6">
        </div>
      </div>
      <div v-if="isEmailSendFailed" class="failed-text" style="margin-top:20px;">
        <MyIcon v-bind:icon="'error'" v-bind:width="18" />
        <div style="margin-left:5px;">This account doesn't use paaswordless login.</div>
      </div>
      <div v-on:click="clickSend()" class="send-btn" v-bind:class="{loading:isLoading}">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Send Login Code</div>
      </div>
    </div>
    <div v-else-if="isEmailResending" class="form">
      <div class="title">Code Reseding...</div>
      <div class="desc">
        Please note that if you make too many requests in a short time, you may not receive your email.
      </div>
    </div>
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
    }
  },
  computed: {
    emailInputInfo: function () {
      return this.$store.getters.emailInputInfo
    },
  },
  mounted: function () {
    this.focusInput()
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
      this.$emit("passwordlesschild")
    },
    clickResend: async function () {
      this.isEmailResending = true
      this.isSend = false
      await this.wait(2000)
      this.isEmailResending = false
      this.isSend = true
    },
    focusInput: function () {
      this.email = this.emailInputInfo
      var email = document.getElementById("forgotpassword-email")
      email.focus()
    },
    insertCode: function () {

      // 준비 - 각 인풋값 변수에 넣기.
      var isFocused = document.activeElement
      var input1 = document.getElementById('input1')
      var input2 = document.getElementById('input2')
      var input3 = document.getElementById('input3')
      var input4 = document.getElementById('input4')
      var input5 = document.getElementById('input5')
      var input6 = document.getElementById('input6')

      // 값이 입력됐을때 포거스를 다음 인풋으로 넘기기.
      switch (isFocused) {
      case input1:
        input2.focus()
        break
      case input2:
        input3.focus()
        break
      case input3:
        input4.focus()
        break
      case input4:
        input5.focus()
        break
      case input5:
        input6.focus()
        break
      case input6:
        input6.blur()
        break
      }

      // 값이 입력됐을때 수정불가.
      if (input1.value) input1.disabled = true
      else input1.disabled = false
      if (input2.value) input2.disabled = true
      else input2.disabled = false
      if (input3.value) input3.disabled = true
      else input3.disabled = false
      if (input4.value) input4.disabled = true
      else input4.disabled = false
      if (input5.value) input5.disabled = true
      else input5.disabled = false
      if (input6.value) input6.disabled = true
      else input6.disabled = false

      if (input1.value && input2.value && input3.value && input4.value && input5.value && input6.value) this.clickSend()


    },
    pressDelete: function () {
      var isFocused = document.activeElement

      // delete버튼 눌렀을때 수정가능하게 하면서 앞에 값 지운다.
      switch (isFocused) {
      case input2:
        input1.disabled = false
        input1.value = ''
        input1.focus()
        break
      case input3:
        input2.disabled = false
        input2.value = ''
        input2.focus()
        break
      case input4:
        input3.disabled = false
        input3.value = ''
        input3.focus()
        break
      case input5:
        input4.disabled = false
        input4.value = ''
        input4.focus()
        break
      case input6:
        input5.disabled = false
        input5.value = ''
        input5.focus()
        break
      }
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0 20px 0;

}
.code {
  position: relative;
  width: 30px;
  height: 40px;
  margin: 0 5px;
}
.code label {
  position: absolute;
  bottom: 0px;
  left: 0%;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 3px solid var(--gray-high);

}
.codeinput {
  width: 100%;
  background-size: 20px;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  border: none;
  outline: none !important;
  box-shadow: none !important;
}
.codeinput:disabled{
  background: rgba(255, 255, 255, 0) !important;
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

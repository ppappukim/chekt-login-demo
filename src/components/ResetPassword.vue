<template>
  <div class="body">

    <!-- 1. reset password expired page -->
    <ResetPasswordExpired v-if="isExpired" @resetchild="resetparents"/>

    <!-- 2. go to dashboard page -->
    <div v-else-if="isResetPasswordSuccess" class="form">
      <div class="form-header">
        <div class="title">You've successfully changed your password</div>
        <div class="desc">Click the “Continue to dashboard” button to log in your site.</div>
      </div>
      <div v-on:click="clickToDashboard()" class="go-dashboard-btn" v-bind:class="{loading:isLoading}">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Continue to dashboard</div>
      </div>
    </div>

    <!-- 3. reset password page -->
    <div v-else class="form">
      <div class="form-header">
        <div class="title">Reset your password</div>
      </div>
      <div class="password">New Password</div>
      <div 
      class="input" 
      v-bind:class="{inputerror:passwordError, focused:isInputFocused, disabled:isPasswordDisabled}" 
      style="margin-bottom:20px;" >
        <input 
        v-model="password" 
        v-on:blur="blurChange()" 
        v-on:focus="focusChange()" 
        v-on:keyup.enter="clickContinue()" 
        @focus="passowrdFocused('new')"
        @blur="passowrdBlured('new')"
        v-bind:class="{disabled:isPasswordDisabled}" 
        id="resetpassword-password"
        type="password"
        autocomplete="new-password">
        <div v-show="showEye" v-on:click="showHideEye('new', $event)" class="tooltip" id="show-hide-eye">
          <MyIcon v-if="isEyeOff" class="password-eyes" v-bind:icon="'eye-off'"/>
          <MyIcon v-else class="password-eyes" v-bind:icon="'eye'"/>
          <span v-if="isEyeOff" class="tooltiptext">Hide password</span>
          <span v-else class="tooltiptext">Show password</span>
        </div>
      </div>
      <!-- /////메세지 -->
      <transition name="msg-fade" mode="out-in">
        <div v-if="passwordHint" class="hint-text" style="margin-top:-10px;">
          <div style="margin-left:5px;">{{passwordMsg}}</div>
        </div>
        <div v-else-if="passwordError" class="failed-text" style="margin-top:-10px;">
          <MyIcon v-bind:icon="'error'" v-bind:width="18" />
          <div style="margin-left:5px;">{{passwordErrorMsg}}</div>
        </div>
        <div v-else-if="passwordSuccess" class="success-text" style="margin-top:-10px;">
          <MyIcon v-bind:icon="'check'" v-bind:width="18" />
          <div style="margin-left:5px;">{{passwordSuccessrMsg}}</div>
        </div>
      </transition>
      <!-- 메세지///// -->
      <div class="password">Confirm your password</div>
      <div 
      class="input" 
      v-bind:class="{confirminputerror:passwordNotMatch, focused:isConfirmInputFocused, disabled:isPasswordDisabled}" 
      style="margin-bottom:30px;">
        <input
        v-model="passwordConfirm"
        v-on:keyup.enter="clickContinue()"
        @focus="passowrdFocused('confirm')"
        @blur="passowrdBlured('confirm')"
        v-bind:class="{disabled:isPasswordDisabled}" 
        id="resetpassword-password-confirm"
        type="password"
        autocomplete="new-password">
        <div v-if="showEyeConfirm" v-on:click="showHideEye('confirm')" class="tooltip" id="show-hide-eye-confirm">
          <MyIcon v-if="isEyeOffConfirm" class="password-eyes" v-bind:icon="'eye-off'"/>
          <MyIcon v-else class="password-eyes" v-bind:icon="'eye'"/>
          <span v-if="isEyeOffConfirm" class="tooltiptext">Hide password</span>
          <span v-else class="tooltiptext">Show password</span>
        </div>
      </div>
      <!-- /////메세지 -->
      <transition name="msg-fade" mode="out-in">
        <div v-if="passwordNotMatch" class="failed-text" style="margin-top:-20px;">
          <MyIcon v-bind:icon="'error'" v-bind:width="18" />
          <div style="margin-left:5px;">{{passwordConfirmErrorMsg}}</div>
        </div>
      </transition>
      <!-- 메세지///// -->
      <div v-on:click="clickContinue()" class="send-btn" v-bind:class="{loading:isLoading, success:passwordSuccess&&password===passwordConfirm}">
        <div v-if="isLoading" class="loader"></div>
        <div v-else>Countinue</div>
      </div>
      <!-- 테스트///// -->
      <div v-on:click="test()" class="test">Test reset password expired</div>
      <!-- /////테스트 -->
    </div>
  </div>
</template>

<script>
import MyIcon from '@/components/MyIcon'
import ResetPasswordExpired from '@/components/ResetPasswordExpired'
export default {
  components: {
    MyIcon,
    ResetPasswordExpired
  },
  name: 'resetpassword',
  data () {
    return {
      isExpired: false,
      password: '',
      passwordConfirm: '',
      isLoading: false,
      showEye: false,
      showEyeConfirm: false,
      isEyeOff: false,
      isEyeOffConfirm: false,
      passwordErrorMsg: '',
      passwordMsg: '',
      passwordSuccessrMsg: '',
      passwordConfirmErrorMsg: '',
      passwordHint: false,
      passwordError: false,
      passwordNotMatch: false,
      passwordSuccess: false,
      isInputFocused: false,
      isPasswordDisabled: false,
      isConfirmInputFocused: false,
      isResetPasswordSuccess: false,
    }
  },
  computed: {
  },
  watch: {
    password: function () {
      this.passwordSecureCheck()
      this.passwordConfirmSecureCheck()
    },
    passwordConfirm: function () {
      this.passwordSecureCheck()
      this.passwordConfirmSecureCheck()
    }
  },
  mounted: function () {
    // 클릭해도 input 포커스 유지하기
    // var showHideEyeBtn = document.getElementById('show-hide-eye');
    // showHideEyeBtn.addEventListener('mousedown', e => {
    //   e.preventDefault()
    // })
  },
  beforeDestroy: function () {
    // 리스너 지우기
    // var showHideEyeBtn = document.getElementById('show-hide-eye');
    // showHideEyeBtn.removeEventListener('mousedown', e => {
    //   e.preventDefault()
    // })
  },
  methods: {
    blurChange: function () {
      this.passwordHint = false
      this.passwordCheck(this.password)
    },
    focusChange: function () {
      if (this.passwordSuccess) return
      this.passwordHint = true
      this.passwordMsg = 'Your password need to be at least 8 characters. Include multiple words and phrases to make it more secure.'
    },
    clickContinue: async function () {
      if (!this.passwordSuccess) return
      if (this.password !== this.passwordConfirm) return
      this.isLoading = true // loading animation

      // 준비 - 패스워드 인풋연결
      var password = document.getElementById("resetpassword-password")
      var passwordConfirm = document.getElementById("resetpassword-password-confirm")
      password.blur()
      this.isPasswordDisabled = true
      passwordConfirm.blur()
      await this.wait(2000)
      this.isResetPasswordSuccess = true
      this.isPasswordDisabled = false
      this.isLoading = false
    },
    passowrdFocused: function (type) {
      // 클릭하면 비밀번호 보여주기
      switch (type) {
      case 'new':
        this.passwordSecureCheck()
        this.passwordConfirmSecureCheck()
        this.isInputFocused = true
        this.isConfirmInputFocused = false
        break
      case 'confirm':
        this.passwordSecureCheck()
        this.passwordConfirmSecureCheck()
        this.isConfirmInputFocused = true
        this.isInputFocused = false
        break
      }
    },
    passowrdBlured: function (type) {
      // 클릭하면 비밀번호 보여주기
      switch (type) {
      case 'new':
        this.passwordSecureCheck()
        this.passwordConfirmSecureCheck()
        this.isInputFocused = false
        this.isConfirmInputFocused = false
        break
      case 'confirm':
        this.passwordSecureCheck()
        this.passwordConfirmSecureCheck()
        this.isConfirmInputFocused = false
        this.isInputFocused = false
        break
      }
    },
    showHideEye: function (type) {
      // 클릭하면 비밀번호 보여주기
      switch (type) {
      case 'new':
        if (this.isEyeOff === false) this.isEyeOff = true
        else this.isEyeOff = false
        var password = document.getElementById("resetpassword-password")
        if (password.type === 'password') password.type = 'text'
        else password.type = 'password'
        break
      case 'confirm':
        if (this.isEyeOffConfirm === false) this.isEyeOffConfirm = true
        else this.isEyeOffConfirm = false
        var passwordConfirm = document.getElementById("resetpassword-password-confirm")
        if (passwordConfirm.type === 'password') passwordConfirm.type = 'text'
        else passwordConfirm.type = 'password'
        break
      }
    },
    passwordSecureCheck: function () {
      // 1글자 이상입력시 눈아이콘 보여주기
      if (this.password.length > 0) this.showEye = true
      else this.showEye = false

      // 비밀번호 준비
      var passwordRule =  /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/ // 강력하지 않은 비밀번호.
      var passwordRuleStrong =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/ // 10자리 이상, 특수문자 포함시 강력한 비밀번호.

      // 성공! - 강력하지 않은 비밀번호
      if (passwordRule.test(this.password)) {
        this.passwordError = false
        this.passwordSuccess = true
        this.passwordSuccessrMsg = 'Nice work. Your password is good.'
        this.passwordHint = false
      }
      else {
        this.passwordSuccess = false
        this.passwordHint = true
      }

      // 성공! - 강력한 비밀번호
      if (passwordRuleStrong.test(this.password)) {
        this.passwordSuccess = true
        this.passwordSuccessrMsg = 'Nice work. This is an excellent password.'
      }
    },
    passwordConfirmSecureCheck: function () {
      // 1글자 이상입력시 눈아이콘 보여주기
      if (this.passwordConfirm.length > 0) this.showEyeConfirm = true
      else this.showEyeConfirm = false

      // new password와 매치여부 체크
      if (this.password !== this.passwordConfirm && this.passwordConfirm.length > 0) {
        this.passwordNotMatch = true
        this.passwordConfirmErrorMsg = 'This password doesn’t match. Try again.'
      }
      else this.passwordNotMatch = false
    },
    passwordCheck: function (password) {
      // 준비 - 숫자, 영문 뽑아내기
      var num = password.search(/[0-9]/g) //숫자
      var eng = password.search(/[a-zA-Z]/ig) //영문
      var spe = password.search(/[!@#$%^*+=-]/ig) //특수문자
      var passwordRule =  /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/ // 특수문자 체크 하려면... (?=.*[!@#$%^*+=-]) 추가!

      // 비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.
      if(!passwordRule.test(password)) {
        this.passwordError = true
        this.passwordErrorMsg = 'Your password is not strong enough. Your password must be at least 8 characters.'
      }

      // 비밀번호는 숫자와 영문자를 혼용하여야 합니다.
      if(num<0 || eng<0){
        this.passwordError = true
        this.passwordErrorMsg = 'Passwords must be mixed with numbers and alphabets.'
      }
      // 입력한 값이 없다면 에러를 삭제합니다.
      if (password.length < 1) this.passwordError = false

    },
    // emit 데이터 받기
    resetparents: function (isExpired) {
      this.isExpired = isExpired
    },
    clickToDashboard: async function () {
      this.isLoading = true
      await this.wait(2000)
      this.isLoading = false
      alert('Go to dashboard!')
    },
    test: function () {
      this.isExpired = true
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
.password {
  margin-top:30px;
  font-size: 14px;
  color: var(--gray-high);
  text-align: start;
  margin-bottom: 10px;
}
.input {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #E6E6E6;
  border-radius: 5px;
  transition:box-shadow .3s;
}
.input.focused {
  box-shadow: 0 0 0 3px #AAD2F5;
}
.input.disabled {
  background-color: #FAFAFA;
  pointer-events: none;
}
.inputerror {
  border: solid 1px var(--danger) !important;
}
.confirminputerror {
  border: solid 1px var(--danger) !important;
}
.input input {
  width: 100%;
  font-size: 16px;
  border: none;
  padding: 10px;
  border-radius: 5px;
}
.input input.disabled {
  background-color: #FAFAFA;
  /* rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3)); */
}
.input input::placeholder {
  color: var(--gray-low);
}
input:focus {
  outline: none; 
  /* box-shadow: 0 0 0 3px #AAD2F5; */
}
.password-eyes {
  cursor: pointer;
  text-align: center;
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
  opacity: .3;
  pointer-events: none;
}
.send-btn.success { 
  opacity: 1;
  pointer-events:initial;
}
.send-btn.loading{
  background-color: rgb(31, 137, 229, 60%);
  pointer-events: none;
}
.go-dashboard-btn {
  color: white;
  padding-top: 13px;
  padding-bottom: 13px;
  background-color: var(--primary);
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 30px;
  text-align: center;
  cursor: pointer;
  margin-top: 30px;
}
.go-dashboard-btn.loading{
  background-color: rgb(31, 137, 229, 60%);
  pointer-events: none;
}
.hint-text {
  font-size: 12px;
  color: var(--blue-gray-higher);
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 30px;
  line-height: 18px;
}
.failed-text {
  font-size: 12px;
  color: var(--danger);
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 30px;
  line-height: 18px;
}
.success-text {
  font-size: 12px;
  color: var(--blue-gray-higher);
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-bottom: 30px;
  line-height: 18px;
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

/****** tooltip ******/
.tooltip {
  /* position: relative; */
  /* display: inline-block; */
  width: 40px;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: var(--blue-gray-higher);
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  font-size: 14px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 4px;
  right: -115px;


  /* Animation */
  transition: opacity .3s ease;
  opacity: 0;
  transition-delay: .3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.test {
  font-size: 12px;
  color: var(--primary);
  text-align: center;
  margin-top: -10px;
  cursor: pointer;
}

/****** animations ******/
.msg-fade-enter-active, .msg-fade-leave-active {
  transition: all .3s ease;
  /* transition-delay: .2s; */
}
.msg-fade-enter, .msg-fade-leave-to {
  opacity: 0;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg); }
}
/****** media ******/
@media screen and (max-width: 600px) {
  .form {
    margin: 60px 30px 100px 30px;
  }
}
</style>

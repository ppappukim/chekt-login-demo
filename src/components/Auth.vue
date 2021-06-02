<template>
  <div class="wrapper">
    <div class="header"><img src="../assets/chekt-logo.png" style="width:100px;height:100%;"></div>
      <transition name="component-fade" mode="out-in">
        <!-- 내용// -->
        <router-view></router-view>
        <!-- //내용 -->
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
  },
  computed: {
  },
  created: function () {
  },
  methods: {
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
}
@media screen and (max-width: 380px) {
  .wrapper {
    width: 300px;
  }
}

</style>

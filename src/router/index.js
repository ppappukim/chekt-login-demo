import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword
    }
  ]
})

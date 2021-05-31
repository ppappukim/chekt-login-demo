import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ResetPassword from '@/components/ResetPassword'

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
      path: '/resetpassword',
      name: 'resetpassword',
      component: ResetPassword
    }
  ]
})

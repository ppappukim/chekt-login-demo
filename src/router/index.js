import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Login from '@/components/Login'
import ResetPassword from '@/components/ResetPassword'
import ForgotPassword from '@/components/ForgotPassword'
import Passwordless from '@/components/Passwordless'
import PasswordlessExpired from '@/components/PasswordlessExpired'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'Auth',
      component: Auth,
      children: [
        {
          path: '/login',
          component: Login
        },
        {
          // /forgotpassword 과 일치 할 때
          // ForgotPassword은 Login의 <router-view> 내에 렌더링 됩니다.
          path: 'forgotpassword',
          component: ForgotPassword
        },
        {
          path: '/resetpassword',
          component: ResetPassword
        },
        {
          path: '/passwordless',
          component: Passwordless
        },
        {
          path: '/passwordless_expired',
          component: PasswordlessExpired
        },
      ]
    },
  ]
})

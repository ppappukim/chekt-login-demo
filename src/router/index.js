import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Login from '@/components/Login'

// Reset Password
import ResetPassword from '@/components/resetpassword/ResetPassword'
import ForgotPassword from '@/components/resetpassword/ForgotPassword'
import ResetPasswordExpired from '@/components/passwordless/ResetPasswordExpired'

// Passwordless
import PasswordlessExpired from '@/components/passwordless/PasswordlessExpired'
import Passwordless from '@/components/passwordless/Passwordless'

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
          path: '/resetpassword_expired',
          component: ResetPasswordExpired
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

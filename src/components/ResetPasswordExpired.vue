<template>
  <div class="body">
    <div class="form">
      <div class="form-header">
        <div class="title">This password reset link is invalid.</div>
        <div class="desc">
          {{descMessage}}
        </div>
        <div v-on:click="clickResetting()" class="action">
          Try resetting your password again.
        </div>
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
  name: 'resetpassword',
  data () {
    return {
      descMessage: 'Currently, the link is not available. Please resetting your password again.',
    }
  },
  mounted: function () {
    this.checkResetEmailVerifyStatus()
  },
  computed: {
    resetEmailVerifyStatus: function () {
      return this.$store.getters.resetEmailVerifyStatus
    },
  },
  watch: {
    resetEmailVerifyStatus: function () {
      this.checkResetEmailVerifyStatus()
    },
  },
  methods: {
    clickResetting: function () {
      this.$router.push({path:'/forgotpassword'})
    },
    checkResetEmailVerifyStatus: function () {
      if (!this.resetEmailVerifyStatus) return
      if (this.resetEmailVerifyStatus !== 'successful') {
        if (!this.resetEmailVerifyStatus.message) return
        this.descMessage = this.resetEmailVerifyStatus.message
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
.title {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-high);
  text-align: start;
}

.desc {
  margin-top:10px;
  font-size: 14px;
  color: var(--blue-gray-higher);
  line-height: 18px;
}

.action {
  margin-top:20px;
  font-size: 14px;
  color: var(--primary);
  font-weight: 400;
  cursor: pointer;
}
.action:hover {
  color: var(--gray-high);
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

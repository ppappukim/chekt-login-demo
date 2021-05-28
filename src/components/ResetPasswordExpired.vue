<template>
  <div class="body">
    <div class="form">
      <div class="form-header">
        <div class="title">This password reset link has expired.</div>
        <div class="desc">
          Currently, the link is not available. Please resetting your password again.
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
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    clickResetting: function () {
      this.$emit("resetchild", false) // isExpired를 false로 바꾼다.
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

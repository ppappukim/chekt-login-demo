<template>
  <div></div>
</template>

<script>
export default {
  name: 'auth-manager',
  computed: {
    getResetEmailActionCodeStatus: function () {
      return this.$store.getters.getResetEmailActionCodeStatus
    },
  },
  data: function () {
    return {
    }
  },
  watch: {
    getResetEmailActionCodeStatus: function () {
      console.log(this.getResetEmailActionCodeStatus);
      if (this.getResetEmailActionCodeStatus === 'successful') {
        // 유효한 action code인지 확인한다.
        this.$firebase.auth.verifyPasswordResetCode()
      } 
    }
  },
  created: async function () {
    // Reset passwrod action code 가져오기.
    this.$firebase.auth.getResetEmailActionCode()
  },
  mounted: function () {
  },
  beforeDestroy: function () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

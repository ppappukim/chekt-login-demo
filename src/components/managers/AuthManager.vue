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
      if (this.getResetEmailActionCodeStatus === 'successful') this.$firebase.auth.verifyPasswordResetCode()
    }
  },
  created: async function () {
  },
  mounted: function () {
    this.$firebase.auth.getResetEmailActionCode()
  },
  beforeDestroy: function () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

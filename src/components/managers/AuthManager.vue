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
    this.$nextTick(() => {
      await this.$tool.wait(1000)
      this.$firebase.auth.getResetEmailActionCode()
    })
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

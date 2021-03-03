<template>
  <section class="app-main ">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  background: url(../../icons/images/bg.jpg) no-repeat top center;
  background-attachment:fixed;
  margin-top: 10px;
  /* background-image:  radial-gradient(#006aff, #000a39 60%); */
  /*50 = navbar  */
  min-height: 100vh;
  background-size: cover;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
  /*padding-bottom: 50px;*/
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

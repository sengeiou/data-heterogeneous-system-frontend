<template>
  <div class="navbar">
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import Sidebar from "@/layout/components/Sidebar"
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Sidebar,
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data() {
    return{
      ifHide: true,
      title: "企业数据异构系统",
      fullscreen: false,

    }
  },
  mounted: function () {
    this.$tours['myTour'].start()
  },
  methods: {
    handleFullScreen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      console.log(this.fullscreen)
      this.fullscreen = !this.fullscreen;
    },

    toggleSideBar() {
      this.ifHide = !this.ifHide
      // this.$store.dispatch('app/toggleSideBar')
    },
    changePass(){
      this.$router.push(`/changePass`)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-tour__target--highlighted {
    box-shadow: 0 0 0 99999px rgba(0,0,0,.4);
    /*pointer-events: auto;*/
    /*z-index: 9999;*/
  }

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #000a39;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  width: 100%;
  text-align: center;

  .breadcrumb-container {
    float: left;
  }

  .title4{
    font-family: "mengxiangFont";
    font-size: 30px;
    width: 100%;
    /*margin: 0 auto;*/
    position: absolute;
    line-height: 55px;
    /*float: left;*/
    /*text-align: center;*/
    color: #fafafa;
    letter-spacing: 10px;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  }

  @font-face {
    font-family: mengxiangFont;
    src: url(../../font/RuiZiRuiXianMengXiangHeiJianV1-0-1.ttf);
  }

  // 滑动动画
  .slideIn {
    animation: slideIn1 .3s ease forwards;
    // animation-fill-mode: forwards;
  }
  .slideOut {
    animation: slideOut .3s ease forwards;
    // animation-fill-mode: forwards;
  }
  @keyframes slideIn1 {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-150%);
    }
  }
  @keyframes slideOut {
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }

    /*&:focus {*/
    /*  outline: none;*/
    /*}*/
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

  }
}
</style>

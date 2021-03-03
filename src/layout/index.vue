<template>
  <div :class="classObj" class="app-wrapper" >
<!--    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />-->
<!--    <sidebar class="sidebar-container" />-->
<!--    <div class="main-container">-->
    <div >
      <div id="main"></div>

      <div :class="{'fixed-header':fixedHeader}">
        <navbar >
            <hamburger  id="v-step-0" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
            <!--    <sidebar class="sidebar-container hamburger-container" />-->
            <sidebar class="breadcrumb-container" :class="{slideIn: ifHide, slideOut: !ifHide}"/>
            <!--    <sidebar1/>-->
            <div v-show="ifHide" class="title4">{{title}}</div>
            <div class="right-menu">
              <!--      <sidebar/>-->

              <screenfull id="screenfull"  class="right-menu-item hover-effect" style="position: relative;"/>

              <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                  <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                  <i class="el-icon-caret-bottom" />
                </div>

                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                  <el-dropdown-item divided @click.native="logout">
                    <span style="display:block;">退出登录</span>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click.native="changePass">
                    <span style="display:block;">修改密码</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </navbar>
      </div>

      <app-main />
<!---->

    </div>
    <v-tour name="myTour" :steps="steps"  :options="myOptions"></v-tour>

  </div>
</template>

<script>
import { Navbar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import Sidebar from "@/layout/components/Sidebar"
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'


export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
    Breadcrumb,
    Sidebar,
    Hamburger,
    Screenfull
  },
  mixins: [ResizeMixin],
  data(){
    return {
      ifHide: true,
      title: "企业数据异构系统",
      fullscreen: false,
      myOptions: {
        // useKeyboardNavigation: false,
        startTimeout: 100,
        highlight: true,
        labels: {
          buttonSkip: '跳过',
          buttonPrevious: '上一步',
          buttonNext: '下一步',
          buttonStop: '关闭'
        },

      },
      steps: [
        {
          target: '#main',
          content: '点击下一步获取操作指引 @蓬松的头发',
          params: {
            placement: 'center',
            highlight: true   //不显示
          }
        },
        {
          target: '#v-step-0',  // We're using document.querySelector() under the hood
          content: `点击此处 <strong>页面导航</strong>!`,
          params: {
            placement: 'right',
            // highlight: false   //不显示
          }
        },
        {
          target: '#screenfull',
          content: '全屏显示！',
          params: {
            placement: 'left',
            // highlight: false   //不显示
          }
        },

      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
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
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;

    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

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
      src: url(../font/RuiZiRuiXianMengXiangHeiJianV1-0-1.ttf);
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

<template>
<!--  <div :class="{'has-logo':showLogo}">-->
<!--    <logo v-if="showLogo" :collapse="isCollapse" />-->
<!--    <el-scrollbar wrap-class="scrollbar-wrapper">-->
<!--
当前激活菜单的 index
是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
collapse-transition是否开启折叠动画
-->
<!--  <el-scrollbar wrap-class="scrollbar-wrapper">-->
      <el-menu
        :default-active="activeMenu"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        menu-trigger="hover"
        mode="horizontal"
      style="background-color: rgba(0, 0, 0, 0.0)">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
<!--  </el-scrollbar>-->
<!--    </el-scrollbar>-->
<!--        <el-menu-->
<!--          mode="horizontal"-->
<!--          background-color="#545c64"-->
<!--          text-color="#fff"-->
<!--          active-text-color="#ffd04b">-->
<!--          <el-menu-item index="1">处理中心</el-menu-item>-->
<!--          <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
<!--          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
<!--        </el-menu>-->
<!--  </div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: "Sidebar",
  components: { SidebarItem, Logo },

  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

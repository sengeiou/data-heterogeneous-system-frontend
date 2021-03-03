import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/register/company',
    component: () => import('@/views/register/company'),
    hidden: true
  },
  {
    path: '/changePass',
    component: () => import('@/views/changePass/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统可视化大屏', icon: 'dashboard' }
    }]
  },

  {
    path: '/usermodule',
    component: Layout,
    // redirect: '/usermodule/userlist',
    name: 'usermodule',
    meta: { title: '用户管理', icon: 'user'},
    children: [{
      path: 'userlist',
      name: 'userlist',
      component: () => import('@/views/usermodule/userlist/index'),
      meta: { title: '管理员列表', icon: 'user' }
    },
      {
        path: 'searchUser',
        name: 'searchUser',
        component: () => import('@/views/usermodule/userInfo/index'),
        meta: { title: '个人信息', icon: 'user' }
      }]
  },

  {
    path: '/panal',
    component: Layout,
    meta: { title: '异构数据集成', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'datasource',
        name: '数据源管理',
        component: () => import('@/views/datasource/index'),
        meta: { title: '数据源管理', icon: 'el-icon-s-data' }
      },
      {
        path: 'add',
        name: '添加面板',
        component: () => import('@/views/panal/add'),
        meta: { title: '添加面板', icon: 'el-icon-circle-plus' }
      },
      {
        path: 'list',
        name: '所有面板',
        component: () => import('@/views/panal/list'),
        meta: { title: '所有面板', icon: 'el-icon-circle-plus' }
      }

    ]
  },
  {
    path: '/influx',
    component: Layout,
    name: 'influx',
    meta: { title: '资源监控', icon: 'el-icon-s-grid' },
    children: [
      {
        path: 'getInfo',
        name: 'getInfo',
        component: () => import('@/views/influx/getInfo/index'),
        meta: { title: '监控中心', icon: 'el-icon-circle-plus' }
      },
      {
        path: 'panal',
        name: 'panal',
        component: () => import('@/views/influx/panal/index'),
        // meta: { title: '监控面板', icon: 'el-icon-data-line' }
      },
      {
        path: 'warning',
        name: 'warning',
        component: () => import('@/views/influx/warning/index'),
        meta: { title: '预警中心', icon: 'el-icon-message-solid' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://deltaqin.shanghai.cosmoplat.com/introduction.html',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import type { RouteRecordRaw } from 'vue-router'
import { basicRouteMap } from './router-modules'

export const ROOT_ROUTE_REDIRECT_PATH = '/dashboard'
const Layout = () => import('~/layouts/index.vue')

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'rootPath',
  redirect: ROOT_ROUTE_REDIRECT_PATH,
  component: Layout,
  children: [],
}

export default [
  {
    path: '/dashboard',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/dashboard/analysis',
        name: 'DashboardAnalysis',
        component: () => import('~/pages/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
        },
      },
    ],
  },
  {
    path: '/account',
    redirect: '/account/center',
    name: 'Account',
    meta: {
      title: '个人页',
      icon: 'UserOutlined',
      locale: 'menu.account',
    },
    component: basicRouteMap.RouteView,
    children: [
      {
        path: '/account/center',
        name: 'AccountCenter',
        component: () => import('~/pages/account/center.vue'),
        meta: {
          title: '个人主页',
          locale: 'menu.account.center',
        },
      },
    ],
  },
] as RouteRecordRaw[]

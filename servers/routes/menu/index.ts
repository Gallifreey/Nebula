const menuData = [
  {
    id: 1,
    parentId: null,
    title: '仪表盘',
    icon: 'DashboardOutlined',
    component: 'RouteView',
    redirect: '/dashboard/analysis',
    path: '/dashboard',
    name: 'Dashboard',
    locale: 'menu.dashboard',
  },
  {
    id: 2,
    parentId: 1,
    title: '分析页',
    component: '/dashboard/analysis',
    path: '/dashboard/analysis',
    name: 'DashboardAnalysis',
    keepAlive: true,
    locale: 'menu.dashboard.analysis',
  },
  {
    id: 36,
    parentId: null,
    title: '个人页',
    icon: 'UserOutlined',
    component: 'RouteView',
    redirect: '/account/center',
    path: '/account',
    name: 'Account',
    locale: 'menu.account',
  },
  {
    id: 37,
    parentId: 36,
    path: '/account/center',
    title: '个人中心',
    name: 'AccountCenter',
    component: '/account/center',
    locale: 'menu.account.center',
  }
]

export const accessMenuData = [
  {
    id: 18,
    parentId: 15,
    path: '/access/admin',
    title: '管理员',
    name: 'AccessAdmin',
    component: '/access/admin',
    locale: 'menu.access.admin',
  },
]

export default eventHandler((event) => {
  const token = getHeader(event, 'Authorization')
  const username = Buffer.from(token, 'base64').toString('utf-8')
  return {
    code: 200,
    msg: '获取成功',
    data: [...menuData, ...(username === 'admin' ? accessMenuData : [])],
  }
})

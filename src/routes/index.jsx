export default [{
  path: '/',
  exact: true,
  getComponent: () => import('../app/home'),
  meta: {
    name: 'home'
  }
}, {
  path: '/demo',
  getComponent: () => import('../app/demo'),
  meta: {
    name: 'demo'
  }
}, {
  path: '/count',
  getComponent: () => import('../app/count'),
  meta: {
    name: 'count'
  }
}]

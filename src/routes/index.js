export default [{
  path: '/',
  exact: true,
  getComponent: () => import('../app/home'),
  meta: {
    name: 'home'
  }
}]

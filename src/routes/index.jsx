import React, { lazy } from 'react'

const Home = lazy(() => import('../app/home'))
const Demo = lazy(() => import('../app/demo'))
const Count = lazy(() => import('../app/count'))

export default [{
  path: '/',
  exact: true,
  component: (props) => <Home {...props} />,
  meta: {
    name: 'home'
  }
}, {
  path: '/demo',
  component: (props) => <Demo {...props} />,
  meta: {
    name: 'demo'
  }
}, {
  path: '/count',
  component: (props) => <Count {...props} />,
  meta: {
    name: 'count'
  }
}]

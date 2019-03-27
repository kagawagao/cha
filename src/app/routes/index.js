import React, { lazy } from 'react'

const Home = lazy(() => import('./home'))

export default [{
  path: '/',
  exact: true,
  component: (props) => (<Home {...props} />),
  meta: {
    name: 'home'
  }
}]

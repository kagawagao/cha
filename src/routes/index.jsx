import React, { lazy } from 'react'

const Home = lazy(() => import('app/home'))

export default [{
  path: '/',
  exact: true,
  component: (props) => <Home {...props} />,
  meta: {
    name: 'home'
  }
}]

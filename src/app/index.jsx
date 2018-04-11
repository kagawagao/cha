import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import AsyncRoute from 'components/async-route'
import 'antd/es/style/index.less'

const App = ({ history }) => (
  <Router history={history}>
    <Switch>
      <AsyncRoute key="/" exact path="/" getComponent={() => import('./home')} />
      <AsyncRoute key="/demo" path="/demo" getComponent={() => import('./demo')} />
      <AsyncRoute key="/count" path="/count" getComponent={() => import('./count')} />
    </Switch>
  </Router>
)

App.propTypes = {
  history: PropTypes.object
}

export default hot(module)(App)

import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import AsyncRoute from 'components/async-route'
import routes from 'routes'

import 'antd/es/style/index.less'

const App = ({ history }) => (
  <Router history={history}>
    <Switch>
      {routes.map(route => (
        <AsyncRoute key={route.path} {...route} />
      ))}
    </Switch>
  </Router>
)

App.propTypes = {
  history: PropTypes.object
}

export default hot(module)(App)

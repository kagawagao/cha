import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Header from 'components/header'
import AsyncRoute from 'components/async-route'
import routes from 'routes'

import 'antd/es/style/index.less'

const App = ({ history }) => (
  <div className="app">
    <Header />
    <Router history={history}>
      <Switch>
        {routes.map(route => (
          <AsyncRoute key={route.path} {...route} />
        ))}
      </Switch>
    </Router>
  </div>
)

App.propTypes = {
  history: PropTypes.object
}

export default hot(module)(App)

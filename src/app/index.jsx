import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route } from 'react-router'
import { hot } from 'react-hot-loader'
import Home from './home'
import Demo from './demo'
import Count from './count'

const App = ({ history }) => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/demo" component={Demo}/>
      <Route path="/count" component={Count}/>
    </Switch>
  </Router>
)

App.propTypes = {
  history: PropTypes.object
}

export default hot(module)(App)

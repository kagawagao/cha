import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import routes from 'routes'

const App = ({ history }) => (
  <div className='app'>
    <Router history={history}>
      <Suspense fallback={null}>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect from='*' to='/' />
        </Switch>
      </Suspense>
    </Router>
  </div>
)

App.propTypes = {
  history: PropTypes.object
}

export default hot(module)(App)

import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import store, { history } from '../store'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import routes from './routes'
import './styles/index.less'

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Suspense fallback={(<div />)}>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
)

export default hot(App)

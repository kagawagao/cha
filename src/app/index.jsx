import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import Header from 'components/header'
import Loading from 'components/loading'
import routes from 'routes'

class App extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object
  }

  componentDidCatch (error, info) {
    console.error(error)
    console.info(info)
  }

  render () {
    const { history } = this.props
    return (
      <div className="app">
        <Header />
        <Router history={history}>
          <Suspense fallback={<Loading />} >
            <Switch>
              {routes.map(route => (
                <Route key={route.path} {...route} />
              ))}
              <Redirect from="*" to="/" />
            </Switch>
          </Suspense>
        </Router>
      </div>
    )
  }
}

export default hot(App)

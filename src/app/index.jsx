import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Header from 'components/header'
import Loading from 'components/loading'
import routes from 'routes'

import 'antd/es/style/index.less'

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
            </Switch>
          </Suspense>
        </Router>
      </div>
    )
  }
}

export default hot(module)(App)

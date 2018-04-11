import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from 'store'
import App from './app'

const mountNode = document.getElementById('root')

ReactDOM.render((
  <Provider store={store}>
    <App history={history}/>
  </Provider>
), mountNode)

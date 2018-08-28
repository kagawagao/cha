import {createStore} from 'aerux'
import createHistory from 'history/createHashHistory'
import promiseMiddleware from 'redux-promise'
import messageMiddleware from './middleware/message'
import { makeRootReducer } from './reducer'
import { updateLocation } from './reducer/location'

// history
export const history = createHistory()

// middleware
const middlewares = [promiseMiddleware, messageMiddleware]

// enhancer
const enhancers = []

// initial state
const initialState = {}

// compose
let composeWithEnhancer

// use redux chrome extension in development
if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeWithEnhancer = composeWithDevToolsExtension
  } else {
    const { createLogger } = require('redux-logger')
    middlewares.push(createLogger())
  }
}

const store = createStore({
  middlewares,
  enhancers,
  compose: composeWithEnhancer,
  initialState,
  initialReducers: makeRootReducer()
})

// To unsubscribe, invoke `store.unsubscribeHistory()` anytime
store.unsubscribeHistory = history.listen(updateLocation(store))

if (module.hot) {
  module.hot.accept('./reducer', () => {
    const { makeRootReducer } = require('./reducer')
    store.hotReplaceReducer(makeRootReducer(store.asyncReducers))
  })
}

export default store

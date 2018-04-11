import { applyMiddleware, createStore, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import createHistory from 'history/createHashHistory'
import { makeRootReducer } from './reducer'
import { updateLocation } from './reducer/location'

// history
export const history = createHistory()

// middleware
const middleware = [promiseMiddleware]

// enhancer
const enhancer = []

// initial state
const initialState = {}

// compose
let composeWithEnhancer = compose

// use redux chrome extension in development
if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeWithEnhancer = composeWithDevToolsExtension
  } else {
    const { createLogger } = require('redux-logger')
    middleware.push(createLogger())
  }
}

const store = createStore(makeRootReducer(), initialState, composeWithEnhancer(
  applyMiddleware(...middleware),
  ...enhancer
))

// async reducers
store.asyncReducers = {}

// inject reducer

store.injectReducer = (key, reducer) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

// To unsubscribe, invoke `store.unsubscribeHistory()` anytime
store.unsubscribeHistory = history.listen(updateLocation(store))

if (module.hot) {
  module.hot.accept('./reducer', () => {
    const { makeRootReducer } = require('./reducer')
    store.replaceReducer(makeRootReducer(store.asyncReducers))
  })
}

export default store

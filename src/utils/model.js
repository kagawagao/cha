import { createActions, handleActions } from 'redux-actions'
import {flattenActionMap} from 'redux-actions/lib/flattenUtils'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isPlainObject from 'lodash/isPlainObject'

const defaultAction = (payload) => payload

const defaultReducer = (state, {payload}) => payload

const createModel = ({
  state,
  actions,
  reducers
}) => {
  if (isNil(state)) {
    state = null
  }

  let tempActions = {}
  if (isNil(actions)) {
    tempActions = {}
  }

  if (isString(actions)) {
    actions = [actions]
  }

  if (isArray(actions)) {
    actions.forEach(action => {
      if (isString(action)) {
        tempActions[action] = defaultAction
      } else if (isPlainObject(action)) {
        tempActions = { ...tempActions, ...action }
      }
    })
  } else {
    tempActions = actions
  }

  if (!isPlainObject(reducers)) {
    reducers = {}
  }

  const createdActions = createActions(tempActions)

  if (!isEmpty(tempActions)) {
    Object.keys(flattenActionMap(tempActions)).forEach(type => {
      if (!reducers[type]) {
        reducers[type] = defaultReducer
      }
    })
  }

  return {
    actions: createdActions,
    reducer: handleActions(reducers, state)
  }
}

export default createModel

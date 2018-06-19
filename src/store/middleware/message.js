import { isError } from 'flux-standard-action'
import {actions as messageActions} from '../reducer/message'

const { addMessage } = messageActions

function isPromise (val) {
  return val && typeof val.then === 'function'
}

export default store => next => action => {
  if (action.type !== 'addMessage' && action.type !== 'delMessage' && !isPromise(action.payload)) {
    if (isError(action) || (action.meta && (action.meta.success))) {
      if (!isError(action)) {
        const message = action.meta.success
        const msgAction = {
          message
        }
        store.dispatch(addMessage(msgAction))
      } else {
        let error = action.payload
        if (action.meta && action.meta.error) {
          error = {
            message: action.meta.error
          }
        }
        store.dispatch(addMessage(error))
      }
    }
  }
  return next(action)
}

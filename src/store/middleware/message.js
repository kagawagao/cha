import { isError } from 'flux-standard-action'
import {actions as messageActions} from '../reducer/message'

const { addMessage } = messageActions

function isPromise (val) {
  return val && typeof val.then === 'function'
}

export default store => next => action => {
  if (action.type !== 'addMessage' && action.type !== 'delMessage' && !isPromise(action.payload)) {
    if (isError(action) || (action.meta && (action.meta.success || action.meta.error))) {
      if (!isError(action)) {
        const message = action.meta.success || action.meta.error
        const msgAction = {
          message
        }
        store.dispatch(addMessage(msgAction))
      } else {
        const error = action.payload
        store.dispatch(addMessage(error))
      }
    }
  }
  return next(action)
}

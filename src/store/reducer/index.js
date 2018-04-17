import locationReducer from './location'
import messageReducer from './message'

export const makeRootReducer = (asyncReducers = {}) => {
  return {
    location: locationReducer,
    message: messageReducer,
    ...asyncReducers
  }
}

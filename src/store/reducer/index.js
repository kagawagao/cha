import locationReducer from './location'

export const makeRootReducer = (asyncReducers = {}) => {
  return {
    location: locationReducer,
    ...asyncReducers
  }
}

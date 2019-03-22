import { parsePath } from 'history'
import { createModel } from 'aerux'

export const { actions, reducer } = createModel({
  state: parsePath(window.location.hash.replace('#', '')),
  actions: 'locationChange'
})

export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(actions.locationChange(nextLocation))
}

export default reducer

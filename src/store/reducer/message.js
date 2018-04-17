import { createModel } from 'aerux'

export const { actions, reducer } = createModel({
  state: [],
  actions: ['addMessage', 'delMessage'],
  reducers: {
    addMessage: {
      next: (state, { payload }) => {
        // normally message, such as success or info
        state.push(payload)
        return state
      },
      throw: (state, { payload }) => {
        // error message
        // TODO: add error type
        state.push(payload)
        return state
      }
    }
  }
})

export default reducer

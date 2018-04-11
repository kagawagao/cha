import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'antd'
import createModel from 'utils/model'
import store from 'store'

const { actions, reducer } = createModel({
  state: 0,
  actions: [{
    plus: count => Promise.resolve(count)
  }, 'minus', 'reset'],
  reducers: {
    plus: (state, { payload }) => state + payload,
    minus: (state, { payload }) => state - payload
  }
})

store.injectReducer('count', reducer)

@connect(state => ({
  count: state.count
}), dispatch => bindActionCreators(actions, dispatch))
export default class Count extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    plus: PropTypes.func,
    minus: PropTypes.func,
    reset: PropTypes.func
  }
  render () {
    const { count } = this.props
    return (
      <div>
        <Button onClick={() => this.props.plus(2)}>+</Button>
        <span>{count}</span>
        <Button onClick={() => this.props.minus(1)}>-</Button>
        <Button onClick={() => this.props.reset(0)}>Reset</Button>
      </div>
    )
  }
}

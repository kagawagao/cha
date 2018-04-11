import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

export default class AsyncRoute extends React.Component {
  static propTypes = {
    getComponent: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      component: undefined
    }
  }

  getComponent () {
    if (this.props.getComponent && typeof this.props.getComponent === 'function') {
      this.props.getComponent()
        .then(component => {
          this.setState({
            component
          })
        })
        .catch(e => {
          console.error(e)
        })
    }
  }

  render () {
    const { component } = this.state
    return (
      <Route {...this.props} render={(props) => {
        if (component === undefined) {
          this.getComponent()
        }
        return component ? React.createElement(component.default || component, props) : null
      }} />
    )
  }
}

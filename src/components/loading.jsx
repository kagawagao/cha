import React from 'react'
import { Spin } from 'antd'
import 'styles/components/loading'

export default class Loading extends React.PureComponent {
  render () {
    return (
      <div className="loading" >
        <Spin delay={100} size={'large'} />
      </div>
    )
  }
}

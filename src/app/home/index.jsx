import React from 'react'
import { hot } from 'react-hot-loader'

import 'styles/app/home.less'

class Home extends React.PureComponent {
  render () {
    return (
      <div className='home'>Home</div>
    )
  }
}

export default hot(module)(Home)

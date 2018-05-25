import React from 'react'
import { hot } from 'react-hot-loader'

import 'styles/app/home.less'

class Home extends React.PureComponent {
  render () {
    return (
      <div className="home">
        <div className="home-intro">
          <div className="home-title">🍵 CHA</div>
          <div className="home-desc">Out-of-box mid-stage-admin starter kit</div>
        </div>
        <ul className="home-feature">
          <li className="home-feature-item">
            <img className="home-feature-item-img" src={require('static/react.svg')} />
            <div className="home-feature-item-intro">
              <div className="home-feature-item-title">React</div>
              <div className="home-feature-item-sub">Based on React</div>
            </div>
          </li>
          <li className="home-feature-item">
            <img className="home-feature-item-img" src={require('static/antd.svg')} />
            <div className="home-feature-item-intro">
              <div className="home-feature-item-title">Antd</div>
              <div className="home-feature-item-sub">Use Antd As UI Kit</div>
            </div>
          </li>
          <li className="home-feature-item">
            <img className="home-feature-item-img" src={require('static/modular.svg')} />
            <div className="home-feature-item-intro">
              <div className="home-feature-item-title">Modular</div>
              <div className="home-feature-item-sub">Module Loading On Demand</div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default hot(module)(Home)

import React from 'react'
import { hot } from 'react-hot-loader'
import { Carousel } from 'antd'

import 'styles/app/home.less'

class Home extends React.PureComponent {
  render () {
    return (
      <div className="home">
        <Carousel className="home-carousel" autoplay>
          <div className="home-carousel-item">
            <img className="home-carousel-item-img" src={require('static/react.svg')} />
            <div className="home-carousel-item-title">React</div>
            <div className="home-carousel-item-sub">Based on React</div>
          </div>
          <div className="home-carousel-item">
            <div className="home-carousel-item-title">Antd</div>
            <div className="home-carousel-item-sub">Use Antd As UI Kit</div>
          </div>
          <div className="home-carousel-item">
            <div className="home-carousel-item-title">Modular</div>
            <div className="home-carousel-item-sub">Modular For Use</div>
          </div>
          <div className="home-carousel-item">
            <div className="home-carousel-item-title">On-Demand</div>
            <div className="home-carousel-item-sub">Load Module On-Demand</div>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default hot(module)(Home)

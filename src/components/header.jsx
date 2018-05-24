import React from 'react'
import { Button } from 'antd'
import 'styles/components/header'

export default class Header extends React.PureComponent {
  state = {
    visible: false
  }

  handleLogin = () => {
    window.location.hash = '#/login'
  }

  render () {
    return (
      <header className="header">
        <a href="#" className="header-left">
          <span className="icon">
            <span className="icon-left" />
            <span className="icon-right" />
          </span>
          <span className="logo">CHA 🍵</span>
        </a>
        <div className="header-right">
          <Button onClick={this.handleLogin} type="primary" ghost>Login</Button>
        </div>
      </header>
    )
  }
}

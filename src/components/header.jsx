import React from 'react'
import { Button } from 'antd'
import 'styles/components/header'

export default class Header extends React.PureComponent {
  state = {
    visible: false
  }

  preview = () => {
    window.location.hash = '#/login'
  }

  render () {
    return (
      <header className="header">
        <a href="#" className="header-left">
          <span className="logo">🍵 CHA</span>
        </a>
        <div className="header-right">
          <Button onClick={this.preview} type="primary">Preview</Button>
        </div>
      </header>
    )
  }
}

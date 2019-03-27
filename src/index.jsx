import 'raf/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const mountNode = document.getElementById('root')

ReactDOM.render(<App />, mountNode)

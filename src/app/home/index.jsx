import React from 'react'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'

const Home = () => (
  <div>
    <ul>
      <li>
        <Link to="/demo">Demo</Link>
      </li>
      <li>
        <Link to="/count">Count</Link>
      </li>
    </ul>
  </div>
)

export default hot(module)(Home)

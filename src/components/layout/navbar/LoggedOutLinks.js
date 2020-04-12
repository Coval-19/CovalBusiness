import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/registration'>Register</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default LoggedOutLinks

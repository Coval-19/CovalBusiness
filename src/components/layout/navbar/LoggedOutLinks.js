import React from 'react'
import { NavLink } from 'react-router-dom'

const LoggedOutLinks = () => {
  return (
    <React.Fragment>
      <li><NavLink to='/registration'>Register</NavLink></li>
      <li><NavLink to='/login'>Login</NavLink></li>
    </React.Fragment>
  )
}

export default LoggedOutLinks

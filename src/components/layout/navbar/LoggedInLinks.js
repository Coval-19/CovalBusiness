import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/authActions'
import ProfileImage from '../../profile/ProfileImage'

const LoggedInLinks = (props) => {
  return (
    <React.Fragment>
      <li><NavLink to='/'>Dashboard</NavLink></li>
      <li><NavLink to='/profile'>Profile</NavLink></li>
      <li><a href="!#" onClick={props.logout}>Logout</a></li>
      <li className="hide-on-med-and-down">
        <NavLink to='/profile'>
          <ProfileImage />
        </NavLink>
      </li>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks)

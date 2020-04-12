import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/authActions'

const LoggedInLinks = (props) => {
  const businessNameFirstLetter = props.profile.businessName?.[0]

  return (
    <React.Fragment>
      <li><a onClick={props.logout}>Logout</a></li>
      <li className="hide-on-med-and-down">
        <NavLink to='/' className="btn btn-floating blue">
          {businessNameFirstLetter}
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

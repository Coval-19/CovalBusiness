import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../store/actions/authActions'

const LoggedInLinks = (props) => {
  const businessNameFirstLetter = props.profile.businessName?.[0]

  return (
    <div>
      <ul className="right">
        <li><a onClick={props.logout}>Logout</a></li>
        <li>
          <NavLink to='/' className="btn btn-floating blue">
            {businessNameFirstLetter}
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LoggedInLinks)

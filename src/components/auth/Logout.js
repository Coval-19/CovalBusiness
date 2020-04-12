import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'

// TODO: remove this page!

const Logout = ({logout}) => {
  logout()

  return (
    <div/>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)

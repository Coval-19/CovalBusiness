import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import UserRequestsNotifications from './UserRequestsNotifications'

const Dashboard = (props) => {

  return (
    <div className="dashboard container page-container">
      <UserRequestsNotifications />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    businesses: state.firestore.ordered.businesses,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'businesses', orderBy: ['name', 'desc'] },
  ])
)(Dashboard)

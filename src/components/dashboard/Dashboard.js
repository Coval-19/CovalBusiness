import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Dashboard = (props) => {
  console.log(props)

  return (
    <div className="dashboard container white center page-container">
      <h5 className="grey-text text-darken-3">Registeration Code</h5>
      <p>
        Please scan the QR code with your Coval Business App
      </p>
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
    { collection: 'businesses', orderBy: ['businessName', 'desc'] },
  ])
)(Dashboard)

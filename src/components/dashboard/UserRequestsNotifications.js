import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Styles from '../style/Styles'
import UserRequestCard from './UserRequestCard'

const UserRequestsNotifications = (props) => {
  const { notifications, auth } = props;

  return (
    <div>
      <h5 className={Styles.pageTitle}>Entrance Requests</h5>
      <div className="container">
        { notifications && notifications.map(notification => (
          <UserRequestCard key={notification.userId} businessId={auth.uid} notification={notification}/>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.firestore.ordered.notifications,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{
      collection: 'businesses',
      doc: props.auth.uid, //businessId
      subcollections: [
        { collection: 'notifications', orderBy: ['timestamp', 'desc'], limit: 50 } // TODO: Choose limit for notifications
      ],
      storeAs: 'notifications'
    }]
  }),
)(UserRequestsNotifications)

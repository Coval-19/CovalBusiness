import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Styles from '../style/Styles'
import UserRequestCard from './UserRequestCard'

const UserRequestsNotifications = (props) => {
  const { notifications, auth } = props;

  const isValidNotification = notification => notification && Object.values(notification).reduce((a, b) => a && b)

  const userCards = notifications && notifications
    .reduce((a, b) => (a.map(n => n.userId).includes(b.userId) ? a : [...a, b]), []) // This line removes newer notifications from the same user
    .map(notification => isValidNotification(notification) && (
      <UserRequestCard key={notification.id} businessId={auth.uid} notification={notification}/>
    ))
    
  return (
    <div>
      <h5 className={Styles.pageTitle}>Pending Requests</h5>
      <div className="container">
        {userCards}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.firestore.ordered.notifications,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    return [{
      collection: 'businesses',
      doc: props.auth.uid, //businessId
      subcollections: [
        { collection: 'notifications', orderBy: ['timestamp'], limit: 50 } // TODO: Choose limit for notifications
      ],
      storeAs: 'notifications'
    }]
  }),
)(UserRequestsNotifications)

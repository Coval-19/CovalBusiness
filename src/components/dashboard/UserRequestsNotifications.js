import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Styles from '../style/Styles'
import UserRequestCard from './UserRequestCard'
import { makeToast } from '../layout/makeToast'

class UserRequestsNotifications extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (!(prevProps?.notifications && this?.props?.notifications)) {
      return
    }

    if (prevProps.notifications.length < this.props.notifications.length) {
      const newNotification = this.props.notifications[this.props.notifications.length - 1]
      makeToast(`New request from ${newNotification.userName}`)
    }
  }

  render() {
    const { notifications, auth } = this.props;
  
    const isValidNotification = notification => notification && Object.values(notification).reduce((a, b) => a && b)
  
    const userCards = notifications && notifications
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
}

const mapStateToProps = (state) => {
  let notifications = state.firestore.ordered.notifications

  // Removes newer notifications from the same user
  notifications = notifications && notifications
    .reduce((a, b) => (a.map(n => n.userId).includes(b.userId) ? a : [...a, b]), [])

  return {
    notifications: notifications,
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Styles from '../style/Styles'
import UserRequestCard from './UserRequestCard'
import { makeToast } from '../layout/makeToast'

class UserRequestsNotifications extends Component {
  state = {
    filter: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (!(prevProps?.notifications && this?.props?.notifications)) {
      return
    }

    if (prevProps.notifications.length < this.props.notifications.length) {
      const newNotification = this.props.notifications[this.props.notifications.length - 1]
      makeToast(`New request from ${newNotification.userName}`)
    }
  }

  onFilterChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { notifications, auth } = this.props;
  
    const isValidNotification = notification => notification && Object.values(notification).reduce((a, b) => a && b)
  
    const userCards = notifications && notifications
      .filter(n => {
        const filter = this.state.filter.toLowerCase()
        return !filter || 
          n.userName.toLowerCase().includes(filter) || n.socialNumber.includes(filter)
      })
      .map(notification => isValidNotification(notification) && (
        <UserRequestCard key={notification.id} businessId={auth.uid} notification={notification}/>
      ))

    return (
      <div>
        <h5 className={Styles.pageTitle}>Pending Requests</h5>
        <div class="input-field container">
          <i class="material-icons prefix">filter_list</i>
          <input type="text" id="filter" onChange={this.onFilterChange} />
          <label htmlFor="filter">Filter</label>
        </div>
        <div className="container">
          {userCards}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let notifications = state.firestore.ordered.notifications

  // Removes newer notifications from the same user and sort
  notifications = notifications && notifications
    .reduce((a, b) => (a.map(n => n.userId).includes(b.userId) ? a : [...a, b]), [])
    // TODO: enable this
    // .filter(n => Date.now() - n.timestamp.toDate().getTime() < 30 * 60 * 1000) // Only notifications from 30 min ago
    .sort((a, b) => a.timestamp - b.timestamp)

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
        { 
          collection: 'notifications', 
          orderBy: ['timestamp', 'desc'], 
          limit: 50,
        } // TODO: Choose limit for notifications
      ],
      storeAs: 'notifications'
    }]
  }),
)(UserRequestsNotifications)

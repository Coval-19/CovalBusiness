import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import Styles from '../style/Styles'
import UserImage from '../layout/UserImage'

const UserRequestsNotifications = (props) => {
  // const { notifications } = props;

  const notifications = [
    {
      id: 1,
      user: 'John',
      isCoronaFree: true,
      time: Date.now(),
    },
    {
      id: 2,
      user: 'Bob',
      isCoronaFree: false,
      time: Date.now(),
    }
  ]

  return (
    <div>
      <h5 className={Styles.pageTitle}>Entrance Requests</h5>
      <div className="container">
        { notifications && notifications.map(item =>{
          return (
            <div className="card user-request-notification-card" key={item.id}>
              <div className="card-content">
                <div>
                  <span className="card-title">{item.user}</span>
                  <div className="pink-text">{item.user}</div>
                  <span>{item.isCoronaFree ? 'Corona Free' : 'Not Free'}</span>
                  <div className="note-date grey-text">{moment(item.time).fromNow()}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)

  return {
    // businesses: state.firestore.ordered.businesses,
    // auth: state.firebase.auth,
    // profile: state.firebase.profile,
    data: state.firesore
  }
}

export default compose(
  firestoreConnect(props => {
    return [{
      collection: 'businesses',
      doc: props.businessId,
      subcollections: [
        { collection: 'notifications', orderBy: ['timestamp', 'desc'], limit: 50 } // TODO: Choose limit for notifications
      ],
      storeAs: 'notifications'
    }]
  }),
  connect(mapStateToProps),
)(UserRequestsNotifications)

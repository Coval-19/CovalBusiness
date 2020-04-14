import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { sendResponse, removeNotification, removeNotificationsByUser } from '../../store/actions/requestsActions'
import UserImage from '../layout/UserImage'

const UserRequestCard = (props) => {
  const {notification, sendResponse, removeNotificationsByUser, auth, profile} = props

  const clickHandler = (e) => {
    e.preventDefault()
    const card = document.getElementById(notification.id)

    card.setAttribute('class', card.className + ' scale-out')
    
    setTimeout(() => {
      card.setAttribute('style', 'display: none;')
      sendResponse({
        businessId: auth.uid,
        businessName: profile.name,
        businessAddress: profile.address,
      }, true)
      removeNotificationsByUser(auth.uid)
    }, 200)
  }

  return (
    <div id={notification.id} className="card horizontal user-request-notification-card scale-transition" onClick={(e)=>{
    }}>
      <div className="card-image">
        <UserImage userId={notification.userId} userName={notification.userName} />
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title"><b>{notification.userName}</b></span>
          <div>ID: <span className="pink-text">{notification.socialNumber}</span></div>
          <span>
            {
              notification.isUserCoronaFree ? (
                <span className="green-text">Corona Free</span>
              ) : (
                <span className="red-text">Not Corona Free</span>
              )
            }
          </span>
          <div className="note-date grey-text">{moment(notification.timestamp.toDate()).fromNow()}</div>
        </div>
        <div className="card-action">
          <a className="green-text" href="!#" onClick={clickHandler}><b>Approve</b></a>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {notification} = ownProps

  return {
    sendResponse: (businessInfo, isApproved) => dispatch(sendResponse(
      notification.userId, businessInfo, isApproved)),
    removeNotification: (businessId) => dispatch(removeNotification(businessId, notification.id)),
    removeNotificationsByUser: (businessId) => dispatch(removeNotificationsByUser(businessId, notification.userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRequestCard)

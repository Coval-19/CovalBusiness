import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { sendResponse } from '../../store/actions/requestsActions'
import UserImage from '../layout/UserImage'

const UserRequestCard = (props) => {
  const {notification, sendResponse} = props

  const clickHandler = () => {
    sendResponse(true)
  }

  return (
    <div className="card user-request-notification-card" onClick={clickHandler} style={{width: "20vw"}}>
      <div className="card-image">
        <UserImage className="left" userId={notification.userId} userName={notification.userName} />
      </div>
      <div className="card-content">
        <div>
          <span className="card-title">{notification.userName}</span>
          <div className="pink-text">ID: {notification.socialNumber}</div>
          <span>{notification.isUserCoronaFree ? 'Corona Free' : 'Not Free'}</span>
          <div className="note-date grey-text">{moment(notification.timestamp.toDate()).fromNow()}</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {notification, businessId} = ownProps

  return {
    sendResponse: (isApproved) => dispatch(sendResponse(
      notification.userId, businessId, isApproved))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRequestCard)

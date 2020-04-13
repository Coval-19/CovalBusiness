import React from 'react'
import moment from 'moment'
import UserImage from '../layout/UserImage'

const UserRequestCard = (props) => {
  const {notification} = props

  return (
    <div className="card user-request-notification-card" style={{width: "20vw"}}>
      <div class="card-image">
        <UserImage className="left" userId={notification.userId} userName={notification.userName} />
      </div>
      <div className="card-content">
        <div>
          <span className="card-title">{notification.userName}</span>
          <div className="pink-text">{notification.socialNumber}</div>
          <span>{notification.isUserCoronaFree ? 'Corona Free' : 'Not Free'}</span>
          <div className="note-date grey-text">{moment(notification.timestamp.toDate()).fromNow()}</div>
        </div>
      </div>
    </div>
  )
}

export default UserRequestCard

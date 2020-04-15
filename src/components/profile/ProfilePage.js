import React from 'react'
import ProfileImage from './ProfileImage'

const ProfilePage = (props) => {
  return (
    <div className="profile-page container page-container">
      <div className="center">
        <ProfileImage size="15em" allowUpload={true} />
      </div>
    </div>
  )
}

export default ProfilePage
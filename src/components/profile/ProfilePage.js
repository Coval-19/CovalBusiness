import React from 'react'
import ProfileImage from './ProfileImage'
import ProfileForm from './ProfileForm'

const ProfilePage = (props) => {
  return (
    <div className="profile-page container page-container center">
      <div className="center">
        <ProfileImage size="15em" allowUpload={true} />
      </div>
      <div className="profile-details">
        <ProfileForm />
      </div>
    </div>
  )
}

export default ProfilePage
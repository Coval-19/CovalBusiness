import React, { Component } from 'react'
import { MediaBox } from 'react-materialize'
import { getUserImagePromise } from '../../firebase/firebaseUtils'
import EmptyAvatar from '../../assets/images/empty_avatar.jpg'

class UserImage extends Component {
  state = {
    url: EmptyAvatar,
    accessedFirestoreStorageOnce: false
  }


  render() {
    const {userId, userName} = this.props

    if (!this.state.accessedFirestoreStorageOnce) {
      getUserImagePromise(userId).then((url) => {
        this.setState({
          url: url,
          accessedFirestoreStorageOnce: true,
        })

      }).catch(error => {
        console.log(error)
        this.setState({
          ...this.state,
          accessedFirestoreStorageOnce: true,
        })
      })
    }

    return (
      <img className="user-profile-image" src={this.state.url} alt={userName} {...this.props} />
      // <MediaBox
      //   options={{
      //     inDuration: 275,
      //     onCloseEnd: null,
      //     onCloseStart: null,
      //     onOpenEnd: null,
      //     onOpenStart: null,
      //     outDuration: 200
      //   }}
      // >
      // </MediaBox>
    )
  }
}

export default UserImage

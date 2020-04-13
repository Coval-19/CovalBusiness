import React, { Component } from 'react'
import { getUserImagePromise } from '../../firebase/firebaseUtils'
import EmptyAvatar from '../../assets/images/empty_avatar.jpg'

class UserImage extends Component {
  state = {
    url: ''
  }

  render() {
    const {userId, userName} = this.props

    getUserImagePromise(userId).then((url) => {
      this.setState({
        url: url
      })
    }).catch(error => {
      this.setState({
        url: EmptyAvatar
      })
    })

    return (
      <img src={this.state.url} alt={userName} {...this.props} />
    )
  }
}

export default UserImage

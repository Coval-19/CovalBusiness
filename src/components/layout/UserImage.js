import React, { Component } from 'react'
import { MediaBox } from 'react-materialize'
import { getUserImagePromise } from '../../firebase/firebaseUtils'
import EmptyAvatar from '../../assets/images/empty_avatar.jpg'

class UserImage extends Component {
  state = {
    url: EmptyAvatar,
  }

  componentDidMount() {
    const {userId} = this.props

    getUserImagePromise(userId).then((url) => {
      this.setState({
        url: url,
      })

    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const {userName} = this.props

    return (
      <img className="user-profile-image" src={this.state.url} alt={userName} />
    )
  }
}

export default UserImage

import React, { Component } from 'react'
import { getUserImagePromise } from '../../firebase/firebaseUtils'

class UserImage extends Component {
  state = {
    url: ''
  }

  render() {
    const {userId} = this.props

    getUserImagePromise(userId).then((url) => {
      this.setState({
        url: url
      })
    })

    return (
      <img src={this.state.url} {...this.props}/>
    )
  }
}

export default UserImage

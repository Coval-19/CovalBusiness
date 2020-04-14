import React, { Component } from 'react'
import $ from 'jquery'
import M from "materialize-css";
import { getUserImagePromise } from '../../firebase/firebaseUtils'
import EmptyAvatar from '../../assets/images/empty_avatar.jpg'

class UserImage extends Component {
  state = {
    url: EmptyAvatar,
  }

  componentDidMount() {
    var elems = $('.materialboxed');
    M.Materialbox.init(elems, {});

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
      <div className="user-profile-image-container">
        <img className="user-profile-image materialboxed hide-on-med-and-down" src={this.state.url} alt={userName} />
        <img className="materialboxed hide-on-large-only" src={this.state.url} alt={userName} />
      </div>
    )
  }
}

export default UserImage

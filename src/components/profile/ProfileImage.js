import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBusinessImagePromise, uploadBusinessImagePromise } from '../../firebase/firebaseUtils'
import EmptyAvatar from '../../assets/images/empty_avatar.jpg'

class ProfileImage extends Component {
  state = {
    imageAsFile: '',
    imageUrl: '',
    error: '',
  }

  getPhoto = () => {
    return getBusinessImagePromise(this.props.auth.uid)
      .then(url => {
        this.setState({
          imageUrl: url
        })
      })
  }

  uploadPhoto = () => {
    return uploadBusinessImagePromise(this.state.imageAsFile, this.props.auth.uid)
      .then(this.getPhoto)
      .then(() => {
        this.setState({
          imageAsFile: ''
        })
      })
      .catch(error => this.setState({
        error
      }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.uploadPhoto()
  }

  componentDidMount() {
    this.getPhoto()
      .catch(error => this.setState({
        error
      }))
  }

  render() {
    const { allowUpload, size } = this.props
    const businessNameFirstLetter = this.props.profile.name?.[0]

    // const button = allowUpload ? (
    //   className="btn btn-floating blue"
    // ) : (

    // )

    const imageUrl = this.state.imageUrl ? this.state.imageUrl : EmptyAvatar

    // const size = "15em"
    // const size = "100%"
    // const style = {width: size, height: size}
    const style = {width: size, height: size}

    // const image = this.state.imageUrl ? (
    //   <>
    //   <div className="circle-image-container">
    //     <img className="btn btn-floating img-responsive circle waves-effect waves-light" src={imageUrl} style={style} />
    //     {/* <div className="text-on-image ">HI</div> */}
    //   </div>
    //   {/* <div className="circle-image-container">
    //     <div className="btn btn-floating img-responsive circle waves-effect waves-light blue" style={style}>
    //       <div className="text-on-image ">HI</div>
    //     </div>
    //   </div> */}
    //   </>
    // ) : (
    //   <div className="circle-image-container">
    //     <div className="btn btn-floating img-responsive circle waves-effect waves-light blue" style={style}>
    //     <div className="text-on-image ">HI</div>

    //     </div>
    //     {/* <div className="text-on-image ">{businessNameFirstLetter}</div> */}
    //   </div>
    // )
      
    const image = (
      <a>
        <div className="btn btn-floating circle-image-container blue" style={style}>
          <img className="img-responsive" src={imageUrl} />
          <div className="text-on-image ">HI</div>
        </div>
      </a>
    )

    return image

    return (
      <div className="center">
        {/* <div className="btn btn-floating"> */}
          {image}
        {/* </div> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}


export default connect(mapStateToProps)(ProfileImage)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBusinessImagePromise, uploadBusinessImagePromise } from '../../firebase/firebaseUtils'

class ProfileImage extends Component {
  state = {
    imageAsFile: '',
    imageUrl: '',
    error: '',

    hover: false,
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

  toggleHover = () => {
    const { allowUpload } = this.props
    if (allowUpload) {
      this.setState({hover: !this.state.hover})
    }
  }

  render() {
    const { allowUpload, size } = this.props
    const showUploadOption = allowUpload && this.state.hover
    const imageUrl = this.state.imageUrl

    const businessName = this.props.profile.name
    const businessNameFirstLetter = this.props.profile.name?.[0]
    const text = size ? businessName : businessNameFirstLetter

    const darkerStyle = showUploadOption ? {filter: "brightness(50%)"} : {}
    
    const image = !this.state.imageUrl ? (
      <img className="img-responsive" alt='' src={imageUrl} style={darkerStyle} />
    ) : !showUploadOption && (
      <div className="text-on-image">{text}</div>
    )
    
    const containerStyle = {width: size, height: size}
    let containerClassName = "btn btn-floating circle-image-container blue"
    if (showUploadOption) {
      containerClassName += " darken-4"
    }

    const uploadText = showUploadOption && (<div className="text-on-image">Upload image</div>)

    return (
      <div className={containerClassName}
        style={containerStyle}
        onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        {image}
        {uploadText}
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

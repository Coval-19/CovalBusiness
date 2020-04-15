import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadImage, getImage } from '../../store/actions/profileAction'

function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  return fileSelector;
}

class ProfileImage extends Component {
  state = {
    imageAsFile: '',
    error: '',

    hover: false,
  }
  
  componentDidMount() {
    this.fileSelector = buildFileSelector()
    this.fileSelector.onchange = this.changeHandler

    this.props.getImage(this.props.auth.uid)
  }

  clickHandler = (e) => {
    if (this.props.allowUpload) {
      e.preventDefault()
      this.fileSelector.click()
    }
  }

  changeHandler = (e) => {
    this.props.uploadImage(e.target.files[0], this.props.auth.uid)
  }

  toggleHover = () => {
    if (this.props.allowUpload) {
      this.setState({hover: !this.state.hover})
    }
  }

  render() {
    const { allowUpload, size } = this.props
    const showUploadOption = allowUpload && this.state.hover
    const imageUrl = this.props.profileImage.url

    const businessName = this.props.profile.name
    const businessNameFirstLetter = this.props.profile.name?.[0]
    const text = size ? businessName : businessNameFirstLetter

    const darkerStyle = showUploadOption ? {filter: "brightness(50%)"} : {}
    
    const image = imageUrl ? (
      <img htmlFor="upload-button" className="img-responsive" alt='' src={imageUrl} style={darkerStyle} />
    ) : !showUploadOption && (
      <div htmlFor="upload-button" className="text-on-image">{text}</div>
    )
    
    const containerStyle = {width: size, height: size}
    let containerClassName =  "btn btn-floating circle-image-container blue-grey"
    if (showUploadOption) {
      containerClassName += " darken-4"
    }

    const uploadText = showUploadOption && (<div className="text-on-image">Upload image</div>)

    return (
      <div className={containerClassName}
        style={containerStyle}
        onClick={this.clickHandler}
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
    profile: state.firebase.profile,
    profileImage: state.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (imageAsFile, businessId) => dispatch(uploadImage(imageAsFile, businessId)),
    getImage: (businessId) => dispatch(getImage(businessId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage)

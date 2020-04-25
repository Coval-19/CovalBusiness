import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import Styles from '../style/Styles'
import SubmitButton from '../layout/SubmitButton'
import { updateProfile } from '../../store/actions/profileAction'

class ProfileForm extends Component {
  state = {
    name: '',
    address: '',
    description: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateProfile(this.props.auth.uid, this.state)
  }

  componentDidMount() {
    this.initialState = {
      name: this.props.profile.name,
      address: this.props.profile.address,
      description: this.props.profile.description,
    }

    this.setState(() => {
      $('#description').val(this.props.profile.description);
      window.M.textareaAutoResize($('#description'));
      return this.initialState
    })
  }

  componentDidUpdate(preProps, prevState) {
    if (JSON.stringify(preProps.profile) === JSON.stringify(this.props.profile)) {
      return
    }

    this.initialState = {
      name: this.props.profile.name,
      address: this.props.profile.address,
      description: this.props.profile.description,
    }

    this.setState(() => {
      $('#description').val(this.props.profile.description);
      window.M.textareaAutoResize($('#description'));
      return this.initialState
    })
  }

  render() {
    const { profileChangeError } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-field">
          <label className="active" htmlFor="name">Business Name</label>
          <input type="text" id='name' value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label className="active" htmlFor="address">Address</label>
          <input type="text" id='address' value={this.state.address} onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label className="active" htmlFor="description">Description</label>
          <textarea className="materialize-textarea" id='description' value={this.state.description} onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <SubmitButton formFieldsState={this.state} initialFormFieldsState={this.initialState}>Save</SubmitButton>
          <div className={Styles.error}>
            { profileChangeError ? <p>{profileChangeError}</p> : null }
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    profileChangeError: state.profile.error,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (businessId, profileInfo) => dispatch(updateProfile(businessId, profileInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

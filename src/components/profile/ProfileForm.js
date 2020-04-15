import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import M from "materialize-css";
import Styles from '../style/Styles'
import SubmitButton from '../layout/SubmitButton'

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
  }

  componentDidUpdate(preProps, prevState) {
    if (JSON.stringify(preProps.profile) === JSON.stringify(this.props.profile)) {
      return
    }

    this.setState(() => {
      $('#description').val(this.props.profile.description);
      M.textareaAutoResize($('#description'));
      return {
        name: this.props.profile.name,
        address: this.props.profile.address,
        description: this.props.profile.description,
      }
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
          <SubmitButton formFieldsState={this.state}>Save</SubmitButton>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

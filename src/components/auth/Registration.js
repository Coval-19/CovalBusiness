import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../store/actions/authActions'
import Styles from '../style/Styles'

class Registration extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    address: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  }

  render() {
    const { authError } = this.props;

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Register your business</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="name">Business Name</label>
            <input type="text" id='name' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id='address' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className={Styles.button}>Register</button>
            <div className={Styles.error}>
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    register: (creds) => dispatch(register(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)

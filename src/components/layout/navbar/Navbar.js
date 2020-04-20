import React, { Component } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import { connect } from 'react-redux'
import ProfileImage from '../../profile/ProfileImage'
import Icon from '../../../assets/images/icon512.png'

class Navbar extends Component {

  componentDidMount() {
    var elem = $(".sidenav");

    window.M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });

    var instance = window.M.Sidenav.getInstance(elem)

    $('.sidenav').click(function() {
      instance.close();
    });
  }

  render() {
    const { auth, profile } = this.props;
  
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;
    const userImageSidenav = auth.uid && (
      <li>
        <div className="user-view">
          <div className="background" />
          <Link to='/profile'>
            <ProfileImage size="10em" />
          </Link>
          <a href="!#"><span className="white-text name">{this.props.profile.name}</span></a>
          <a href="!#"><span className="white-text email">{this.props.auth.email}</span></a>
        </div>
      </li>
    )

    const Title = "Coval Businesses"

    return (
      <React.Fragment>
        <nav className="navbar navbar-fixed-top navbar-container nav-wrapper">
          <div className="container">
            <Link to='/' className="brand-logo truncate">
              <div className="navbar-icon-title hide-on-small-only">
                <img className="navbar-icon" src={Icon} alt="" />
                {Title}
              </div>
              <div className="hide-on-med-and-up">
                {Title}
              </div>
            </Link>
            <a href="!#" data-target="mobile-links" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <div className="right hide-on-med-and-down">
              <ul>
                {links}
              </ul>
            </div>
          </div>
        </nav>
  
        <ul className="sidenav grey darken-3" id="mobile-links">
          {userImageSidenav}
          {links}
        </ul>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)

import React, { Component } from 'react'
import $ from 'jquery'
import M from "materialize-css";
import { Link } from 'react-router-dom'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import { connect } from 'react-redux'

class Navbar extends Component {

  componentDidMount(){
    var elem = $(".sidenav");

    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });

    var instance = M.Sidenav.getInstance(elem)

    $('.sidenav').click(function() {
      instance.close();
    });
  }

  render() {
    const { auth, profile } = this.props;
  
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <React.Fragment>
        <nav className="nav-wrapper grey darken-3">
          <div className="container">
            <Link to='/' className="brand-logo truncate">Coval Businesses</Link>
            <a href="!#" data-target="mobile-links" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <div className="right hide-on-med-and-down">
              <ul>
                {links}
              </ul>
            </div>
          </div>
        </nav>
  
        <ul className="sidenav" id="mobile-links">
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

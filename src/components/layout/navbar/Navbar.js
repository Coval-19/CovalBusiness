import React, { Component } from 'react'
import M from "materialize-css";
import { Link } from 'react-router-dom'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import { connect } from 'react-redux'
import Styles from '../../style/Styles'

class Navbar extends Component {

  componentDidMount(){
    var elem = document.querySelectorAll(".sidenav");
    var instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    const { auth, profile } = this.props;
  
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <React.Fragment>
        <nav className="nav-wrapper grey darken-3">
          <div className="container">
            <Link to='/' className={Styles.navTitle}>Coval Businesses</Link>
            <a href="#" data-target="mobile-links" class="sidenav-trigger right"><i class="material-icons">menu</i></a>
            <div className="right hide-on-med-and-down">
              <ul>
                {links}
              </ul>
            </div>
          </div>
        </nav>
  
        <ul class="sidenav" id="mobile-links">
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

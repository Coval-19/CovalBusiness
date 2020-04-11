import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'

function App({ auth }) {

  const pagesSwitch = auth.uid ? (
    <Switch>
      <Route exact path='/' component={Dashboard} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Registration} />
      <Route path = '/' component={() => (<Redirect to='/login' />)} />
    </Switch>
  )

  return (
    <BrowserRouter>
      <div className="App">
        {pagesSwitch}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);

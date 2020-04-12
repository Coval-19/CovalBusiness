import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import LoadingPage from '../components/layout/LoadingPage'

const AuthIsReady = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)
  
  if (!isLoaded(auth)) {
    return <LoadingPage />;
  }

  return children
}

export default AuthIsReady

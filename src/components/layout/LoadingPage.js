import React from 'react'
import { Preloader } from 'react-materialize'

const LoadingPage = () => {
  return (
    <div className="center-screen">
      <Preloader
        active
        color="blue"
        flashing={false}
        size="big"
      />
    </div>
  )
}

export default LoadingPage

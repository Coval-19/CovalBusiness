import React from 'react'
import './Styles.css'

const makeStyledWrapper = (component, className) => {
  return (props) => (<component className={className} {...props} />)
}

export const Button = makeStyledWrapper(<button />, "btn waves-effect waves-light blue")

export default {
  button: "btn waves-effect waves-light blue",
  error: "error-message center red-text"
}

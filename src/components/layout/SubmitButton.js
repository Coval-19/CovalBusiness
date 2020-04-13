import React from 'react'
import Styles from '../style/Styles'

const SubmitButton = (props) => {
  const {formFieldsState} = props
  
  const isFormFilled = Object.values(formFieldsState).reduce((a, b) => a && b)

  const className = [
    Styles.button, 
    isFormFilled ? '' : 'disabled',
  ].join(' ')

return (<button className={className}>{props.children}</button>)
}

export default SubmitButton

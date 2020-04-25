import React from 'react'
import Styles from '../style/Styles'
import { isEquivalent } from '../../utils/ObjectsUtils'

const SubmitButton = (props) => {
  const {formFieldsState, initialFormFieldsState} = props
  
  const isFormFilled = Object.values(formFieldsState).reduce((a, b) => a && b)

  let shouldEnable = isFormFilled

  if (initialFormFieldsState) {
    shouldEnable = shouldEnable && !isEquivalent(formFieldsState, initialFormFieldsState)
  }

  console.log(formFieldsState, initialFormFieldsState)

  const className = [
    Styles.button, 
    shouldEnable ? '' : 'disabled',
  ].join(' ')

return (<button className={className}>{props.children}</button>)
}

export default SubmitButton

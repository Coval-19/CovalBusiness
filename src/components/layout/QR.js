import React from 'react'
import QRCode from 'qrcode.react' // Read more in: https://www.npmjs.com/package/qrcode.react

// pass a value prop as the QR's value
const QR = (props) => {
  props = {
    renderAs: "svg",
    size: 256,
    includeMargin: true,
    ...props,
  }

  return (<QRCode {...props} />)
}

export default QR

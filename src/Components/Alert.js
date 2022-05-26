import React from 'react'

export default function Alert(props) {
  return (
    <>
    <div style={{height:'40px',width:'99vw',margin:'auto'}}>
   { props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.message}
    </div>}
    </div>
    </>
  )
}

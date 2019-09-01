import React from 'react'
import {Link} from 'react-router-dom'

const BackNav = ({label, linkTo}) => {
  return (
    <Link className="back-nav" to={linkTo}>
      &#x3c; {label}
    </Link>
  )
}

export default BackNav

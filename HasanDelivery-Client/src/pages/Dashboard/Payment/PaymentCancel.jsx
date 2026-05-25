import React from 'react'
import { Link } from 'react-router'

export default function PaymentCancel() {
  return (
    <div>
      cancel 
      <Link to={'/dashboard/my-parcel'}><button className='btn'>try again</button></Link>
    </div>
  )
}

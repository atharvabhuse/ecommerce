import React from 'react'
import './OrderSuccess.css'
import CheckCircleicon from '@mui/icons-material/CheckCircle'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
    return (
        <div className='orderSuccess'>
            <CheckCircleicon />
            <p>Your order has been placed Successfully</p>
            <Link to='/order/me'>View Order</Link>
        </div>
    )
}

export default OrderSuccess

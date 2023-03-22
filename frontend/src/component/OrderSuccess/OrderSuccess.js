import React from 'react'
import './OrderSuccess.css'
import CheckCircleicon from '@mui/icons-material/CheckCircle'
import { Link } from 'react-router-dom'
import Header from '../layout/Header/Header'

const OrderSuccess = () => {
    return (
        <>
        <Header />
        <div className='orderSuccess'>
            <CheckCircleicon />
            <p>Your order has been placed Successfully</p>
            <span>Thank you!</span>
            {/* <Link to='/order/me'>View Order</Link> */}
        </div>
        </>
    )
}

export default OrderSuccess

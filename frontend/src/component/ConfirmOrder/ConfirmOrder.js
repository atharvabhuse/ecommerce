import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps'
import MetaData from '../layout/MetaData'
import './ConfirmOrder.css'

const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)

    const [shippingInformation, setShippingInformation] = useState(JSON.parse(shippingInfo)?JSON.parse(shippingInfo):shippingInfo)

    const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)

    const address = `${shippingInformation.address}, ${shippingInformation.city},  ${shippingInformation.state},  ${shippingInformation.pincode},  ${shippingInformation.country}`;

    const shippingCharges = 200;

    const tax = subtotal * 0.1

    const totalPrice = subtotal + tax + shippingCharges

    const navigate = useNavigate()

    const proceedToPayment = () => {
        const data={
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/process/payment')
    }

    return (
        <div>
            <MetaData title='Confirm Order' />
            <CheckoutSteps activeSteps={1} />
            <div className='confirmOrder_maincontainer'>
                <div className='confirmOrder_container'>
                    <div className='confirmOrder_shippingArea'>
                        <p>Shipping Info</p>
                        <div className='confirmOrder_shippingAreaBox'>
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInformation.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    <div className='confirmOrder_cartItems'>
                        <p>Your Cart Items:</p>
                        <div className='confirmOrder_cartItemsContainer'>
                            {cartItems && cartItems.map((item) => (
                                <div key={item.product} >
                                    <img src={item.image} alt='Product' />
                                    <Link to={`/product/${item.product}`} >
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X ₹{item.price} = {" "}
                                        <b>₹ {new Intl.NumberFormat('en-IN').format(item.price * item.quantity)}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='confirmOrder_productSummary'>
                        <p>Order Summary</p>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹ {new Intl.NumberFormat('en-IN').format(subtotal)}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹ {new Intl.NumberFormat('en-IN').format(shippingCharges)}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹ {new Intl.NumberFormat('en-IN').format(tax)}</span>
                            </div>
                        </div>

                        <div className='confirmOrder_summaryTotal'>
                            <p>Total:</p>
                            <span>₹ {new Intl.NumberFormat('en-IN').format(totalPrice)}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder

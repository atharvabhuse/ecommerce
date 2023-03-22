import React, { useEffect, useRef } from 'react'
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps'
import MetaData from '../layout/MetaData'
import './Payment.css'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { clearErrors, createOrder } from '../../actions/orderAction'
import Header from '../layout/Header/Header'

const Payment = () => {

    //4000 0027 6000 3184
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const payBtn = useRef(null)

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const navigate = useNavigate()

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const {error} = useSelector(state=>state.newOrder)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                },
            };
            const { data } = await axios.post('/api/v1/process/payment', paymentData, config)

            const client_secret = data.client_secret

            if (!stripe || !elements) {
                return
            }
            console.log('data',data)

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country,
                        },
                    },
                }
            })

            if (result.error) {
                payBtn.current.disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order))
                    navigate('/success')
                } else {
                    console.log('some issue while processing payment')
                }
            }
        }
        catch (error) {
            payBtn.current.disabled = false;
        }
    }

    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
        }
    }, [dispatch, error])
    return (
        <div>
            <Header />
            <MetaData title='Payment' />
            <CheckoutSteps activeSteps={2} />
            <div className='payment_container'>
                <form className='payment_form' onSubmit={(e) => submitHandler(e)}>
                    <p>Card Info</p>
                    {/* <p className='sample'> Test card Number- 4000 0027 6000 3184</p> */}
                    <div>
                        <CardNumberElement className='payment_input' />
                    </div>
                    <div>
                        <CardExpiryElement className='payment_input' />
                    </div>
                    <div>
                        <CardCvcElement className='payment_input' />
                    </div>

                    <input type='submit' value={`Pay ₹ ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='payment_formBtn' />
                </form>
            </div>
        </div>
    )
}

export default Payment

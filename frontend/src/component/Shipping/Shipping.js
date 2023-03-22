import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Shipping.css'
import { Country, State } from 'country-state-city'
import MetaData from '../layout/MetaData'
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'
import Header from '../layout/Header/Header'

const Shipping = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pincode, setPincode] = useState(shippingInfo.pincode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [phoneNoErr, setPhoneNoErr] = useState(false)

    const shippingSubmit = (e) => {
        e.preventDefault()
        if(phoneNo.length!==10){
            setPhoneNoErr(true)
            return;
        }
        dispatch(saveShippingInfo({address, city, state, country, pincode, phoneNo}))
        navigate('/order/confirm')
        
    }

    return (
        <div className='shipping_container'>
            <MetaData title='Shipping Details' />
            <Header />
            <CheckoutSteps activeSteps={0} />
            <div className='shipping_box'>
                <h2 className='shipping_heading'>Shipping Details</h2>
                <form
                    className='shipping_form'
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                >
                    <div>
                        <input
                            type='text'
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type='text'
                            placeholder='City'
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type='number'
                            placeholder='Pin code'
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>

                    <div className='shipping_col'>
                        <input
                            type='number'
                            placeholder='Phone Number'
                            required
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            size='10'
                        />
                        {phoneNoErr && <span className='err'>Please enter valid phone number</span>}
                    </div>

                    <div>
                        <select
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option value=''>Country</option>
                            {Country && Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}>
                            <option value=''>State</option>
                            {State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                        </select>
                    </div>
            <input
                type='submit'
                value='Continue'
                className={state ? 'shipping_button' : 'shipping_button_gray'}
                disabled={state ? false : true}
            />
        </form>
            </div >
        </div >
    )
}

export default Shipping

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, forgotpassword, loadUser } from '../../actions/userAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './ForgotPassword.css'
import Header from '../layout/Header/Header'
const ForgotPassword = () => {

    const dispatch = useDispatch()
    const { error, message, loading } = useSelector(state => state.forgotPassword)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('email', email)
        dispatch(forgotpassword(myForm))
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors())
        }

        if (message) {
            navigate("/account")
        }
    }, [message, dispatch, error])

    const linkHandler = () => {
        navigate('/login')
    }


    return (
        <>
            {loading ? <Loader /> :
                <>
                <Header />
                    <MetaData title='Change Password' />
                    <div className='forgotPassword_container'>
                        <div className='forgotPassword_box'>
                            <h2 className='forgotPassword_heading'>Forgot Password</h2>

                            <form className='forgotPassword_Form' encType='multipart/form-data' onSubmit={forgotPasswordSubmit}>
                                <div className='updateProfile_Email'>
                                    {/* <MailOutlineIcon /> */}
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <p style={{ color: 'red' }}>Forgot Password functionality is not available right now. You can contact with us using this support number- <span  style={{ color: 'green' }}>7588509301</span>. we will help you to login to your account after verification.</p>
                                <input
                                    type='submit'
                                    value='Send Email'
                                    className='forgotPassword_Btn'
                                // disabled={loading ? true : false}
                                />
                            </form>
                            <div onClick={linkHandler} className='link'>Go back to Login/Signup page</div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default ForgotPassword

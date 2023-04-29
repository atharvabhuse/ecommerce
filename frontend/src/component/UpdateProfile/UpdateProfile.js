import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, loadUser, update } from '../../actions/userAction.js'
import Loader from '../layout/Loader/Loader.js'
import MetaData from '../layout/MetaData.js'
import './UpdateProfile.css'
import Header from '../layout/Header/Header.js'

const UpdateProfile = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { error, isUpdated, loading } = useSelector(state => state.profile)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('name', name)
        myForm.set('email', email)
        dispatch(update(myForm))
        navigate('/account')
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }

        if (error) {
            dispatch(clearErrors())
        }

        if (isUpdated) {
            dispatch(loadUser())
            navigate("/account")

        }
    }, [user, isUpdated, dispatch, error, navigate])




    return (
        <>
        {loading ? <Loader /> : 
        <>
        <MetaData title='Update Profile' />
        <Header />
        <div className='updateProfile_container'>
            <div className='updateProfile_box'>
                <h2 className='updateProfile_heading'>Update Profile</h2>

                <form className='updateProfile_Form' encType='multipart/form-data' onSubmit={updateProfileSubmit}>
                    <div className='updateProfile_Name'>
                        {/* <FaceIcon /> */}
                        <input
                            type='text'
                            placeholder='Name'
                            required
                            name='name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className='updateProfile_Email'>
                        {/* <MailOutlineIcon /> */}
                        <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <p style={{ color: 'red' }}>{}</p>
                    <input
                        type='submit'
                        value='update Profile'
                        className='updateProfile_Btn'
                    // disabled={loading ? true : false}
                    />
                </form>

            </div>
        </div>
        </>}
        </>
    )
}

export default UpdateProfile

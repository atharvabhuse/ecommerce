import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, passwordupdate } from '../../actions/userAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './UpdatePassword.css'
const UpdatePassword = () => {

    const dispatch = useDispatch()
    const { error, isUpdated, loading } = useSelector(state => state.profile)
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const updatePasswordSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmPassword)
        dispatch(passwordupdate(myForm))
        navigate('/account')
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors())
        }

        if (isUpdated) {
            navigate("/account")
        }
    }, [isUpdated, dispatch, error, navigate])


  return (
    <>
        {loading ? <Loader /> : 
        <>
        <MetaData title='Change Password' />
        <div className='updatePassword_container'>
            <div className='updatePassword_box'>
                <h2 className='updatePassword_heading'>Update Password</h2>

                <form className='updatePassword_Form' encType='multipart/form-data' onSubmit={updatePasswordSubmit}>
                <div className='loginPassword'>
                    {/* <LockOpenIcon /> */}
                    <input 
                    type='password'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    />
                </div>
                <div className='loginPassword'>
                    {/* <LockOpenIcon /> */}
                    <input 
                    type='password'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    />
                </div>
                <div className='loginPassword'>
                    {/* <LockOpenIcon /> */}
                    <input 
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                </div>
                    <p style={{ color: 'red' }}>{}</p>
                    <input
                        type='submit'
                        value='Change Password'
                        className='updatePassword_Btn'
                    // disabled={loading ? true : false}
                    />
                </form>

            </div>
        </div>
        </>}
        </>
  )
}

export default UpdatePassword

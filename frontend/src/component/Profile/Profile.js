import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './Profile.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { stepClasses } from '@mui/material'
import Header from '../layout/Header/Header'
const Profile = () => {

  const { user, loading, isAuthenticated } = useSelector(state => state.user)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])
  return (
    <>
      {loading ? (<Loader />) : (
        <div>
          <MetaData title={`${user.name}'s Profile`} />
          <>
          <Header/>
          <div className='profile_container'>
            
            <div className='profile_left'>
              <AccountCircleIcon />
              <h1 className='profile_profileHeading'>My Profile</h1>
              <Link to='/me/update' className='profile_editButton'>Edit Profile</Link>
            </div>
            <div className='profile_right'>
              <h4>Full Name</h4>
              <p>{user.name}</p>
              <h4>Email</h4>
              <p>{user.email}</p>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
              <Link to='/orders' className='profile_orderButton'>My Orders</Link>
              <Link to='/password/update' className='profile_orderButton'>Change Password</Link>
            </div>
          </div>
          </>
        </div>)}
    </>
  )
}

export default Profile

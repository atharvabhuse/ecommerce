import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import './LoginSignup.css'
import {useDispatch, useSelector} from "react-redux"
import { clearErrors, login, register } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const LoginSignup = () => {

    const dispatch = useDispatch()
    const errMessage = useSelector(state=>state.user.error)

    const {error, loading, isAuthenticated} = useSelector(state => state.user)
    console.log(error)

    const loginTab  = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [tab, setTab] = useState('login')
    console.log('ref',registerTab,loginTab)


    // const switchTab = (e, tab) => {
    //     if(tab === 'login'){
    //         switcherTab.current.classList.add('shiftToNeutral')
    //         switcherTab.current.classList.remove('shiftToRight')

    //         registerTab.current.classList.remove('shiftToNeutralForm')
    //         loginTab.current.classList.remove('shiftToLeft')
    //     }
    //     if(tab === 'register'){
    //         switcherTab.current.classList.add('shiftToRight')
    //         switcherTab.current.classList.remove('shiftToNeutral')

    //         registerTab.current.classList.add('shiftToNeutralForm')
    //         loginTab.current.classList.add('shiftToLeft')
    //     }
    // }

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const {name, email, password} = user;

    const registerSubmit = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('name',name)
        myForm.set('email',email)
        myForm.set('password',password)
        console.log('form register')
        dispatch(register(myForm))
        navigate('/login')
    }

    const registerDataChange =(e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
            setErrorMessage(error)
            console.log('error',error)
        }

        if(isAuthenticated){
            navigate("/account")
        }else{
            navigate('/login')
        }
    },[isAuthenticated,dispatch,error,navigate])

    
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
        navigate('/login')       
    }
    console.log("form login", isAuthenticated,error)

  return (
    <>
    {loading ? <Loader /> : <div className='loginSignup_container'>
        <div className='loginSignup_box'>
            <div>
                <div className='loginSignup_toggle'>
                    <p className={tab==='login' ? 'selectedTab' : 'noneSelectedTab'} onClick={(e) => setTab('login')}>LOGIN</p>
                    <p className={tab==='login' ? 'noneSelectedTab' : 'selectedTab'} onClick={(e) => setTab('register')}>REGISTER</p>
                </div>
                {/* <button ref={switcherTab}></button> */}
            </div>

            {tab==='login'?(<form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                <div className='loginEmail'>
                    {/* <MailOutlineIcon /> */}
                    <input 
                    type='email'
                    placeholder='Email'
                    required
                    value={loginEmail}
                    onChange={(e) =>setLoginEmail(e.target.value)}
                    />
                </div>
                <div className='loginPassword'>
                    {/* <LockOpenIcon /> */}
                    <input 
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                    />
                </div>
                <Link to='/password/forgot' style={{color: 'black'}}>Forgot Password ?</Link>
                {isAuthenticated && loginTab.current!=null ? '' : <p style={{color: 'red'}}>{errorMessage}</p>}

                <div className='loginButton_box'>
                <input type='submit' value='Login' className='loginBtn' />
                </div>
            </form>
            )
            :
            (<form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                <div className='signupName'>
                    {/* <FaceIcon /> */}
                    <input 
                    type='text'
                    placeholder='Name'
                    required
                    name='name'
                    value={name}
                    onChange={registerDataChange}
                    />
                </div>
                <div className='signUpEmail'>
                    {/* <MailOutlineIcon /> */}
                    <input 
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={registerDataChange}
                    />
                </div>
                <div className='signUpPassword'>
                    {/* <LockOpenIcon /> */}
                    <input 
                    type='password'
                    placeholder='Password'
                    required
                    name='password'
                    value={password}
                    onChange={registerDataChange}
                    />
                </div>
                {isAuthenticated && registerTab.current ? '' : <p style={{color: 'red'}}>{errorMessage}</p>}
                <input 
                type='submit'
                value='Register'
                className='signUpBtn'
                // disabled={loading ? true : false}
                />
            </form>)}
        </div>

    </div>}
    </>
  )
}

export default LoginSignup

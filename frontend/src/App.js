import React, { useEffect } from 'react'
import Header from './component/layout/Header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WebFont from 'webfontloader'
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home'
import Loader from './component/layout/Loader/Loader'
import ProductDetails from './component/ProductDetails/ProductDetails'
import './App.css'
import AllProducts from './component/AllProducts/AllProducts'
import Search from './component/Search/Search'
import LoginSignup from './component/User/LoginSignup'
import store from './store'
import { loadUser } from './actions/userAction'
import { useSelector } from 'react-redux'
import UserOptions from './component/layout/Header/UserOptions'
import Profile from './component/Profile/Profile'
import UpdateProfile from './component/UpdateProfile/UpdateProfile'
import UpdatePassword from './component/UpdatePassword/UpdatePassword'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'

const App = () => {

  const {isAuthenticated,user} = useSelector(state=>state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/products/:keyword' element={<AllProducts />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/login' element={<LoginSignup />} />
        {isAuthenticated && <Route exact path='/account' element={<Profile />} />}
        {isAuthenticated && <Route exact path='/me/update' element={<UpdateProfile />} />}
        {isAuthenticated && <Route exact path='/password/update' element={<UpdatePassword />} />}
        <Route exact path='/password/forgot' element={<ForgotPassword />} />


      </Routes>
      <Footer />
    </Router>
  )
}

export default App


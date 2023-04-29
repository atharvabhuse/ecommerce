import React, { useEffect, useState } from 'react'
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
import Cart from './component/Cart/Cart'
import Shipping from './component/Shipping/Shipping'
import ConfirmOrder from './component/ConfirmOrder/ConfirmOrder'
import axios from 'axios'
import Payment from './component/Payment/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import OrderSuccess from './component/OrderSuccess/OrderSuccess'

const App = () => {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())

    getStripeApiKey()
  }, [])

  return (
    <div className='app-main'>
    <Elements stripe={loadStripe(stripeApiKey)}>
    <Router>
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
        <Route exact path='/cart' element={<Cart />} />
        {isAuthenticated && <Route exact path='/shipping' element={<Shipping />} />}
        {isAuthenticated && <Route exact path='/order/confirm' element={<ConfirmOrder />} />}
        {stripeApiKey && (
          <Route exact path='/process/payment' element={<Payment />} />
        )}
        {isAuthenticated && <Route exact path='/success' element={<OrderSuccess />} />}
      </Routes>
      <Footer />
    </Router>
    </Elements>
    </div>
  )
}

export default App


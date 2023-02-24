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


const App = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/products/:keyword' element={<AllProducts />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/login' element={<LoginSignup />} />
        
      </Routes>
      <Footer />
    </Router>
  )
}

export default App


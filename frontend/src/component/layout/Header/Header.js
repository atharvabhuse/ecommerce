import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from '../../../images/logo.jfif'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {

  const options = {
    logo:{logo},
    navColor1:"white",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link5Text: "Aboust",
    link1Url:"/",
    link2Url:"/products",
    link3Url:"/contact",
    link4Url:"/about",
    link1Color: "black",
    link1ColorHover:"green",
    link1Size:"2vmax",
    link1Margin: "2vmax",
  }
  return (
    // <div style={{zIndex: 5}}>
    //   <ReactNavbar {...options} />

    // </div>
    <>
    <div className='navbar'>
        <ul className='navbar-ul-1'>
          <li className='navbar-li'>APB Ecommerce</li>
          {/* <li><Toggle /></li> */}
        </ul>

        <ul className='navbar-ul-2'>
          <Link to='/'>Home</Link>
          <Link to='/products'>All Products</Link>
          <Link to='/search'>Search Product</Link>
          <Link to='/products'>Filter Product</Link>
          <Link to='/cart'>Cart</Link>
          <Link to='/account'>Account</Link>
          <Link to='/login'>Login/ Register</Link>
         </ul>
    </div>
    </>
  )
}

export default Header

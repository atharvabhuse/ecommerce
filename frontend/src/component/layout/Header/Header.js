import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from '../../../images/logo.jfif'

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
    <div>
      <ReactNavbar {...options}
      />
    </div>
  )
}

export default Header

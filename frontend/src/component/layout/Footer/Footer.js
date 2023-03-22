import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer_Container'>
      <div className='footer_Container1'>
        <b>APB</b>
        {/* <span className='footer_Container1_span'>Atharva</span><span className='footer_Container1_span'>Prashant</span><span className='footer_Container1_span'>Bhuse</span> */}
      </div>

      <div className='footer_Container2'>
        <span className='footer_Container2Header'>Shop by Category</span>
        <Link to='/products'>smartphone</Link>
        <Link to='/products'>Shoes</Link>
        <Link to='/products'>Perfumes</Link>
        <Link to='/products'>Men Clothing</Link>
        <Link to='/products'>Women Clothing</Link>
        <Link to='/products'>Camera</Link>
      </div>

      <div className='footer_Container2'>
        <span className='footer_Container2Header'>Pages</span>
        <Link to='/search'>Search Product</Link>
        <Link to='/products'>All Products</Link>
        <Link to='/products'>Filter Product</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/account'>Account</Link>
        <Link to='/login'>Login/ Register</Link>
      </div>

      <div className='footer_Container2'>
        <span className='footer_Container2Header'>Personal Links</span>
        <a href='https://www.linkedin.com/in/atharva-bhuse/'>LinkedIn</a>
        <a href='https://github.com/atharvabhuse'>GitHub</a>
        <a href='https://atharvabhuse.github.io/portfolio/'>Portfolio</a>
        <a href='https://atharvabhuse.hashnode.dev/'>Hashnode</a>
        <a href='https://leetcode.com/atharvabhuse1/'>Leetcode</a>
        <a href='https://www.hackerrank.com/atharvabhuse1'>HackerRank</a>
      </div>

      <div className='footer_Container2'>
        <span className='footer_Container2Header'>Contact</span>
        <span className='footer_Container2_span'>Email</span>
        <span className='footer_Container2SpanData'>atharvabhuse1@gmail.com</span>
        <span className='footer_Container2_span'>Address</span>
        <span className='footer_Container2SpanData'>Sanchar quarters, MTNL Road, Dadar west, Mumbai</span>
      </div>
    </div>
  )
}

export default Footer

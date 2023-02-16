import React from 'react'
import './Home.css'
import {CgScrollV} from 'react-icons/cg'
import Product from '../Product/Product'
import MetaData from '../layout/MetaData'

const Home = () => {
    let product={
        id: '1'
    }
  return (
    <>
    <MetaData title="Home" />
    <div className='home_container'>
      <p>Welcome to ecommerce</p>
      <h1>Find amazing products here</h1>
      <button className='home_button'>scroll<CgScrollV style={{marginLeft: '1vw', fontSize: '1rem'}} /></button>
    </div>

    <h2>Featured products</h2>
    <div className='home_product_container'>
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />

    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />

    </div>
    </>
  )
}

export default Home

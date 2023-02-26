import React, { useEffect } from 'react'
import './Home.css'
import {CgScrollV} from 'react-icons/cg'
import Product from '../Product/Product'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { Link } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()

  const {loading, error, products, productsCount} = useSelector(state => state.products)

  useEffect(()=>{
    dispatch(getProduct())
  }, [dispatch])

  return (
    <>
    {loading ? (
      <Loader />
    ) : (<>
    <MetaData title="ECOMMERCE" />
    <div className='home_container'>
      <p>Welcome to ecommerce</p>
      <Link to='/search'>search</Link>
      <Link to='/login'>Login</Link>
      <Link to='/account'>Account</Link>
      <h1>Find amazing products here</h1>
      <button className='home_button'>scroll<CgScrollV style={{marginLeft: '1vw', fontSize: '1rem'}} /></button>
    </div>

    <h2>Featured products</h2>
    <div className='home_product_container'>
      {
        products && products.map(data =>(
          <Product product={data} />
        ))
      }
    </div>
    </>)}
    </>
  )
}

export default Home

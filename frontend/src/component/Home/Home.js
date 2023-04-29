import React, { useEffect, useState } from 'react'
import './Home.css'
import { CgScrollV } from 'react-icons/cg'
import Product from '../Product/Product'
import MetaData from '../layout/MetaData'
import { getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../layout/Header/Header'
import AllProducts from '../AllProducts/AllProducts'

const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { loading, error, products, productsCount } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])

  const buyNowHandler = () => {
    navigate(`/products/samsung`)
  }

  const checkHandler = () => {
    navigate(`/products/nike`)
  }
  
  const grabHandler = () => {
    navigate(`/products/zara`)
  }

  const topDeal = products.filter((data)=>data.category=='footware')
  console.log('topDeal',products,products?.filter((data)=>data.category=='footware'))

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title="ECOMMERCE" />
          <Header />
          <div className='home_container'>
            <div className='home_featured1'>
              {/* <img className='home_image' src='https://htxt.co.za/wp-content/uploads/2023/02/S23-Cameras.png' /> */}
              {/* <img className='home_image' src='https://i.teknolojioku.com/2/1280/720/storage/files/images/2023/02/01/galaxy-s23-2fca-cover-WmsA_cover.jpg' /> */}
              {/* <img className='home_image' src='https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/02/samsung-galaxy-s23-s23-2943000.jpg?tf=828x' /> */}
              <div className='home_imageText1'>
                <span>Samsung Galaxy S23 |S23+</span>
                <button onClick={buyNowHandler} className='home_imageButton'>Buy Now</button>
                {/* Samsung Galaxy S23 series is available from ₹65,000 till March. Avail Now. */}
              </div>
            </div>
            <div className='home_featured2'>
              <div className='home_imageText2'>
                <span>New collection of Nike Air Jordan is available </span>
                <button onClick={checkHandler} className='home_imageButton'>Check it Now</button>
                {/* <img className='home_image' src='https://images.unsplash.com/photo-1588099768531-a72d4a198538?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' /> */}
                {/* <img className='home_image' src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' /> */}
              </div>
            </div>
            <div className='home_featured3'>
              <div className='home_imageText2'>
                <span>Upto 80% of on ZARA perfumes</span>
                <button onClick={grabHandler} className='home_imageButton'>Grab it Now</button>
                {/* <img className='home_image' src='https://images.unsplash.com/photo-1619959062935-ac914b8422f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' /> */}
                {/* <img className='home_image' src='https://images.pexels.com/photos/12717157/pexels-photo-12717157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' /> */}
              </div>
            </div>
          </div>

          <div className='home_content_premium'>
            <div className='home_grayspace_premium'></div>
            <div className='home_grayspace_premium_col'>
              <div className='home_topDeals_premium'>
                <h2 className='home_topDealsHeading_premium'>Top Deals of the Month</h2>
                {console.log('products', products)}
                <div className='home_product_container_premium'>
                  {
                    products && topDeal?.map(data => (
                      <Product product={data} />
                    ))
                  }
                </div>
              </div>
              {/* <div className='home_bankImage'>
                <img width='80%' src='https://assets.tatacliq.com/medias/sys_master/images/46050570534942.jpg' />
              </div> */}
            </div>
            <div className='home_grayspace_premium'></div>
          </div>

          <div className='home_bankImage'>
            <div className='home_grayspace_premium'></div>
            <img width='82%' src='https://assets.tatacliq.com/medias/sys_master/images/46050570534942.jpg' />
            <div className='home_grayspace_premium'></div>
          </div>

          <div className='home_content'>
            <div className='home_grayspace'></div>
            <div className='home_topDeals_premium'>
              <h2 className='home_topDealsHeading'>All Products</h2>
              {console.log('products', products)}
              <div className='home_product_container'>
                {
                  products && products.map(data => (
                    <Product product={data} />
                  ))
                }
              </div>
            </div>
            <div className='home_grayspace'></div>
          </div>

          <div className='home_filterButtonContainer'>
            <Link to='/products'><button className='home_filterButton'>Filter All Products here</button></Link>
          </div>

          {/* <Link to='/search'>search</Link>
          <Link to='/login'>Login</Link>
          <Link to='/account'>Account</Link>
          <Link to='/cart'>Cart</Link>
          <Link to='/products'>Products</Link> */}
        </div>
      )}
    </>
  )
}

export default Home

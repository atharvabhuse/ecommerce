import React from 'react'
import './Product.css'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import productImage from '../../images/logo.jfif'

const Product = ({product}) => {

    const options = {
        edit: false,
        color: 'lightgray',
        activeColor: '#fad000',
        size: window.innerWidth < 600 ? 15 : 20,
        value: product.ratings,
        isHalf: true
    }
    console.log(product)
  return (
    <div className='product_container'>
      <Link className='product_link' to={`/product/${product._id}`}>
        <img className='product_image' src={product.images[0]?product.images[0].url:''} alt='name' />
        <p className='product_name'>{product.name}</p>
        <p className='product_desc'>{product.description}</p>
        <p className='product_id'>Id- {product._id}</p>
        <span className='product_price'>₹ {new Intl.NumberFormat('en-IN').format(product.price)}</span>
        <div className='product_reviewContainer'>
            <ReactStars {...options} />
            <span className='product_review'>({product.numOfReviews} Reviews)</span>
        </div>
      </Link>
    </div>
  )
}

export default Product

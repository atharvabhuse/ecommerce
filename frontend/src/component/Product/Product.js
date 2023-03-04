import React from 'react'
import './Product.css'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import productImage from '../../images/logo.jfif'

const Product = ({product}) => {

    const options = {
        edit: false,
        color: 'lightgray',
        activeColor: 'green',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }
    console.log(product)
  return (
    <div className='product_container'>
      <Link className='product_link' to={`/product/${product._id}`}>
        <img className='product_image' src={product.images[0]?product.images[0].url:''} alt='name' />
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>Id- {product._id}</p>
        <div>
            <ReactStars {...options} />
            <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>₹ {new Intl.NumberFormat('en-IN').format(product.price)}</span>
      </Link>
    </div>
  )
}

export default Product

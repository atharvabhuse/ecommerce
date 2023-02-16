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
        value: 3.5,
        isHalf: true
    }
  return (
    <div className='product_container'>
      <Link to={product.id}>
        <img src={productImage} alt='name' />
        <p>product name</p>
        <div>
            <ReactStars {...options} />
            <span>10 reviews</span>
        </div>
        <span>price</span>
      </Link>
    </div>
  )
}

export default Product

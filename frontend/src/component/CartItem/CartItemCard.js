import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className='cartItemCard_container'>
      <img src={item.image} alt='cart' />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span className='cartItemCard_id'>Id- {item.product}</span>
        <span>Quantity- {item.quantity}</span>
        <span>Price: ₹ {new Intl.NumberFormat('en-IN').format(item.price)}</span>
        <p className='cartItemCard_button'>
        <Link to={`/product/${item.product}`}><p className='add'>Add</p></Link>
          <p> | </p>
          <p onClick={() => deleteCartItems(item.product)}>Remove</p>
        </p>
      </div>
    </div>
  )
}

export default CartItemCard

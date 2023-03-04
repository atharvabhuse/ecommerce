import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'
const CartItemCard = ({item, deleteCartItems}) => {
  return (
    <div className='cartItemCard_container'>
      <img src={item.image} alt='cart' />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>Price: ₹ {new Intl.NumberFormat('en-IN').format(item.price)}</span>
        <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard

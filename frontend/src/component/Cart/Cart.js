import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import CartItemCard from '../CartItem/CartItemCard'
import './Cart.css'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import Header from '../layout/Header/Header'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { cartItems } = useSelector(state => state.cart)

    const incHandler = (id, quantity, stock) => {
        let newQty = quantity + 1
        if (stock <= quantity) {
            return
        }
        console.log(id, quantity)
        dispatch(addItemsToCart(id, newQty))
    }

    const decHandler = (id, quantity) => {
        let newQty = quantity - 1
        if (quantity <= 1) {
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }
    
    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping")
    }


    return (
        <>
            <Header />
            {cartItems.length === 0 ?
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <p>No Product in your Cart</p>
                    <Link to='/products'>View Products</Link>
                </div>
                :
                (
                <div className='cart_container'>
                    <img className='img' src='https://assets.tatacliq.com/medias/sys_master/images/46050570534942.jpg' />
                    <p className='cart_heading'>Shopping Cart</p>
                    <div className='cart_header'>
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>

                    {cartItems && cartItems.map((data,index) => (
                        <div className= {index===cartItems.length-1 ? 'cart_content_last' : 'cart_content'} key={data.product}>
                            <CartItemCard item={data} deleteCartItems={deleteCartItems}/>
                            <div className='cart_inputContainer'>
                                <button onClick={() => decHandler(data.product, data.quantity)}>-</button>
                                <input type='number' value={data.quantity} readOnly />
                                <button onClick={() => incHandler(data.product, data.quantity, data.stock)}>+</button>
                            </div>
                            <p className='cart_subtotal'>₹ {new Intl.NumberFormat('en-IN').format(data.price * data.quantity)}</p>
                        </div>))}
                    <div className='cart_grossTotal'>
                        <div></div>
                        <div className='cart_grossTotalBox'>
                            <p>Gross Total</p>
                            <p>₹ {new Intl.NumberFormat('en-IN').format(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))}</p>
                        </div>
                        <div></div>
                        <div className='cart_checkoutButton'>
                            <button onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
                )}
        </>
    )
}

export default Cart

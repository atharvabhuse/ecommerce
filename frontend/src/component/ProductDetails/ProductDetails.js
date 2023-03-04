import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from '../ReviewCard/ReviewCard'
import { Divider } from '@mui/material'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'



const ProductDetails = () => {

    const { id } = useParams()

    const dispatch = useDispatch()

    const { product, loading, error } = useSelector((state) => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])


    const options = {
        edit: false,
        color: 'lightgray',
        activeColor: 'green',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings?product.ratings:0,
        isHalf: true
    }

    const [quantity, setQuantity] = useState(1)

    const decHandler = () => {
        if(quantity<=0){
            return
        }else{
            setQuantity(quantity-1)
        }
    }

    const incHandler = () => {
        console.log(product.stock, quantity)
        if(product.stock<=quantity){
            return
        }else{
            setQuantity(quantity+1)
        }
    }
    console.log(product)

    const addToCartHandler = () => {
        dispatch(addItemsToCart(product._id,quantity))
    }

    console.log(product)
    return (
        <>
            {loading ? <Loader /> :
                (<div>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className='productDetails_container'>
                        <div className='productDetails_imageContainer'>
                            <Carousel>
                                {
                                    product.images && product.images.map((item, i) => (
                                        <img className='productDetails_image' key={i} src={item.url} alt={`${i} Slide`} />
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div className='productDetails_content'>
                            <div>
                                <h2>{product.name}</h2>
                                <p>product ID- {product._id}</p>
                            </div>

                            <div className='productDetails_reviewsBlock'>
                                <ReactStars {...options} />
                                <span>({product.reviews?product.reviews.length:0} Reviews)</span>
                            </div>

                            <div>
                                <h1>₹ {new Intl.NumberFormat('en-IN').format(product.price)}</h1>
                                Status- <b className={product.stock < 1 ? 'productDetails_redColor' : 'productDetails_greenColor'}>{product.stock < 1 ? 'Out of Stock' : 'Available'}</b>
                            </div>
                            stock available- <b className={product.stock-quantity < 1 ? 'productDetails_redColor' : 'productDetails_greenColor'}>{product.stock-quantity}</b>
                            <div>

                            </div>

                            <div className='productDetails_incdecBlock'>
                                <button className='productDetails_incdec' onClick={decHandler}>-</button>
                                <input readOnly className='productDetails_input' value={quantity} type='number' />
                                <button className='productDetails_incdec' onClick={incHandler}>+</button>
                            </div>

                            <div className='productDetails_addToCartBlock'>
                                <button onClick={addToCartHandler} className='productDetails_addToCart'>Add to cart</button>
                            </div>



                            <div>
                                Description- <p>{product.description}</p>
                            </div>

                            <button className='productDetails_submit'>Submit Review</button>
                        </div>
                    </div>

                    <div className='productDetails_reviewsContainer'>
                        <h3>Reviews</h3>
                        {product.reviews && product.reviews[0] ? (
                            <div className='productDetails_reviews'>
                                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                            </div>
                        ) : (
                            <p>No reviews Yet</p>
                        )}
                    </div>
                </div>)}
        </>
    )
}

export default ProductDetails

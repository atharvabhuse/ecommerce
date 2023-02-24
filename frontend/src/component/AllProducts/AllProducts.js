import React, { useEffect, useState } from 'react'
import './AllProducts.css'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { getProduct } from '../../actions/productAction'
import Product from '../Product/Product'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { Slider } from '@mui/material'
import MetaData from '../layout/MetaData'

const categories = [
    'laptop',
    'footware',
    'bottom',
    'tops',
    'attire',
    'camera',
    'smartphone'
]

const AllProducts = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 200000])
    const [category, setCategory] = useState('')
    const [ratings, setRatings] = useState(0)

    const CurrentPageNumberHandler = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const { keyword } = useParams()

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings])

    console.log(products, keyword)
    return (
        <>
            {loading ? (<Loader />) : (
                <div>
                    <MetaData title='PRODUCTS -- ECOMMERCE' />
                    <h2>Products</h2>
                    <div className='allProducts_content'>

                        <div className='allProducts_filters'>
                            <div className='allProducts_priceFilter'>
                                <p>Price</p>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay='auto'
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={200000}
                                />
                            </div>

                            <div className='allProducts_categoryFilter'>
                                <p>Categories</p>

                                <ul className='allProducts_categoryFilter_ul'>
                                    {
                                        categories.map((category) => (
                                            <li className='allProducts_categoryFilter_li'
                                                key={category}
                                                onClick={() => setCategory(category)}>
                                                {category}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className='allProducts_ratingsFilter'>
                                <p>Ratings above</p>
                                <fieldset>
                                <Slider
                                value={ratings}
                                onChange={(e, newRating)=>setRatings(newRating)}
                                aria-labelledby='continous-slider'
                                valueLabelDisplay='auto'
                                min={0}
                                max={5}
                                />
                                </fieldset>
                            </div>
                        </div>


                        <div className='allProducts_productsBox'>
                            {products && products.map(data => (
                                <Product key={data._id} product={data} />
                            ))}
                        </div>
                    </div>



                    <div className='allProducts_pagination'>
                        <Pagination activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={CurrentPageNumberHandler}
                            nextPageText='Next'
                            prevPageText='Prev'
                            firstPageText='1st'
                            lastPageText='last'
                            itemClass='page_item'
                            linkClass='page_link'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                        />
                    </div>
                    <div>

                    </div>
                </div>)}
        </>
    )
}

export default AllProducts

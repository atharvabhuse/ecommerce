import React from 'react'
import './ReviewCard.css'
import ReactStars from 'react-rating-stars-component'

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: 'lightgray',
        activeColor: 'green',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
    }

    return (
        <div className='reviewCard_container'>
            <img className='reviewCard_image' src='https://cdn-icons-png.flaticon.com/512/6522/6522516.png' />
            <div className='reviewCard_content'>
                <p>{review.name}</p>
                <ReactStars {...options} />
                <span>{review.comment}</span>
            </div>
        </div>
    )
}

export default ReviewCard

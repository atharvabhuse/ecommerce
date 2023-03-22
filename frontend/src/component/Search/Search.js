import React, { useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'

const Search = () => {

  const navigate = useNavigate()

  const [keyword, setKeyword] = useState()

    const searchHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate('/products')
        }

    }
  return (
    <div>
      <MetaData title='Search a product -- ECOMMERCE' />
      <Header />
      <form className='search_form' onSubmit={searchHandler}>
        <input className='search_input' type='text' placeholder='Search a product' onChange={(e) => setKeyword(e.target.value)} />
        <input className='search_button' type='submit' value='Search' />
      </form>
    </div>
  )
}

export default Search

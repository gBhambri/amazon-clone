import React from 'react'
import './Product.css'
import {useStateValue} from '../StateProviders/StateProvider'


function Product({id,title,image,price,rating}) {
    const [{},dispatch]=useStateValue('')
    const addtoBasket=()=>{
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id,title,image,price,rating
            }
        })
    }
    return (
        <div className='product'>
            <div className='product__info'>
                <p>{title}</p>
                <p className='product__price'>
                    <small>INR </small>
                    <strong>{price}</strong>
                </p>
                <div className='product__rating'>
                {Array(rating)
                .fill()
                .map((_, i) => (
                <p key={i} role='img'>🌟</p>
                ))}
                </div>
            </div>
            <img src={image} alt=''></img>
            <button onClick={addtoBasket}>Add to basket</button>
        </div>
    )
}

export default Product

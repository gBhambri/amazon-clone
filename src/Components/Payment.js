import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from "../StateProviders/StateProvider";
import CheckoutProducts from './CheckoutProducts';
import {Link} from 'react-router-dom'
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from "../StateProviders/reducer";
import axios from '../Utils/axios'
import { useHistory } from 'react-router-dom';
import {db} from '../Utils/firebase'

function Payment() {
    const history=useHistory()
    const stripe=useStripe()
    const elements=useElements()
    const [{ basket,user },dispatch] = useStateValue();
    const [error,setError]=useState(null)
    const [disabled,setDisabled]=useState(true)
    const [processing,setProcessing]=useState('')
    const [succeeded,setSucceeded]=useState(false)
    const [clientSecret,setClientSecret]=useState(true)
    useEffect(()=>{
        const getclientSecret=async()=>{
            const response=await axios({
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getclientSecret()
    },[basket])
    const handleSubmit= async (event)=>{
        event.preventDefault();
        setProcessing(true)

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        })
        .then(({paymentIntent})=>{
            db.collection('users').doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const handleChange=(event)=>{
        setDisabled(event.empty)
        setError(event.error?event.error.message:'')
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout(
                    <Link to='/checkout'>{basket?.length} items</Link>
                    )</h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123,React lane</p>
                        <p>Los Angeles,CA</p>
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item=>(
                            <CheckoutProducts
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            ></CheckoutProducts>
                        ))}
                    </div>
                </div>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                       <form onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange}></CardElement>
                           <div className='payment__priceContainer'>
                            <CurrencyFormat
                                    renderText={(value) => (
                                        <p>
                                        Subtotal ({basket.length} items): <strong>{value}</strong>
                                        </p>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"INR "}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing?<p>Processing</p>:'Buy Now'}</span>
                                </button>
                           </div>
                            {error && <div>{error}</div>}
                       </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment

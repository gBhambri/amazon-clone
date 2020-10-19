import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from "../StateProviders/StateProvider";
import CheckoutProduct from "../Components/CheckoutProducts";

function Checkout() {
    const [{user, basket}] = useStateValue();
    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg' alt='' className='checkout__ad'>
                </img>
                <div>
                     <h3 className='checkout__head'>Hello, {user?.email}</h3>
                    <h2 className='checkout__title'>Your shopping basket</h2>
                    <h1 className='empty__cart'>{basket.length==0?'Your cart is empty':''}</h1>
                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className='checkout__right'>
                <Subtotal></Subtotal>
            </div>
        </div>
    )
}

export default Checkout

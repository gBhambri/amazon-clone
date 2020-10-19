import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import {useStateValue} from '../StateProviders/StateProvider'
import { auth } from '../Utils/firebase';
const Header=()=> {
    const [{basket,user}]=useStateValue('')
    const handleAuthentication=()=>{
        if(user)
        {
            auth.signOut()
        }
    }
    return (
        <div className='header'>
            <Link to='/'>
                <img alt='logo' className='header__logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'></img>
            </Link>
           
           <div className='header__search'>
               <input className='header__searchInput' type='text'>
               </input>
               <SearchIcon className='header__searchIcon'></SearchIcon>
           </div>
           <div className='header__nav'>
              <Link to={!user && '/login'}>
                <div className='header__option' onClick={handleAuthentication}>
                    <span className='header__right1'>Hello{user?' Gautam':' Guest'}</span>
                     <span className='header__right2'>{user?'Sign Out':'Sign In'}</span>
                </div>
              </Link>
                <Link to='/orders'>
                    <div className='header__option'>
                        <span className='header__right1'>Return </span>
                        <span className='header__right2'>& Orders</span>
                    </div>
                </Link>
                
                <div className='header__option'>
                    <span className='header__right1'>Your</span>
                    <span className='header__right2'>Prime</span>
                </div>
           </div>
           <Link to='/checkout'>
            <div className='header__basket'>
                    <ShoppingBasketIcon></ShoppingBasketIcon>
                    <span className='header__right2 header__count'>{basket?.length}</span>
            </div>
           </Link>
           
        </div>
    )
}

export default Header

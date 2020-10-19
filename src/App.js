import React,{useEffect} from 'react';
import './App.css';
import Header from './Components/Header'
import Home from './Components/Home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Checkout from './Components/Checkout'
import Login from './Components/Login'
import {useStateValue} from './StateProviders/StateProvider'
import {auth} from './Utils/firebase'
import Payment from './Components/Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Components/Orders';
const promise=loadStripe('Test Key');

const App=()=>{
  const [{user},dispatch]=useStateValue('')
  useEffect(()=>{
      auth.onAuthStateChanged(authUser=>{
        if(authUser)
        {
          dispatch({
            type:'SET_USER',
            user:authUser
          })
        }
        else
        {
          dispatch({
            type:'SET_USER',
            user:null
          })
        }
      })
  },[])
  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path='/orders'>
          <Header></Header>
          <Orders></Orders>
          </Route>
        <Route path='/login'>
           <Login></Login>
          </Route>
          <Route path='/checkout'>
            <Header></Header>
            <Checkout></Checkout>
          </Route>
          <Route path='/payment'>
            <Header></Header>
            <Elements stripe={promise}>
                <Payment></Payment>
            </Elements>
          </Route>
          
          <Route path='/'>
            <Header></Header>
            <Home></Home>
          </Route>
          
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;

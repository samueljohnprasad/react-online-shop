import React from 'react';
import {Route,Switch} from  'react-router-dom'
import './App.css';


import HomePage from './pages/hompage/homepage'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.compoenent'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {auth } from './firebase/firebase.utils'



class App extends React.Component{

  constructor (){
    super()
    this.state={
      currentUser:null
    }
  }
  unsubscribeFromAuth=null;

  componentDidMount(){
    this.unsubscribeFromAuth=auth.onAuthStateChanged(user=>{   //gives us back a function
      this.setState({currentUser:user});
      console.log(user);
    })
   
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
  return (
   <div> 
      <Header/>
      <Switch>
     <Route exact path='/' component={HomePage}/>
     <Route path='/shop' component ={ShopPage} />
     <Route path='/signin' component ={SignInAndSignUpPage} />
     </Switch>
    
   </div>
  );
}
}

export default App;

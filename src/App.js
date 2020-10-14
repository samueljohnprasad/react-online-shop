import React from 'react';
import {Route,Switch} from  'react-router-dom'
import './App.css';


import HomePage from './pages/hompage/homepage'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.compoenent'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import {auth ,createUserProfileDocument } from './firebase/firebase.utils'



class App extends React.Component{

  constructor (){
    super()
    this.state={
      currentUser:null
    }
  }
  unsubscribeFromAuth=null;




  componentDidMount(){
    this.unsubscribeFromAuth=auth.onAuthStateChanged( async userAuth=>{   //gives us back a function
     
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          //console.log(snapShot.data())
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          })
         // console.log(this.state)
        })

      }
        this.setState({currentUser:userAuth});  

      })
   
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
  return (
   <div> 
      <Header currentUser={this.state.currentUser}/>
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

import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config={
    apiKey: "AIzaSyBM1sl4G7gqtSgrGK6PzWMQuivsf1ieMeA",
    authDomain: "crwn-db-2d567.firebaseapp.com",
    databaseURL: "https://crwn-db-2d567.firebaseio.com",
    projectId: "crwn-db-2d567",
    storageBucket: "crwn-db-2d567.appspot.com",
    messagingSenderId: "680803946981",
    appId: "1:680803946981:web:b4f5219686794a67f2df0c",
    measurementId: "G-8496BNRWT5"
  };

  export const createUserProfileDocument= async (userAuth,aditionalData) => {
    if(!userAuth)return;

   const userRef=firestore.doc(`user/${userAuth.uid}`)

    const snapShot= await userRef.get();

   if(!snapShot.exists){
     const {displayName,email}=userAuth;
     const createdAt=new Date();

 
   try{
     await userRef.set({
       displayName,
       email,
       createdAt,
       ...aditionalData

     })
   } catch(error){
     console.log('error creating user', error.message)

   } 

  }

  return userRef

  };

  firebase.initializeApp(config);

  export const auth= firebase.auth();
  export const firestore=firebase.firestore();

  const provider =new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle=()=>  auth.signInWithPopup(provider)
  export default firebase;
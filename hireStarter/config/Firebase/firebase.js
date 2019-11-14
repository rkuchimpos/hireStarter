import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Firebase = {
  // auth
  loginWithGoogle: () => {
    console.log('here')
    //var provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().singInWithCredential('google.com')
  },
  setPersistence: () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  },
  getFacebookCredential: token => {
      console.log('broken')
    return firebase.auth.FacebookAuthProvider.credential(token)
  },
  loginWithFacebook: credential => {
    //var provider = new firebase.auth.FacebookAuthProvider()
    return firebase.auth().signInWithCredential(credential)
  },
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email)
  },
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  }
}

export default Firebase
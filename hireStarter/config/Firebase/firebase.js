import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Universal commands: only use if needed for ALL modules
const Firebase = {
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },
  retrieveData: uid => {
    return firebase
			.firestore()
			.collection('users')
			.doc(`${uid}`)
			.get()
  }
}

export default Firebase
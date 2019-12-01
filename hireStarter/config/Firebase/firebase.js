import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Universal commands: only use if needed for ALL modules
const Firebase = {
  // Nothing yet
}

export default Firebase
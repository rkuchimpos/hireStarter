import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const SignUpAPI = {
  /**
   * Create a new user document in Firestore based on given user data
   * 
   * @param {Object} userData A JSON object containing all user profile data.
   */
	createNewUser: userData => {
    firebase.firestore().collection('users').doc(`${userData.uid}`).set(userData)
    .then(function() {
      console.log("Document successfully created!")
    }).catch(function(error) {
      console.log("Error creating document:", error);
    });
  },
  /**
   * Update an existing user document in Firestore based on given user data
   * 
   * @param {Object} userData A JSON object containing all user profile data.
   */
  updateUserData: userData => {
    firebase.firestore().collection('users').doc(`${userData.uid}`).update(userData)
    .then(function() {
      console.log("Document successfully updated!")
    }).catch(function(error) {
      console.log("Error updating document:", error);
    });
  },
  updateArray: (uid, field, value) => {
    doc = firebase.firestore().collection('users').doc(`${uid}`)
    array = firebase.firestore.FieldValue
    doc.update({
      [field]: array.arrayUnion(value)
    })
  },
  getUserData: async uid => {
    doc = await firebase.firestore().collection('users').doc(`${uid}`).get()
    return doc.data()
  },
  downloadImage: async () => {
		storage = firebase.storage().ref()
		return await storage.child('testAssests/baboon_candid.jpeg').getDownloadURL() 
	},
	submitRef: async user => {
		collection = firebase.firestore().collection('users')
		ref = await collection.doc('WBPTWR00CnhKTKBzBXVUGBtyVOz1')
		array = firebase.firestore.FieldValue
		return await collection.doc(`${user}`).update({
			connections: array.arrayUnion(ref)
		})
	},
}

export default SignUpAPI
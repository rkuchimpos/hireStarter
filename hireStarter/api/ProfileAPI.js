import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const SignUpAPI = {
  /**
   * Create a new user document in Firestore based on given user data.
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
   * Update an existing user document in Firestore based on given user data.
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
  /**
   * Retrieve existing data from Firestore document.
   * 
   * @param {string} uid Unique Identifier of User.
   * @return {Object} A JSON object of user data.
   */
  getUserData: async uid => {
    doc = await firebase.firestore().collection('users').doc(`${uid}`).get()
    return doc.data()
  },
  /**
   * Uploads image to Firebase Storage.
   * 
   * @param {string} uid Unique Identifier of User.
   * @param {Number} num Index of images.
   * @param {string} img URI of selected image.
   * 
   * @return {string} A download url of image in Firebase Storage.
   */
  uploadImage: async (uid, num, img) => {
    ref = firebase.storage().ref().child('users/' + uid + '/image' + num + '.jpg')
    response = await fetch(img)
    blob = await response.blob()
    await ref.put(blob)
    return await ref.getDownloadURL()
  },
  // TEST FUNCTIONS
  downloadImage: async () => {
		storage = firebase.storage().ref()
		return await storage.child('testAssests/baboon_candid.jpeg').getDownloadURL() 
  },
  updateArray: (uid, field, value) => {
    doc = firebase.firestore().collection('users').doc(`${uid}`)
    array = firebase.firestore.FieldValue
    doc.update({
      [field]: array.arrayUnion(value)
    })
  },
	submitRef: async user => {
		collection = firebase.firestore().collection('users')
		ref = await collection.doc('WBPTWR00CnhKTKBzBXVUGBtyVOz1')
		array = firebase.firestore.FieldValue
		return await collection.doc(`${user}`).update({
			connections: array.arrayUnion(ref)
		})
	}
}

export default SignUpAPI
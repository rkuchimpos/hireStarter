import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { googleConfig, facebookConfig } from '../ExternalAuth/authConfig'

function setPersistence () {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}

const FirebaseAuth = {
	loginWithGoogle: async () => {
		try {
			const {
				type,
				idToken,
				accessToken,
				user
			} = await Google.logInAsync(googleConfig);
			if (type === "success") {
			//   this.setState({
			//     signedIn: true,
			//     name: user.name,
			//   });
				// console.log("FOO")
				// console.log(result.user);
				await setPersistence() // Set persistent auth state
				const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
				console.log("success")
				return await firebase.auth().signInWithCredential(credential)
			} else {
				console.log("cancelled");
			}
		} catch (e) {
			console.log("error", e);
		}
	return firebase.auth().signInWithCredential(credential)
},
loginWithFacebook: async () => {
	try {
		const {
			type,
			token,
			expires,
			permissions,
			declinedPermissions,
		} = await Facebook.logInWithReadPermissionsAsync(facebookConfig.appId, facebookConfig.options);
		if (type === 'success') {
			// Get the user's name using Facebook's Graph API
			// this.setState({
			//   signedIn: true
			// });
			setPersistence() // Set persistent auth state
			const credential = firebase.auth.FacebookAuthProvider.credential(token)
			console.log(credential)
			console.log("Success");
			return await firebase.auth().signInWithCredential(credential)
			//console.log(facebookProfileData.user);
			//   var userdata = {
			//     uid: facebookProfileData.user.uid, 
			//     name: facebookProfileData.user.displayName
			//   }
			//   this.props.firebase.createNewUser(userdata)
			//   const data = await this.props.firebase.retrieveData(userdata.uid)
			//   console.log(data.data())
			} else {
				console.log("Cancelled");
				// type === 'cancel'
			}
		} catch ({ message }) {
			console.log('Failure')
			console.log(message);
		}
	},
	//   loginWithEmail: (email, password) => {
	//     return firebase.auth().signInWithEmailAndPassword(email, password)
	//   },
	//   signupWithEmail: (email, password) => {
	//     return firebase.auth().createUserWithEmailAndPassword(email, password)
	//   },
	signOut: () => {
		return firebase.auth().signOut()
	},
	checkUserAuth: user => {
		return firebase.auth().onAuthStateChanged(user)
	},
	passwordReset: email => {
		return firebase.auth().sendPasswordResetEmail(email)
	}
}

export default FirebaseAuth
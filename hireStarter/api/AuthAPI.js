import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { googleConfig, facebookConfig } from '../config/ExternalAuth/authConfig'

/**
 * Helper function for auth functions - 
 * used to set the persistence to LOCAL.
 *
 */
function setPersistence() {
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
}

const AuthAPI = {
	/**
	 * Log in using Google provider.
	 *
	 * @return {Object} JSON object containing user info.
	 */
	loginWithGoogle: async () => {
		try {
			const {
				type,
				idToken,
				accessToken,
				user
			} = await Google.logInAsync(googleConfig);
			if (type === "success") {
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

	/**
	 * Log in using Facebook provider.
	 *
	 * @return {Object} JSON object containing user info.
	 */
	loginWithFacebook: async () => {
		try {
			const {
				type,
				token
			} = await Facebook.logInWithReadPermissionsAsync(facebookConfig.appId, facebookConfig.options);
			if (type === 'success') {
				setPersistence() // Set persistent auth state
				const credential = firebase.auth.FacebookAuthProvider.credential(token)
				//console.log(credential)
				console.log("Success");
				return await firebase.auth().signInWithCredential(credential)
			} else {
				console.log("Cancelled");
				// type === 'cancel'
			}
		} catch ({ message }) {
			console.log('Failure')
			console.log(message);
		}
	},

	// UNUSED FUNCTIONS
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

export default AuthAPI
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ImageBackground
} from "react-native";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { withFirebaseHOC } from '../config/Firebase'

async function login() {
	console.log('connecting to Facebook')
	try {
		const {
			type,
			token,
			expires,
			permissions,
			declinedPermissions,
		} = await Facebook.logInWithReadPermissionsAsync('2420347548233306', {
			permissions: ['public_profile'],
		});
		if (type === 'success') {
			// Get the user's name using Facebook's Graph API
			// this.setState({
			//   signedIn: true
			// });
			await this.props.firebase.setPersistence() // Set persistent auth state
			const credential = this.props.firebase.getFacebookCredential(token)
			console.log(credential)
			const facebookProfileData = await this.props.firebase.loginWithFacebook(credential)
			this.props.navigation.navigate('Home')
			//console.log(facebookProfileData.user);
			var userdata = {
				uid: facebookProfileData.user.uid, 
				name: facebookProfileData.user.displayName
			}
			this.props.firebase.createNewUser(userdata)
			const data = await this.props.firebase.retrieveData(userdata.uid)
			console.log(data.data())
			console.log("Success");
		} else {
			console.log("Cancelled");
			// type === 'cancel'
		}
	} catch ({ message }) {
		console.log('Failure')
		console.log(message);
	}
}

// const ANDROID_CLIENT_ID = "1039741042714-v9nc8aj7ufbrrncknr0eodml7mdagat8.apps.googleusercontent.com";
// class LogIn extends React.Component {
// 	static login = async () => {
// 		try {
// 			const {
// 				type,
// 				token,
// 				expires,
// 				permissions,
// 				declinedPermissions,
// 			} = await Facebook.logInWithReadPermissionsAsync('2420347548233306', {
// 				permissions: ['public_profile'],
// 			});
// 			if (type === 'success') {
// 				// Get the user's name using Facebook's Graph API
// 				// this.setState({
// 				//   signedIn: true
// 				// });
// 				await this.props.firebase.setPersistence() // Set persistent auth state
// 				const credential = this.props.firebase.getFacebookCredential(token)
// 				console.log(credential)
// 				const facebookProfileData = await this.props.firebase.loginWithFacebook(credential)
// 				this.props.navigation.navigate('Home')
// 				//console.log(facebookProfileData.user);
// 				var userdata = {
// 					uid: facebookProfileData.user.uid, 
// 					name: facebookProfileData.user.displayName
// 				}
// 				this.props.firebase.createNewUser(userdata)
// 				const data = await this.props.firebase.retrieveData(userdata.uid)
// 				console.log(data.data())
// 				console.log("Success");
// 			} else {
// 				console.log("Cancelled");
// 				// type === 'cancel'
// 			}
// 		} catch ({ message }) {
// 			console.log('Failure')
// 			console.log(message);
// 		}
// 	}
    
//   signIn = async () => {
//     try {
//         const result = await Google.logInAsync({
//         androidClientId: ANDROID_CLIENT_ID,
//         //iosClientId: YOUR_CLIENT_ID_HERE,
//         scopes: ["profile", "email"]
//         });
//         if (result.type === "success") {
//         this.setState({
//             signedIn: true,
//             name: result.user.name,
//         });
//         // console.log("FOO")
//         // console.log(result.user);
//         await this.props.firebase.setPersistence() // Set persistent auth state
//         console.log(result)
//         const credential = this.props.firebase.getGoogleCredential(result.idToken, result.accessToken)
//         const googleProfileData = await this.props.firebase.loginWithGoogle(credential)
//         this.props.navigation.navigate('Home')
//         console.log(googleProfileData)
//         } else {
//         console.log("cancelled");
//         }
//     } catch (e) {
//         console.log("error", e);
//     }
//   }
// }

// export default withFirebaseHOC(login)
export default login
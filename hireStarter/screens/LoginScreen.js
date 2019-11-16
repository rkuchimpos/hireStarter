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

const ANDROID_CLIENT_ID = "1039741042714-v9nc8aj7ufbrrncknr0eodml7mdagat8.apps.googleusercontent.com";

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Login"
    };
  };

  state = {
    modalVisible: false,
    signedIn: false,
    name: ""
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  googleLogin = async () => {
    try {
      console.log('working')
      const response = await this.props.firebase.loginWithGoogle()

      if (response.user) {
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      //actions.setFieldError('general', error.message)
    } finally {
      //actions.setSubmitting(false)
    }
  }

  login = async () => {
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
        this.setState({
          signedIn: true
        });
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
  };

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
        });
        // console.log("FOO")
        // console.log(result.user);
        await this.props.firebase.setPersistence() // Set persistent auth state
        console.log(result)
        const credential = this.props.firebase.getGoogleCredential(result.idToken, result.accessToken)
        const googleProfileData = await this.props.firebase.loginWithGoogle(credential)
        this.props.navigation.navigate('Home')
        console.log(googleProfileData)
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require("../assets/employee.gif")}
        style={styles.gif}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View style={styles.popup}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => {
                this.setModalVisible(false);
                this.signIn();
              }}
            >
              <Image
                source={require("../assets/google_logo.png")}
                style={styles.smallIcon}
              />

              <Text style={styles.text}> Google </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.facebookButton}
              onPress={() => {
                this.setModalVisible(false);
                this.login();
              }}
            >
              <Image
                source={require("../assets/facebook_logo.png")}
                style={styles.smallIcon}
              />

              <Text style={styles.text}> Facebook </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Image source={require("../assets/icon.png")} style={styles.icon} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.text}> Login </Text>
        </TouchableOpacity>
        <Text style={styles.smallText}>
          {" "}
          Login using your Google account or Facebook.{" "}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  gif: {
    flex: 1,
    alignSelf: "stretch",
    padding: 50
  },
  button: {
    backgroundColor: "#4293f5",
    alignItems: "center",
    padding: 10,
    borderRadius: 20
  },
  googleButton: {
    backgroundColor: "#DB4437",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#ffffff"
  },
  smallText: {
    color: "#ffffff",
    fontSize: 10,
    alignSelf: "center"
  },
  icon: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 325
  },
  smallIcon: {
    height: 20,
    width: 20
  },
  popup: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 350
  }
});

export default withFirebaseHOC(LoginScreen);

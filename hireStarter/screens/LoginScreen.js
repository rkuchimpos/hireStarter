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
import { withFirebaseHOC, AuthAPI } from '../config/Firebase'

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
  
  /**
	 * Log in based on given provider. 
   * Depending on the return value of the respective login call,
   * sets the navigation to the proper screen.
	 *
   * @param {string} provider Name of provider.
	 */
  login = async (provider) => {
    var loginData = null
    switch(provider) {
      case 'Google':
        loginData = await AuthAPI.loginWithGoogle()
        //console.log(await FirebaseAuth.loginWithGoogle())
        break;
      case 'Facebook':
        loginData = await AuthAPI.loginWithFacebook()
        //console.log(await FirebaseAuth.loginWithFacebook())
        break;
    }
    // TODO: Create sign up page
    if (loginData.additionalUserInfo.isNewUser) {
      console.log('New user')
      console.log(loginData.user.uid)
      this.props.navigation.navigate('EditProfile', {
        uid: loginData.user.uid,
        name: loginData.user.displayName,
        email: loginData.user.email,
        newUser: true
       })
    } else {
      console.log('Not new user')
      console.log(loginData.user.uid)
      this.props.navigation.navigate('Home', {
        uid: loginData.user.uid
      })
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
                this.login('Google');
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
                this.login('Facebook');
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

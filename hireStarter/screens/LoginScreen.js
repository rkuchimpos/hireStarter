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
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log("Success");
        console.log(await response.json());
      } else {
        console.log("Cancelled");
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log("Failure");
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
        console.log("FOO")
        console.log(result.user);
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
                navigate("Home");
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
                navigate("Home");
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

export default LoginScreen;

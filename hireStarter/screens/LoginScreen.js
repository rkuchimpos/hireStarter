import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, Alert, Image } from "react-native";

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Login"
    };
  };

  state = {
    modalVisible: false,
    popupsActive: false
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <LinearGradient
          colors={["#8E2DE2", "#4A00E0"]}
          style={{
            flex: 1,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >

      <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.googleButton} onPress={() => {
            this.setModalVisible(false);
            navigate('Home');}}>
            <Text style={styles.text}> Google </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton} onPress={() => {
            this.setModalVisible(false);
            navigate('Home');}}>
            <Text style={styles.text}> Facebook </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Image source={require('../assets/icon.png')} style={styles.icon}/>

      <TouchableOpacity style={styles.button} onPress={() => {this.setModalVisible(true);}}>
        <Text style={styles.text}> Login </Text>
      </TouchableOpacity>
      <Text style={styles.smallText}> Login using your Google account or Facebook. </Text>

      </LinearGradient>);
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4293f5',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20
  },
  googleButton: {
    backgroundColor: '#DB4437',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 50
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 50
  },
  text: {
    color: '#ffffff'
  },
  smallText: {
    color: "#ffffff",
    fontSize: 10,
    alignSelf: 'center'
  },
  icon: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 75,
    marginBottom: 300
  },
  popup: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 350
  }
});

export default LoginScreen;

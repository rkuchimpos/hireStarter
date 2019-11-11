import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, Alert } from "react-native";

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Login"
    };
  };

  state = {modalVisible: false};

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (<View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.button} onPress={() => {this.setModalVisible(false);}}>
            <Text> Pls go back </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => {this.setModalVisible(true);}}>
        <Text> Login </Text>
      </TouchableOpacity>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  button: {

  },
  popup: {

  }
});

export default LoginScreen;


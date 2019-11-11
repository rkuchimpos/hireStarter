import React from "react";
import { StyleSheet, Text, View } from "react-native";

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Profile"
    };
  };
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
});

export default ProfileScreen;

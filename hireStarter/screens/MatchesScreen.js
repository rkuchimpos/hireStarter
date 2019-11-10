import React from "react";
import { StyleSheet, Text, View } from "react-native";

class MatchesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Connections"
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

export default MatchesScreen;

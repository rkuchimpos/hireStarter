import React from "react";
import { Button, Text } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "hireStarter",
    headerRight: () => (
      <Button onPress={() => alert("Button placeholder")} title="placeholder" />
    )
  };
  render() {
    return <Text>HomeScreen</Text>;
  }
}

export default HomeScreen;

import React from "react";
import { Button, Text } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("Profile")}
          title="profile"
        />
      )
    };
  };
  render() {
    return <Text>HomeScreen</Text>;
  }
}

export default HomeScreen;

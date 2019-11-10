import React from "react";
import { Button, Text, View } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => navigation.navigate("Matches")}
            title="connections"
          />
          <Button
            onPress={() => navigation.navigate("Profile")}
            title="profile"
          />
        </View>
      )
    };
  };
  render() {
    return <Text>HomeScreen</Text>;
  }
}

export default HomeScreen;

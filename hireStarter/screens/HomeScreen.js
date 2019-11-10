import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <View style={styles.headerRight}>
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
    // TODO: Display stack of cards instead of a single, hard-coded one
    return (
      <View style={styles.container}>
        <Card />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row"
  },
  container: {
    margin: 10,
  }
});


export default HomeScreen;

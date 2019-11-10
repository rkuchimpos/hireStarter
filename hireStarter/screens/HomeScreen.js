import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Card from "../components/Card";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("Profile")}>
            <Icon name="user" color="#fff" size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("Matches")}>
            <Icon name="people" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };
  render() {
    images = [
      "https://i.imgur.com/cMFc42W.png",
      "https://i.imgur.com/6B55OIA.png"
    ];
    // TODO: Display stack of cards instead of a single, hard-coded one
    return (
      <View style={styles.container}>
        <Card
          photos={[
            "https://i.imgur.com/cMFc42W.png",
            "https://i.imgur.com/6B55OIA.png"
          ]}
          name={"Bob Boon, Jr."}
          location={"University of California, Los Angeles"}
          description={
            "Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
          }
          skills={[
            "C++",
            "Python",
            "Machine Learning",
            "Distributed Computing",
            "Computer Vision"
          ]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row"
  },
  headerButton: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 100
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#e5e5e5"
  }
});

export default HomeScreen;

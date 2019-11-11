import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import UserProfile from '../models/UserProfile'

const { width } = Dimensions.get("window");

// Temporary, should be fetched from server/cache
var myUserProfile = new UserProfile(
  name="Joe Bruin",
  uid=1,
  photos=[
    "https://i.imgur.com/cMFc42W.png",
    "https://i.imgur.com/6B55OIA.png"
  ],
  location="University of California, Los Angeles",
  skills=[
    "C++",
    "Python",
    "Machine Learning",
    "Distributed Computing",
    "Computer Vision"
  ],
  description="Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
);

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Profile"
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <Image style={{flex: 1, height: width / 2, width: width / 2}} source={{uri: myUserProfile.photos[0]}}/>
          <Image style={{flex: 1, height: width / 2, width: width / 2}} source={{uri: myUserProfile.photos[1]}}/>
        </View>
        <Text style={styles.categoryHeader}>About Me</Text>
        <View style={{backgroundColor: "#fff"}}>
          <Text style={{margin: 10}}>{myUserProfile.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    backgroundColor: "#e5e5e5"
  },
  profilePhoto: {
    width: width
  },
  categoryHeader: {
    fontSize: 20,
    color: "#414141",
    margin: 10,
  }
});

export default ProfileScreen;

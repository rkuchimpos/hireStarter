import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";



import SwiperFlatList from "react-native-swiper-flatlist";


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
    images = ['https://i.imgur.com/cMFc42W.png', 'https://i.imgur.com/6B55OIA.png'];
    // TODO: Display stack of cards instead of a single, hard-coded one
    return (
      <View style={styles.container}>
        <Card
          photos={['https://i.imgur.com/cMFc42W.png', 'https://i.imgur.com/6B55OIA.png']}
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
  container: {
    margin: 10,
  }
});

export default HomeScreen;

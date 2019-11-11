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
import ProfileCard from "../components/ProfileCard";
import CardStack, { Card } from "react-native-card-stack-swiper";

const mockProfiles = [
  {
    name: "Joe Bruin",
    uid: 1,
    photos: [
      "https://i.imgur.com/cMFc42W.png",
      "https://i.imgur.com/6B55OIA.png"
    ],
    location: "University of California, Los Angeles",
    skills: [
      "C++",
      "Python",
      "Machine Learning",
      "Distributed Computing",
      "Computer Vision"
    ],
    description:
      "Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
  },
  {
    name: "Joe Bruin",
    uid: 2,
    photos: [
      "https://i.imgur.com/cMFc42W.png",
      "https://i.imgur.com/6B55OIA.png"
    ],
    location: "University of California, Los Angeles",
    skills: [
      "C++",
      "Python",
      "Machine Learning",
      "Distributed Computing",
      "Computer Vision"
    ],
    description:
      "Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
  },
  {
    name: "Joe Bruin",
    uid: 3,
    photos: [
      "https://i.imgur.com/cMFc42W.png",
      "https://i.imgur.com/6B55OIA.png"
    ],
    location: "University of California, Los Angeles",
    skills: [
      "C++",
      "Python",
      "Machine Learning",
      "Distributed Computing",
      "Computer Vision"
    ],
    description:
      "Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
  }
];

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Icon name="user" color="#fff" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Matches")}
          >
            <Icon name="people" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };
  render() {
    // TODO: Display stack of cards instead of a single, hard-coded one
    return (
      <View style={styles.container}>
        <CardStack
          verticalSwipe={false}
          renderNoMoreCards={() => (
            <Text style={{ fontSize: 18, color: "gray", alignSelf: "center" }}>
              That's all for now.
            </Text>
          )}
          ref={swiper => {
            this.swiper = swiper;
          }}
        >
          {mockProfiles.map(item => (
            <Card key={item.uid}>
              <ProfileCard
                name={item.name}
                photos={item.photos}
                location={item.location}
                skills={item.skills}
                description={item.description}
              />
            </Card>
          ))}
        </CardStack>
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
    backgroundColor: "#e5e5e5",
  }
});

export default HomeScreen;

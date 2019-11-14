import React from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import CardStack, { Card } from "react-native-card-stack-swiper";
import ProfileCard from "../components/ProfileCard";
import UserProfile from '../models/UserProfile';
import BackendAPI from '../api/BackendAPI';

// get the data for this list from backend
var userProfiles = BackendAPI.getFilteredCards(20);

// TODO: Remove back button on home page
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <SimpleLineIcon name="user" color="#fff" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Matches")}
          >
            <SimpleLineIcon name="people" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };
  render() {
    // TODO: Display stack of cards instead of a single, hard-coded one
    return (
      <View style={styles.container}>
      <View>
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
          {userProfiles.map(item => (
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
        <View style={styles.controls}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 75,
              height: 75,
              backgroundColor: "#fa4b1d",
              borderRadius: 50,
              elevation: 10,
            }}
            onPress={() =>this.swiper.swipeLeft()}
          >
            <Ionicon name="ios-close" size={45} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 30,
              alignItems: "center",
              justifyContent: "center",
              width: 75,
              height: 75,
              backgroundColor: "#4dff8f",
              borderRadius: 50,
              elevation: 10,
            }}
            onPress={() =>this.swiper.swipeRight()}
          >
            <Ionicon name="ios-checkmark" size={45} color="#fff" />
          </TouchableOpacity>
        </View>
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
    flexDirection: "column",
    backgroundColor: "#e5e5e5",
    justifyContent: "space-between"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    ...Platform.select({
      ios: {
        zIndex: 10,
      },
      android: {
        elevation: 10,
      },
    }),
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
  },
});

export default HomeScreen;

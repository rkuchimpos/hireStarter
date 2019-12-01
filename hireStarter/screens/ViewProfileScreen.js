import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import UserProfile from "../models/UserProfile";
import Skill from "../components/Skill";
import BackendAPI from '../api/BackendAPI';
import BackendLogic from '../api/BackendLogic';

const { width } = Dimensions.get("window");

class ViewProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    uid = navigation.getParam('uid');
    // TODO: Display name as the title; fetch from db
    return {
      title: uid.toString(),
    };
  };

  render() {
    // TODO: Use UID to look up profile in DB; using mock profile in the meantime
    // TODO: Move fetching of profile out of render()
    const { uid } = this.props.navigation.state.params;
    //const userProfile = BackendLogic.fetchCardByUID(uid);
    const userProfile = BackendAPI.getMockProfile(uid);
    console.log("USER PROF:")
    console.log(userProfile);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <SwiperFlatList
              index={0}
              data={userProfile.photos}
              renderItem={({ item }) => (
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{ uri: item }}
                />
              )}
              showPagination
            />
          </View>
          <View style={{marginTop: 10}}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{userProfile.name}</Text>
              <Text style={styles.subtext}>{userProfile.location}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>About</Text>
              <Text style={styles.subtext}>{userProfile.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.skillList}>
                {userProfile.skills.map(skill => (
                  <View style={{ marginRight: 5, marginBottom: 5 }} key={skill}>
                    <Skill skill={skill} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#e5e5e5"
  },
  image: {
    width: width,
    height: width
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 1,
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 0,
          height: 0
        }
      },
      android: {
        elevation: 1
      }
    })
  },
  sectionHeader: {
    fontSize: 24
  },
  subtext: {
    color: "#404040",
    fontSize: 14
  },
  skillList: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

export default ViewProfileScreen;

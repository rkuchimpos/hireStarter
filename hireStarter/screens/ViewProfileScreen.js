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
import { withFirebaseHOC, ProfileAPI } from '../config/Firebase'

const { width } = Dimensions.get("window");

class ViewProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.navigation
    this.state = {
      city: '',
      connections: [],
      description: '',
      email: '',
      image1: "https://retohercules.com/images/transparent-to-the-user-8.png",
      image2: "https://retohercules.com/images/transparent-to-the-user-8.png",
      name: this.navigation.getParam('name'),
      organization: '',
      potentials: [],
      recruiter: false,
      skills: [],
      uid: this.navigation.getParam('uid', 'NO-UID')
    };
  }
  static navigationOptions = ({ navigation }) => {
    // TODO: Display name as the title; fetch from db
    return {
      title: this.state.name,
    };
  };

  // Loads data from Firestore here
  componentDidMount() {
    console.log(this.state)
    ProfileAPI.getUserData(this.state.uid).then((result) => {
      this.setState(result)
    })
  }

  render() {
    console.log("USER PROF:")
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <SwiperFlatList
              index={0}
              data={[this.state.image1, this.state.image2]}
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
              <Text style={styles.sectionHeader}>{this.state.name}</Text>
              <Text style={styles.subtext}>{this.state.organization}</Text>
              <Text style={styles.subtext}>{this.state.city}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>About</Text>
              <Text style={styles.subtext}>{this.state.email}</Text>
              <Text style={styles.subtext}>{this.state.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              <View style={styles.skillList}>
                {this.state.skills.map(skill => (
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

export default withFirebaseHOC(ViewProfileScreen);

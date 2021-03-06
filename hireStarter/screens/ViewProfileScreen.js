import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import SwiperFlatList from "react-native-swiper-flatlist";
import Skill from "../components/Skill";
import { withFirebaseHOC, ProfileAPI } from "../config/Firebase";
import ImageZoom from "react-native-image-pan-zoom";

const { width, height } = Dimensions.get("window");

class ViewProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      city: "",
      connections: [],
      description: "",
      email: "",
      image1: "https://cdn4.iconfinder.com/data/icons/eldorado-user/40/add_friend-512.png",
      image2: "https://cdn0.iconfinder.com/data/icons/striving-for-success-1/66/17-512.png",
      name: this.navigation.getParam("name"),
      organization: "",
      potentials: [],
      recruiter: false,
      skills: [],
      uid: this.navigation.getParam("uid", "NO-UID"),
      expandedImage: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    // TODO: Display name as the title; fetch from db
    return {
      title: navigation.getParam("name")
    };
  };

  // Loads data from Firestore here
  componentDidMount() {
    console.log(this.state);
    ProfileAPI.getUserData(this.state.uid).then(result => {
      this.setState(result);
    });
  }

  setModalVisible(visible) {
    this.setState({ expandedImage: visible });
  }

  setImage(image_uri) {
    this.setState({ image_uri: image_uri });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          visible={this.state.expandedImage}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}
          >
            <Image
              resizeMode="contain"
              style={{
                width: width,
                height: height
              }}
              source={{ uri: this.state.image_uri }}
            />
          </ImageZoom>
        </Modal>
        <ScrollView>
          <View>
            <SwiperFlatList
              index={0}
              data={[this.state.image1, this.state.image2]}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setModalVisible(true);
                    this.setImage(item);
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{ uri: item }}
                  />
                </TouchableWithoutFeedback>
              )}
              showPagination
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{this.state.name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicon
                  name="ios-briefcase"
                  color="#757575"
                  size={16}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.subtext}>{this.state.organization}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicon
                  name="ios-pin"
                  color="#757575"
                  size={16}
                  style={{ marginLeft: 2, marginRight: 6 }}
                />
                <Text style={styles.subtext}>{this.state.city}</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Contact</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicon
                  name="ios-mail"
                  color="#757575"
                  size={16}
                  style={{ marginRight: 5 }}
                />
                <TouchableWithoutFeedback
                  onPress={() => Linking.openURL(`mailto:${this.state.email}`)}
                >
                  <Text style={styles.link}>{this.state.email}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>About</Text>
              <Text style={styles.subtext}>{this.state.description}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Skills</Text>
              {this.state.skills.length === 0 ? (
                <Text style={styles.subtext}>No skills to show</Text>
              ) : (
                <View style={styles.skillList}>
                  {this.state.skills.map(skill => (
                    <View
                      style={{ marginRight: 5, marginBottom: 5 }}
                      key={skill}
                    >
                      <Skill skill={skill} />
                    </View>
                  ))}
                </View>
              )}
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
  link: {
    color: "#3376ff",
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
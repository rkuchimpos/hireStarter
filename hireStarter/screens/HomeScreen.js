import React from "react";
import {
  Button,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import CardStack, { Card } from "react-native-card-stack-swiper";
import ProfileCard from "../components/ProfileCard";
import { withFirebaseHOC, ProfileAPI, HomeAPI } from '../config/Firebase'

// TODO: Remove back button on home page
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = this.props.navigation
    this.state = {
      modalVisible: false,
      photo: null,
      cards: [],
      match: null,
      uid: this.navigation.getParam('uid', 'NO-UID'),
      loading: true
    };
  }

  componentDidMount() {
    ProfileAPI.getUserData(this.state.uid).then((result) => {
      this.setState({photo: result.image1})
    })
    HomeAPI.fetchCards(this.state.uid).then((result) => {
      ProfileAPI.getConnections(result).then((data) => {
        this.setState({
          cards: data
        })
        console.log(this.state.cards)
        this.setState({ loading: false })
      })
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "hireStarter",
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("EditProfile", {
              uid: navigation.state.params.uid
            })}
          >
            <SimpleLineIcon name="user" color="#fff" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("Matches", {
              uid: navigation.state.params.uid
            })}
          >
            <SimpleLineIcon name="people" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // TEST FUNCTION
  // testPassedValues() {
  //   params = this.props.navigation.state.params
  //   navigation = this.props.navigation
  //   console.log("UID: " + params.uid)
  //   console.log("name: " + params.name) // returns undefined
  //   console.log("email: " + params.email)
  //   if (params.name == undefined)
  //     console.log("name2: " + navigation.getParam('name', 'NO-NAME'))
  //   // console.log("ProperName: " + titleCase(navigation.getParam('name', 'NO-NAME')))
  //   console.log(params)
  // }
  onSwipedRight(matchProfile) {
    HomeAPI.addPotential(this.state.uid, matchProfile.uid);
    if (HomeAPI.checkConnection(this.state.uid, matchProfile.uid)) {
      HomeAPI.addMatches(this.state.uid, matchProfile.uid);
      this.setState({match: matchProfile})
      this.setModalVisible(true);
    }
    // console.log(
    //   "UID " +
    //   this.state.uid +
    //   " SWIPED RIGHT ON UID " +
    //   matchProfile.uid
    // );
    // // TODO: Replace with real match checking
    // isMatch = Math.random() <= 0.3;
    // if (isMatch) {
    //   console.log("MATCHED WITH UID " + matchProfile.uid);
    //   this.setState({ matchProfile: matchProfile });
    //   this.setModalVisible(true);
    // }
  }

  onSwipedLeft() {
    console.log("SWIPED LEFT");
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {<Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
          >
            {/* TODO: Refactor modal content into separate component file */}
              <View style={styles.modalContent}>
                <Text
                  style={{
                    fontSize: 42,
                    color: "#67ff76",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  Let's go!
            </Text>
                <Text style={{ fontSize: 24, color: "#fff", textAlign: "center" }}>
                  You've made a new connection.
            </Text>
                {this.state.match && (
                  <View style={{ flexDirection: "row", marginVertical: 30 }}>
                    <Image
                      style={styles.modalImage}
                      source={{ uri: this.state.photo}}
                    />
                    <Image
                      style={styles.modalImage}
                      source={{ uri: this.state.match.image1 }}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={{ marginBottom: 15 }}
                  onPress={() => {
                    this.setModalVisible(false);
                    this.props.navigation.navigate("ViewProfile", {
                      uid: this.state.match.uid
                    });
                  }}
                >
                  <LinearGradient
                    style={{ borderRadius: 100 }}
                    colors={["#8E2DE2", "#4A00E0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.modalButtonPrimary}>
                      <Text
                        style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                      >
                        VIEW PROFILE
                  </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <View style={styles.modalButtonSecondary}>
                    <Text
                      style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                    >
                      KEEP SEARCHING
                </Text>
                  </View>
                </TouchableOpacity>
              </View>
      </Modal> }
      <View>
              <CardStack
                verticalSwipe={false}
                renderNoMoreCards={() => (
                  <Text
                    style={{ fontSize: 18, color: "gray", alignSelf: "center" }}
                  >
                    That's all for now.
              </Text>
                )}
                ref={swiper => {
                  this.swiper = swiper;
                }}
              >
                {this.state.cards.map(item => (
                  <Card
                    key={item.uid}
                    onSwipedLeft={() => this.onSwipedLeft()}
                    onSwipedRight={() => this.onSwipedRight(item)}
                  >
                    <ProfileCard
                      name={item.name}
                      photos={[item.image1, item.image2]}
                      city={item.city}
                      organization={item.organization}
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
                  elevation: 10
                }}
                onPress={() => this.swiper.swipeLeft()}
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
                  elevation: 10
                }}
                onPress={() => this.swiper.swipeRight()}
              >
                <Ionicon name="ios-checkmark" size={45} color="#fff" />
              </TouchableOpacity>
            </View>
    </View>
  );
          }
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
            zIndex: 10
        },
      android: {
            elevation: 10
        }
      }),
      bottom: 0,
      left: 0,
      right: 0,
      marginBottom: 10
    },
  modalContent: {
            flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: "rgba(0, 0, 0, 0.9)"
        },
  modalButtonPrimary: {
            borderRadius: 100,
          borderWidth: 2,
          paddingVertical: 15,
          width: 300,
          alignItems: "center"
        },
  modalButtonSecondary: {
            borderRadius: 100,
          borderWidth: 2,
          borderColor: "#fff",
          paddingVertical: 15,
          width: 300,
          alignItems: "center"
        },
  modalImage: {
            height: 150,
          width: 150,
          marginHorizontal: 15,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: "#fff"
        }
      });
      
export default HomeScreen;
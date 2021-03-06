import React from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { withFirebaseHOC, ProfileAPI } from "../config/Firebase";
import SwitchSelector from "react-native-switch-selector";
import Skill from "../components/Skill";
import Ionicon from "react-native-vector-icons/Ionicons";
import ToggleSwitch from "toggle-switch-react-native";

const { width } = Dimensions.get("window");

var ACTION_TIMER = 400;
var _holdButtonTimer = 0;

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      city: "",
      connections: [],
      description: "",
      email: "",
      image1:
        "https://cdn4.iconfinder.com/data/icons/eldorado-user/40/add_friend-512.png",
      image2:
        "https://cdn0.iconfinder.com/data/icons/striving-for-success-1/66/17-512.png",
      name: "",
      organization: "",
      potentials: [],
      recruiter: false,
      skills: [],
      uid: this.navigation.getParam("uid", "NO-UID"),
      skillInputText: "",
      selectedSkillName: ""
    };
    this.newUser = this.navigation.getParam("newUser", false);
    if (this.newUser) {
      this.state.email = this.navigation.getParam("email");
      this.state.name = titleCase(this.navigation.getParam("name"));
    }
  }

  // Loads data from Firestore here
  componentDidMount() {
    if (!this.newUser) {
      ProfileAPI.getUserData(this.state.uid).then(result => {
        this.setState(result);
      });
    }
    this.navigation.setParams({
      referencedSaveProfile: this.updateUserData.bind(this)
    });
  }

  /**
   * Based on whether new user, create or update document in
   * Firestore.
   */
  updateUserData() {
    if (this.newUser) {
      ProfileAPI.createNewUser(this.state);
    } else {
      ProfileAPI.updateUserData(this.state);
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Profile",
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.state.params.referencedSaveProfile()}
          >
            <Ionicon name="ios-save" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  changeDescription(value) {
    this.setState({ description: value });
    //myUserProfile.description = value;
    //this.updateUserData() // Please make a submit button to call this
  }

  changeName(value) {
    this.setState({ name: value });
    //this.updateUserData();
  }

  changeEmail(value) {
    this.setState({ email: value });
    //this.updateUserData();
  }

  changeCity(value) {
    this.setState({ city: value });
    //this.updateUserData();
  }

  changeOrganization(value) {
    this.setState({ organization: value });
    //this.updateUserData();
  }

  changeUserType() {
    if (this.state.recruiter == true) {
      this.setState({ recruiter: false });
    } else {
      this.setState({ recruiter: true });
    }
  }

  handleAddSkill = () => {
    const value = this.state.skillInputText;
    console.log(value);
    if (value == "") {
      return;
    }

    updatedSkills = this.state.skills;
    updatedSkills.push(value);
    this.setState({ skills: updatedSkills });
    this.setState({ skillInputText: "" });
  };

  handleDeleteSkill(skillname) {
    var index = this.state.skills.indexOf(skillname);
    if (index > -1) {
      this.state.skills.splice(index, 1);
      this.setState({ skills: this.state.skills });
    }
  }

  async pickImage(pic_num) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      if (pic_num == 1) {
        this.setState({
          image1: "https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
        })
        ProfileAPI.uploadImage(this.state.uid, 1, result.uri).then(result => {
          this.setState({
            image1: result
          })
        })
      } else if (pic_num == 2) {
        this.setState({
          image2: "https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
        })
        ProfileAPI.uploadImage(this.state.uid, 2, result.uri).then(result => {
          this.setState({
            image2: result
          })
        })
      }
    }
  }

  render() {
    let { image1, image2 } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
        style={styles.container}
      >
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                flex: 1,
                height: width / 2,
                width: width / 2,
                borderWidth: 1,
                borderColor: "#000000"
              }}
              onPress={() => {
                this.pickImage(1);
              }}
            >
              {image1 && (
                <Image source={{ uri: image1 }} style={styles.profilePhoto} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: width / 2,
                width: width / 2,
                borderWidth: 1,
                borderColor: "#000000"
              }}
              onPress={() => {
                this.pickImage(2);
              }}
            >
              {image2 && (
                <Image source={{ uri: image2 }} style={styles.profilePhoto} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.categoryHeader}>Name</Text>
          <View style={{ backgroundColor: "#fff" }}>
            <TextInput
              style={styles.TextInputField}
              multiline
              placeholder="Tell us your name!"
              value={this.state.name}
              onChangeText={value => this.changeName(value)}
            />
          </View>
          <Text style={styles.categoryHeader}>Email</Text>
          <View style={{ backgroundColor: "#fff" }}>
            <TextInput
              style={styles.TextInputField}
              multiline
              placeholder="Enter your email!"
              value={this.state.email}
              onChangeText={value => this.changeEmail(value)}
            />
          </View>
          <Text style={styles.categoryHeader}>City</Text>
          <View style={{ backgroundColor: "#fff" }}>
            <TextInput
              style={styles.TextInputField}
              multiline
              placeholder="Enter your location!"
              value={this.state.city}
              onChangeText={value => this.changeCity(value)}
            />
          </View>
          <Text style={styles.categoryHeader}>Skills</Text>
          <Text style={styles.note}>Tap a skill to delete.</Text>
          <View style={styles.skillList}>
            {this.state.skills.map(skill => (
              <View key={skill}>
                <TouchableOpacity
                  style={{ marginRight: 5, marginBottom: 5 }}
                  onPress={() => this.handleDeleteSkill(skill)}
                >
                  <Skill skill={skill} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={[styles.row, { flex: 5, backgroundColor: "#fff" }]}>
            <TextInput
              style={styles.TextInputField}
              placeholder="Input new skill"
              value={this.state.skillInputText}
              onChangeText={value => this.setState({ skillInputText: value })}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleAddSkill}
            >
              <Text style={styles.buttonText}> Add </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.categoryHeader}>Organization</Text>
          <View style={{ backgroundColor: "#fff" }}>
            <TextInput
              style={styles.TextInputField}
              multiline
              placeholder="Enter your organization!"
              value={this.state.organization}
              onChangeText={value => this.changeOrganization(value)}
            />
          </View>
          <Text style={styles.categoryHeader}>About Me</Text>
          <View style={{ backgroundColor: "#fff" }}>
            <TextInput
              style={styles.TextInputField}
              multiline
              placeholder="Tell us about yourself!"
              value={this.state.description}
              onChangeText={value => this.changeDescription(value)}
            />
          </View>
          <View style={styles.switch}>
            <ToggleSwitch
              isOn={this.state.recruiter}
              onColor="green"
              offColor="red"
              size="large"
              onToggle={isOn => this.changeUserType()}
            />
            <Text style={styles.TextInputField}>Are you a recruiter?</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    backgroundColor: "#e5e5e5"
  },
  note: {
    marginBottom: 10,
    marginLeft: 10,
    color: "gray"
  },
  row: {
    flexDirection: "row"
  },
  button: {
    backgroundColor: "#4A00E0",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff"
  },
  profilePhoto: {
    width: width / 2 - 2,
    height: width / 2 - 2
  },
  categoryHeader: {
    fontSize: 20,
    color: "#414141",
    margin: 10
  },
  TextInputField: {
    flex: 4,
    marginHorizontal: 15,
    marginVertical: 10
  },
  text: {
    color: "#ffffff"
  },
  switch: {
    marginTop: 20,
    marginHorizontal: 10
  },
  skillList: {
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
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
  switch: {
    alignItems: "center",
    margin: 20
  }
});

export default EditProfileScreen;

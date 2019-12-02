import React from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
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

const { width } = Dimensions.get("window");

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

function convertBooltoInt(bool) {
    if (bool) {
      return 0;
    } else {
      return 1;
    }
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
      image1: "https://retohercules.com/images/transparent-to-the-user-8.png",
      image2: "https://retohercules.com/images/transparent-to-the-user-8.png",
      name: "",
      organization: "",
      potentials: [],
      recruiter: false,
      skills: [],
      skillInputText: "",
      uid: this.navigation.getParam("uid", "NO-UID")
    };
    this.newUser = this.navigation.getParam("newUser", false);
    if (this.newUser) {
      this.state.email = this.navigation.getParam("email");
      this.state.name = titleCase(this.navigation.getParam("name"));
    }
  }

  // Loads data from Firestore here
  componentDidMount() {
    console.log(this.state);
    if (!this.newUser) {
      ProfileAPI.getUserData(this.state.uid).then(result => {
        this.setState(result);
        console.log(this.state);
      });
    }
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
      title: "My Profile"
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

  changeUserType(value) {
    this.setState({ recruiter: value });
    // TODO: take these out later
    console.log(this.state.recruiter);
    console.log(convertBooltoInt(this.state.recruiter));
  }

  addSkillListener = () => {
    const value  = this.state.skillInputText;
    console.log(value);
    if (value == "") { return; }

    updatedSkills = this.state.skills;
    updatedSkills.push(value);
    this.setState({ skills: updatedSkills });
    this.setState({ skillInputText: "" });
    // TODO: take these out later
    console.log(this.state.skills);
  }

  async pickImage(pic_num) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      if (pic_num == 1) {
        console.log(result);
        this.setState({
          image1: await ProfileAPI.uploadImage(this.state.uid, 1, result.uri)
        });
      } else if (pic_num == 2) {
        this.setState({
          image2: await ProfileAPI.uploadImage(this.state.uid, 2, result.uri)
        });
      }
    }
  }

  render() {
    let { image1, image2 } = this.state;

    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
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
        <View style={styles.skillList}>
          {this.state.skills.map(skill => (
            <View style={{ marginRight: 5, marginBottom: 5 }} key={skill}>
              <Skill skill={skill} />
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <TextInput
            style={styles.TextInputField}
            placeholder="New Skill Name"
            value={this.state.skillInputText}
            onChangeText={value => this.setState({ skillInputText: value})}
          />
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={this.addSkillListener}
          >
            <Text style={styles.text}> Add Skill </Text>
        </TouchableOpacity>
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
        <SwitchSelector
          initial={this.state.recruiter ? 0 : 1}
          textColor="#4293f5"
          selectedColor="#fff"
          buttonColor="#4293f5"
          borderColor="#4293f5"
          hasPadding
          options={[
            {label: "Recruiter", value: true},
            {label: "Job Seeker", value: false}
          ]}
          onPress={value => this.changeUserType(value)}
          style={styles.switch}
          />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.updateUserData();
          }}
        >
          <Text style={styles.text}> Save Changes </Text>
        </TouchableOpacity>
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
    marginHorizontal: 15,
    marginVertical: 10
  },
  button: {
    backgroundColor: "#4293f5",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 100,
    marginRight: 100
  },
  text: {
    color: "#ffffff"
  },
  switch: {
    marginTop: 20,
    marginHorizontal: 10
  },
  skillList: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

export default EditProfileScreen;

import React from "react";
import { Dimensions, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import UserProfile from '../models/UserProfile';
import BackendAPI from '../api/BackendAPI';
import { withFirebaseHOC, ProfileAPI } from '../config/Firebase'

const { width } = Dimensions.get("window");

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for(var i = 0; i< sentence.length; i++){
     sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

class EditProfileScreen extends React.Component {
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
      name: '',
      organization: '',
      potentials: [],
      recruiter: false,
      skills: [],
      uid: this.navigation.getParam('uid', 'NO-UID')
    };
    this.newUser = this.navigation.getParam('newUser', false)
    if (this.newUser) {
      this.state.email = this.navigation.getParam('email')
      this.state.name = titleCase(this.navigation.getParam('name'))
    }
  }

  // Loads data from Firestore here
  componentDidMount() {
    console.log(this.state)
    if (!this.newUser) {
      ProfileAPI.getUserData(this.state.uid).then((result) => {
        this.setState(result)
      })
    }
  }

  /**
   * Based on whether new user, create or update document in
   * Firestore.
   */
  updateUserData() {
    if (this.newUser) {
      ProfileAPI.createNewUser(this.state)
    } else {
      ProfileAPI.updateUserData(this.state)
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Profile"
    };
  };

  changeDescription(value) {
    this.setState({description: value});
    //myUserProfile.description = value;
    //this.updateUserData() // Please make a submit button to call this
  }

  changeName(value) {
    this.setState({name: value});
    //this.updateUserData();
  }

  changeEmail(value) {
    this.setState({email: value});
    //this.updateUserData();
  }

  changeCity(value) {
    this.setState({city: value});
    //this.updateUserData();
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
        console.log(result)
        this.setState({image1: await ProfileAPI.uploadImage(this.state.uid, 1, result.uri)});
      } else if (pic_num == 2) {
        this.setState({image2: await ProfileAPI.uploadImage(this.state.uid, 2, result.uri)});
      }
    }
  };

  render() {
    let { image1, image2 } = this.state;

    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={{flex: 1, height: width / 2, width: width / 2, borderWidth: 1, borderColor: '#000000'}} onPress={() => {
            this.pickImage(1);}}>
            {image1 &&
            <Image source={{ uri: image1 }} style={styles.profilePhoto}/>}
          </TouchableOpacity>

          <TouchableOpacity style={{height: width / 2, width: width / 2, borderWidth: 1, borderColor: '#000000'}} onPress={() => {
            this.pickImage(2);}}>
            {image2 &&
            <Image source={{ uri: image2 }} style={styles.profilePhoto}/>}
          </TouchableOpacity>
        </View>
        <Text style={styles.categoryHeader}>Name</Text>
        <View style={{backgroundColor: "#fff"}}>
          <TextInput
            style={styles.TextInputField}
            multiline
            placeholder="Tell us your name!"
            value={this.state.name}
            onChangeText={(value) => this.changeName(value)}
          />
        </View>
        <Text style={styles.categoryHeader}>Email</Text>
        <View style={{backgroundColor: "#fff"}}>
          <TextInput
            style={styles.TextInputField}
            multiline
            placeholder="Enter your email!"
            value={this.state.email}
            onChangeText={(value) => this.changeEmail(value)}
          />
        </View>
        <Text style={styles.categoryHeader}>City</Text>
        <View style={{backgroundColor: "#fff"}}>
          <TextInput
            style={styles.TextInputField}
            multiline
            placeholder="Enter your location!"
            value={this.state.city}
            onChangeText={(value) => this.changeCity(value)}
          />
        </View>
        <Text style={styles.categoryHeader}>About Me</Text>
        <View style={{backgroundColor: "#fff"}}>
          <TextInput
            style={styles.TextInputField}
            multiline
            placeholder="Tell us about yourself!"
            value={this.state.description}
            onChangeText={(value) => this.changeDescription(value)}
          />
        </View>

        {/* Add Submit Changes Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.updateUserData();
          }}
        >
          <Text style={styles.text}> Save Changes </Text>
        </TouchableOpacity>
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
    width: (width / 2) - 2,
    height: (width / 2) - 2
  },
  categoryHeader: {
    fontSize: 20,
    color: "#414141",
    margin: 10,
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
    margin: 30,
  },
  text: {
    color: "#ffffff"
  }
});

export default withFirebaseHOC(EditProfileScreen);

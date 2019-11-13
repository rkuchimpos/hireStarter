import React from "react";
import { Dimensions, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import UserProfile from '../models/UserProfile';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get("window");

// Temporary, should be fetched from server/cache
var myUserProfile = new UserProfile(
  name="Joe Bruin",
  uid=1,
  photos=[
    "https://img.pngio.com/free-png-plus-sign-transparent-plus-signpng-images-pluspng-plus-sign-transparent-background-512_512.png",
    "https://img.pngio.com/free-png-plus-sign-transparent-plus-signpng-images-pluspng-plus-sign-transparent-background-512_512.png"
  ],
  location="University of California, Los Angeles",
  skills=[
    "C++",
    "Python",
    "Machine Learning",
    "Distributed Computing",
    "Computer Vision"
  ]
);

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AboutMeText: myUserProfile.description,
      image1: "https://img.pngio.com/free-png-plus-sign-transparent-plus-signpng-images-pluspng-plus-sign-transparent-background-512_512.png",
      image2: "https://img.pngio.com/free-png-plus-sign-transparent-plus-signpng-images-pluspng-plus-sign-transparent-background-512_512.png"
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Profile"
    };
  };

  changeAboutMeText(value) {
    this.setState({AboutMeText: value});
    myUserProfile.description = value;
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
        this.setState({image1: result.uri});
      } else if (pic_num == 2) {
        this.setState({image2: result.uri});
      }
    }
  };

  render() {
    let { image1, image2 } = this.state;

    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={{flex: 1, height: width / 2, width: width / 2}} onPress={() => {
            this.pickImage(1);}}>
            {image1 &&
            <Image source={{ uri: image1 }} style={{height: width / 2, width: width / 2}}/>}
          </TouchableOpacity>

          <TouchableOpacity style={{height: width / 2, width: width / 2}} onPress={() => {
            this.pickImage(2);}}>
            {image2 &&
            <Image source={{ uri: image2 }} style={{flex: 1, height: width / 2, width: width / 2}}/>}
          </TouchableOpacity>
        </View>
        <Text style={styles.categoryHeader}>About Me</Text>
        <View style={{backgroundColor: "#fff"}}>
          <TextInput
            style={styles.TextInputField}
            multiline
            placeholder="Tell us about yourself!"
            value={this.state.AboutMeText}
            onChangeText={(value) => this.changeAboutMeText(value)}
          />
        </View>
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
    width: width
  },
  categoryHeader: {
    fontSize: 20,
    color: "#414141",
    margin: 10,
  },
  TextInputField: {
    marginHorizontal: 15,
    marginVertical: 10
  }
});

export default ProfileScreen;

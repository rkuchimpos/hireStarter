import React from 'react';
import { Text } from 'react-native';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Profile",
    };
  };
  render() {
    return (
      <Text>ProfileScreen</Text>
    );
  }
}

export default ProfileScreen;

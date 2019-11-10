import React from 'react';
import { Text } from 'react-native';

class MatchesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Connections",
    };
  };
  render() {
    return (
      <Text>MatchesScreen</Text>
    );
  }
}

export default MatchesScreen;

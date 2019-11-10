import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

class Skill extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.skill}>{this.props.skill}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2522b8',
    borderRadius: 20,
    padding: 8,
    alignSelf: 'flex-start',
  },
  skill: {
    fontSize: 14,
    color: '#fff',
  }
});


export default Skill;

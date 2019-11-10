import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/baboon.png")} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Bob Boon</Text>
          <Text style={styles.subtitle}>Los Angeles, CA</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 10,
        shadowOpacity: 1.0,
        shadowOffset: {
          width: 0,
          height: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  image: {
    width: null,
    height: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  profileInfo: {
    margin: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#606060',
  },
  subtitle: {
    color: '#909090',
    fontSize: 14,
  }
});

export default Card;

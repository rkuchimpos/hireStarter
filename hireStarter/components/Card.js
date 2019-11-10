import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Skill from "./Skill";

class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={require("../assets/baboon.png")} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.subtitle}>{this.props.location}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
          <View style={styles.skillList}>
            {this.props.skills.map(skill => (
              <View style={{ marginRight: 5, marginBottom: 5 }} key={skill}>
                <Skill skill={skill} />
              </View>
            ))}
          </View>
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
    borderTopRightRadius: 10
  },
  profileInfo: {
    margin: 10
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#606060"
  },
  subtitle: {
    color: "#909090",
    fontSize: 14
  },
  description: {
    color: "#404040",
    fontSize: 14,
    marginTop: 20
  },
  skillList: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});

export default Card;

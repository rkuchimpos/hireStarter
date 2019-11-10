import React from "react";
import { Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import Skill from "./Skill";

const { width } = Dimensions.get('window');

class Card extends React.Component {
  render() {
    console.log(this.props.photos);
    return (
      <View style={styles.card}>
        <View>
          <SwiperFlatList
            index={0}
            data={this.props.photos}
            renderItem={({ item }) => (
              <Image resizeMode="cover" style={styles.image} source={{ uri: item }} />
            )}
            showPagination
          />
        </View>
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
    borderRadius: 0,
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
    width: width - 20,
    height: 350,
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

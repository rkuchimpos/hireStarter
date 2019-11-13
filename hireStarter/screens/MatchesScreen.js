import React from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

function Item({ uid, name, photo, location, skills, navigate }) {
  return (
    <TouchableOpacity onPress={() => navigate('ViewProfile', { uid: uid })}>
      <View style={styles.listEntry}>
        <Image style={styles.image} source={{ uri: photo }} />
        <View style={{ flexDirection: "column", marginLeft: 10, marginRight: 100 }}>
          <Text>{name}</Text>
          <Text style={styles.subtitle}>{location}</Text>
          <Text style={styles.subtitle}>Skills: {skills.join(', ')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

class MatchesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Connections"
    };
  };

  render() {
    const mock_connections = [
      {
        name: "Joe Bruin",
        uid: 1,
        photos: [
          "https://i.imgur.com/cMFc42W.png",
          "https://i.imgur.com/6B55OIA.png"
        ],
        location: "University of California, Los Angeles",
        skills: [
          "C++",
          "Python",
          "Machine Learning",
          "Distributed Computing",
          "Computer Vision"
        ]
      },
      {
        name: "Joe Bruin",
        uid: 2,
        photos: [
          "https://i.imgur.com/cMFc42W.png",
          "https://i.imgur.com/6B55OIA.png"
        ],
        location: "University of California, Los Angeles",
        skills: [
          "C++",
          "Python",
          "Machine Learning",
          "Distributed Computing",
          "Computer Vision"
        ]
      },
      {
        name: "Joe Bruin",
        uid: 3,
        photos: [
          "https://i.imgur.com/cMFc42W.png",
          "https://i.imgur.com/6B55OIA.png"
        ],
        location: "University of California, Los Angeles",
        skills: [
          "C++",
          "Python",
          "Machine Learning",
          "Distributed Computing",
          "Computer Vision"
        ]
      },
      {
        name: "Joe Bruin",
        uid: 4,
        photos: [
          "https://i.imgur.com/cMFc42W.png",
          "https://i.imgur.com/6B55OIA.png"
        ],
        location: "University of California, Los Angeles",
        skills: [
          "C++",
          "Python",
          "Machine Learning",
          "Distributed Computing",
          "Computer Vision"
        ]
      }
    ];
    return (
      <View style={styles.container}>
        <FlatList
          data={mock_connections}
          renderItem={({ item }) => (
            <Item
              navigate={this.props.navigation.navigate}
              uid={item.uid}
              name={item.name}
              photo={item.photos[0]}
              location={item.location}
              skills={item.skills}
            />
          )}
          keyExtractor={match => match.uid.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#e5e5e5"
  },
  listEntry: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowRadius: 1,
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 0,
          height: 0
        }
      },
      android: {
        elevation: 1
      }
    })
  },
  subtitle: {
    color: "#909090",
    flex: 1,
    flexWrap: 'wrap'
  },
  image: {
    height: 100,
    width: 100
  },
});

export default MatchesScreen;

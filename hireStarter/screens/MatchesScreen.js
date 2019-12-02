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
import BackendAPI from "../api/BackendAPI";
import { withFirebaseHOC, ProfileAPI } from '../config/Firebase'

function Item({ uid, name, photo, organization, skills, navigate }) {
  return (
    <TouchableOpacity
      onPress={() => navigate("ViewProfile", { uid: uid, name: name })}
    >
      <View style={styles.listEntry}>
        <Image style={styles.image} source={{ uri: photo }} />
        <View
          style={{ flexDirection: "column", marginLeft: 10, marginRight: 100 }}
        >
          <Text style={{fontSize: 16}}>{name}</Text>
          <Text style={styles.subtitle}>{organization}</Text>
          <Text style={styles.subtitle}>Skills: {skills.join(", ")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

class MatchesScreen extends React.Component {
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
      uid: this.navigation.getParam('uid', 'NO-UID'),
      loading: true
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Connections"
    };
  };

  // Loads data from Firestore here
  componentDidMount() {
    console.log(this.state)
    ProfileAPI.getUserData(this.state.uid).then((result) => {
      this.setState(result)
      ProfileAPI.getConnections(this.state.connections).then((data) => {
        this.setState({
          connections: data
        })
        this.setState({loading: false})
      })
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>     
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.connections}
            renderItem={({ item }) => (
              <Item
                navigate={this.props.navigation.navigate}
                uid={item.uid}
                name={item.name}
                photo={item.image1}
                location={item.organization}
                skills={item.skills}
              />
            )}
            keyExtractor={match => match.uid.toString()}
          />
        </View>
      );
    }
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
    flexWrap: "wrap"
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#8E2DE2",
  }
});

export default withFirebaseHOC(MatchesScreen);

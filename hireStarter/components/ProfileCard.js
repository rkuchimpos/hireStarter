import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import Skill from "./Skill";
import ImageZoom from "react-native-image-pan-zoom";

const { width, height } = Dimensions.get("window");

class ProfilePhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedImage: false
    };
  }

  setModalVisible(visible) {
    this.setState({ expandedImage: visible });
  }

  setImage(image_uri) {
    this.setState({ image_uri: image_uri });
  }

  render() {
    return (
      <View>
        <View style={this.props.styles.imageModal}>
          <Modal
            animationType="fade"
            visible={this.state.expandedImage}
            onRequestClose={() => this.setModalVisible(false)}
          >
            <ImageZoom
              cropWidth={width}
              cropHeight={height}
              imageWidth={width}
              imageHeight={height}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: width,
                  height: height
                }}
                source={{ uri: this.state.image_uri }}
              />
            </ImageZoom>
          </Modal>
        </View>

        <View>
          <SwiperFlatList
            index={0}
            data={this.props.photos}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setModalVisible(true);
                  this.setImage(item);
                }}
              >
                <Image
                  resizeMode="cover"
                  style={
                    this.props.expanded
                      ? this.props.styles.imageInExpandedCard
                      : this.props.styles.image
                  }
                  source={{ uri: item }}
                />
              </TouchableWithoutFeedback>
            )}
            showPagination
          />
        </View>
      </View>
    );
  }
}

function ProfileContent({
  styles,
  name,
  organization,
  city,
  description,
  skills
}) {
  return (
    <View style={styles.profileInfo}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.subtitle}>{organization}</Text>
      <Text style={styles.subtitle}>{city}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.skillList}>
        {skills.map(skill => (
          <View style={{ marginRight: 5, marginBottom: 5 }} key={skill}>
            <Skill skill={skill} />
          </View>
        ))}
      </View>
    </View>
  );
}

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedCard: false
    };
  }

  setModalVisible(visible) {
    console.log("EXPAND");
    this.setState({ expandedCard: visible });
  }

  render() {
    return (
      <View style={styles.cardWrapper}>
        <Modal
          animationType="fade"
          visible={this.state.expandedCard}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ProfilePhotoGallery
            styles={styles}
            photos={this.props.photos}
            expanded={true}
          />
          <ScrollView>
            <ProfileContent
              styles={styles}
              name={this.props.name}
              organization={this.props.organization}
              city={this.props.city}
              description={this.props.description}
              skills={this.props.skills}
            />
          </ScrollView>
        </Modal>
        <View style={styles.card}>
          <ProfilePhotoGallery
            styles={styles}
            photos={this.props.photos}
            expanded={false}
          />
          <TouchableWithoutFeedback onPress={() => this.setModalVisible(true)}>
            <View>
              <ProfileContent
                styles={styles}
                name={this.props.name}
                organization={this.props.organization}
                city={this.props.city}
                description={this.props.description}
                skills={this.props.skills}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowRadius: 1,
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 0,
          height: 0
        }
      }
    })
  },
  card: {
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 10
      }
    })
  },
  image: {
    width: width - 20,
    height: 350
  },
  imageInExpandedCard: {
    width: width,
    height: 350
  },
  profileInfo: {
    margin: 10
  },
  name: {
    //fontWeight: "bold",
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
    marginTop: 15
  },
  skillList: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  imageModal: {
    flex: 1
  }
});

export default ProfileCard;
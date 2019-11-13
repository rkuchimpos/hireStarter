import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { LinearGradient } from "expo-linear-gradient";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MatchesScreen from "./screens/MatchesScreen";
import LoginScreen from "./screens/LoginScreen";
import ViewProfileScreen from "./screens/ViewProfileScreen";

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Profile: {
      screen: ProfileScreen
    },
    Matches: {
      screen: MatchesScreen
    },
    Login: {
      screen: LoginScreen
    },
    ViewProfile: {
      screen: ViewProfileScreen,
    }
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerBackground: (
        <LinearGradient
          style={{ flex: 1 }}
          colors={["#8E2DE2", "#4A00E0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      ),
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "normal"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;

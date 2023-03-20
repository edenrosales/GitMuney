import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import ViewAccountScreen from "./screens/ViewAccountScreen";
import { ThemeProvider } from "./components/ContextProvider";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { GoogleSignIn } from '@react-native-google-signin/google-signin'
import { Picker } from "@react-native-picker/picker";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import FirstLoginConfig from "./components/FirstLoginConfig";
import SortCategories from "./components/SortCategories";
import SettingsAndAnalytics from "./components/SettingsAndAnalytics";
export default function App() {
  const authStates = {
    NotLoggedIn: "Not Logged In",
    ConfigCompleted: "Config Completed",
    ConfigNotCompleted: "Config Not Completed",
  };
  const AuthStack = createNativeStackNavigator();
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    "SSP-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SSP-Italic": require("./assets/fonts/SourceSansPro-Italic.ttf"),
    "SSP-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SSP-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SSP-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  });
  const Tab = createBottomTabNavigator();
  const [authState, setAuthState] = useState(authStates.NotLoggedIn);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  const onAuthStateChanged = async () => {
    if (auth().currentUser) {
      const firstLogin = await (
        await firestore().collection("users").doc(auth().currentUser.uid).get()
      ).data().firstLogin;
      if (firstLogin === true) {
        setAuthState(authStates.ConfigNotCompleted);
        // Keyboard.dismiss();
        //this will show the first time setup for the user
      } else {
        setAuthState(authStates.ConfigCompleted);
      }
    } else {
      setAuthState(authStates.NotLoggedIn);
    }
  };
  const MainContent = () => {
    return (
      //Theme provider is the ContextWrapper for main screens after authentication flow is complete
      <ThemeProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarActiveBackgroundColor: "#2d2e30",
            tabBarInactiveBackgroundColor: "#2d2e30",
            tabBarStyle: {
              borderTopWidth: 0,
            },
            // tabBarBadgeStyle: { backgroundColor: "#2d2e30" },
          }}
          initialRouteName="ViewAccount"
        >
          <Tab.Screen name="SortCategories" component={SortCategories} />
          <Tab.Screen
            name="ViewAccount"
            component={ViewAccountScreen}
            // options={{
            //   gestureDirection: "horizontal",
            //   title: "Logout",
            //   headerTintColor: "#746961",
            //   headerStyle: { backgroundColor: "#2d2e30" },
            //   headerMode: "screen",
            // }}
          />
          <Tab.Screen
            name="SettingsAndAnalytics"
            component={SettingsAndAnalytics}
          />
        </Tab.Navigator>
      </ThemeProvider>
    );
  };

  return (
    <NavigationContainer>
      {authState !== authStates.NotLoggedIn ? (
        <Stack.Navigator
          initialRouteName={
            authState === authStates.ConfigNotCompleted
              ? "FirstLoginConfig"
              : "MainContent"
          }
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="MainContent"
            component={MainContent}
          ></Stack.Screen>
          <Stack.Screen
            name="FirstLoginConfig"
            component={FirstLoginConfig}
          ></Stack.Screen>
        </Stack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <Stack.Screen
            name="Home"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              gestureDirection: "horizontal",
              title: "Home",
              headerTintColor: "#746961",
              headerStyle: { backgroundColor: "#2d2e30" },
            }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create();

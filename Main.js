import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import {
  CommonActions,
  NavigationContainer,
  StackActions,
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import ViewAccountScreen from "./screens/ViewAccountScreen";
import { useAppState } from "./components/ContextProvider";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { GoogleSignIn } from '@react-native-google-signin/google-signin'
import { Picker } from "@react-native-picker/picker";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import FirstLoginConfig from "./components/FirstLoginConfig";
import SortCategories from "./components/SortCategories";
import SettingsAndAnalytics from "./components/SettingsAndAnalytics";

const Main = () => {
  const [fontsLoaded] = useFonts({
    "SSP-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SSP-Italic": require("./assets/fonts/SourceSansPro-Italic.ttf"),
    "SSP-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SSP-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SSP-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  });
  const appStateContext = useAppState();
  const authStates = {
    NotLoggedIn: "Not Logged In",
    ConfigCompleted: "Config Completed",
    ConfigNotCompleted: "Config Not Completed",
  };

  const [appState, setAppState] = useState(authStates.NotLoggedIn);
  useEffect(() => {
    console.log("App state updated: " + appStateContext);
    setAppState(appStateContext);
  }, [appStateContext]);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const MainContent = () => {
    return (
      //Theme provider is the ContextWrapper for main screens after authentication flow is complete

      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarActiveBackgroundColor: "#2d2e30",
          tabBarInactiveBackgroundColor: "#2d2e30",
          tabBarStyle: {
            borderTopWidth: 0,
          },
        }}
        initialRouteName="ViewAccount"
      >
        <Tab.Screen name="SortCategories" component={SortCategories} />
        <Tab.Screen name="ViewAccount" component={ViewAccountScreen} />
        <Tab.Screen
          name="SettingsAndAnalytics"
          component={SettingsAndAnalytics}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {console.log("THIS WORKS")}
      {console.log(global.HermesInternal)}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {appState === authStates.ConfigCompleted ||
        appState === authStates.ConfigNotCompleted ? (
          appState === authStates.ConfigCompleted ? (
            <Stack.Screen
              name="MainContent"
              component={MainContent}
            ></Stack.Screen>
          ) : (
            <Stack.Screen
              name="FirstLoginConfig"
              component={FirstLoginConfig}
            ></Stack.Screen>
          )
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Main;

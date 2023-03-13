import React, { useState } from "react";
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
// import { GoogleSignIn } from '@react-native-google-signin/google-signin'

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
    "SSP-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
    "SSP-Italic": require("./assets/fonts/SourceSansPro-Italic.ttf"),
    "SSP-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SSP-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SSP-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
  });

  return (
    // <Navigator/>

    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator initialRouteName="Home">
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
          <Stack.Screen
            name="ViewAccount"
            component={ViewAccountScreen}
            options={{
              gestureDirection: "horizontal",
              title: "Logout",
              headerTintColor: "#746961",
              headerStyle: { backgroundColor: "#2d2e30" },
              headerMode: "screen",
              // headerLeft: () => (
              // <Button
              //   onPress={() => alert('This is a button!')}
              //   title="Info"
              //   color="#fff"
              // />
              // ),

              // headerLeft: ()=>{
              //   return <HeaderBackButton style = {{tontColor: '#746961', marginLeft: 0}} onPress = {()=>(handleBack())}/>
              // }
            }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create();

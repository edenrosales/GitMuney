import React from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
  isSignedIn,
} from "@react-native-google-signin/google-signin";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Emoji from "./Emoji";

const SettingsAndAnalytics = () => {
  const signOut = async () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
      });
    if (GoogleSignin.isSignedIn()) {
      await GoogleSignin.revokeAccess().catch((err) => console.log(err));
      await GoogleSignin.signOut().catch((err) => console.log(err));
      console.log("signed out");
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // position: "absolute",
          width: "100%",
          height: "6%",
          backgroundColor: "white",
          zIndex: 1,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            position: "absolute",
            left: 15,
            fontSize: 24,
            fontFamily: "SSP-SemiBold",
            bottom: 0,
            // top: 10,
          }}
        >
          Account and Settings
        </Text>
      </View>

      <View style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
        <View style={{ flex: 1 }}></View>
        <View style={{}}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default SettingsAndAnalytics;

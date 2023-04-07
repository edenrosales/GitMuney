import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
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

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      ></Button>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            animatedStyle,
            { height: 20, width: 20, backgroundColor: "black" },
          ]}
        ></Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsAndAnalytics;

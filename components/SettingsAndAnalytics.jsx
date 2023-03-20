import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
  isSignedIn,
} from "@react-native-google-signin/google-signin";

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
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsAndAnalytics;

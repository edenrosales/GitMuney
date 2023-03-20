import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import auth from "@react-native-firebase/auth";
const SettingsAndAnalytics = () => {
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          auth().signOut();
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsAndAnalytics;

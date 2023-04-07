import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

const MonthSwitcher = (props) => {
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: 50,
        // height: "12%",
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={() => {
          console.log("this works");
        }}
        style={{
          overflow: "hidden",
          width: "93%",
          backgroundColor: "gray",
          opacity: 0.15,
          height: "90%",
          borderRadius: 15,
          justifyContent: "center",
        }}
      ></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MonthSwitcher;

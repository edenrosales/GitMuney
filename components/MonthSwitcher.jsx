import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Emoji from "./Emoji";
import { Entypo } from "@expo/vector-icons";

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
      <View
        style={{
          overflow: "hidden",
          width: "93%",
          //   backgroundColor: "gray",
          //   opacity: 0.15,
          height: "90%",
          borderRadius: 15,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable style={{ left: 10 }}>
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={{ fontFamily: "SSP-SemiBold", fontSize: 15 }}>Month</Text>
        <Pressable style={{ right: 10 }}>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "gray",
            opacity: 0.15,
          }}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MonthSwitcher;

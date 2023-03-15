import React from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TransactionModalComponent = (props) => {
  return (
    <Pressable
      style={{
        position: "absolute",
        height: screenHeight,
        width: screenWidth,
        backgroundColor: "black",
        zIndex: props.visible ? 1 : -1,
        opacity: props.visible ? 0.5 : 0,

        // zIndex: -5,
      }}
      onPress={() => props.toggleVisible((prev) => !prev)}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1,
        }}
      >
        <View
          style={{
            width: "50%",
            height: "50%",
            backgroundColor: "white",
          }}
        ></View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default TransactionModalComponent;

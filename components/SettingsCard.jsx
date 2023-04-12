import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Emoji from "./Emoji";

const SettingsCard = (props) => {
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: 60,
        // height: "12%",
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={props.specialFunction}
        style={{
          overflow: "hidden",
          width: "93%",
          backgroundColor: "transparent",
          height: "80%",
          borderRadius: 15,
          justifyContent: "center",
        }}
      >
        <View
          style={[
            {
              position: "absolute",
              height: "100%",
              borderRadius: 15,
              width: 0.5,
              width: "100%",
              backgroundColor: "#f3f2f5",
              opacity: 0.8,
            },
            props.backgroundStyles,
          ]}
        ></View>
        <View style={{ position: "absolute", left: 10 }}>
          <Emoji
            style={{}}
            name={props.settingName}
            fontSize={25}
            symbol={props.settingIcon}
          ></Emoji>
        </View>
        <Text
          style={{
            position: "absolute",
            left: 60,
            fontSize: 17,
            fontFamily: "SSP-SemiBold",
          }}
        >
          {props.settingName}
        </Text>
        {props.rightSideText}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsCard;

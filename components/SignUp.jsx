import React from "react";
import { View, StyleSheet, Dimensions, Text, TextInput } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SignUp = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        // height: screenHeight,
        // width: screenWidth,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: props.visible ? 1 : -1,
      }}
    >
      <Text
        onPress={() => {
          props.toggleSignUp();
        }}
        style={{
          textAlign: "right",
          color: "black",
          right: 40,
          top: 20,
          fontSize: 30,
        }}
      >
        x
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "relative",
            width: "70%",
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
          }}
        >
          <Text style={{}}>Email:</Text>
          <TextInput
            placeholder="example@email.com"
            style={{
              position: "relative",
              borderBottomWidth: 1,
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 10,
            }}
            // value={}
            // onChangeText={}
            placeholderTextColor={"gray"}
          />
          <Text>Password:</Text>
          <TextInput
            placeholder="Password"
            style={{
              position: "relative",
              borderBottomWidth: 1,
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            // onChangeText={}
            placeholderTextColor={"gray"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUp;

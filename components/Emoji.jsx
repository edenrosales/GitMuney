import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Emoji = (props) => {
  // debugger;
  return (
    <Text
      aria-label={props.name}
      accessibilityRole="image"
      style={[{ fontSize: props.fontSize }, props.style]}
    >
      {props.symbol}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default Emoji;

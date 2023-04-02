import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Emoji = (props) => {
  // debugger;
  return (
    <Text
      aria-label={props.name}
      accessibilityRole="image"
      style={{ fontSize: 40 }}
    >
      {props.symbol}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default Emoji;

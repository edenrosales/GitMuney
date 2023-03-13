import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ShowMore = (props) => {
  return props.more ? (
    <Text
      style={{
        color: "white",
        fontSize: 15,
        paddingVertical: 10,
        paddingLeft: 10,
      }}
    >
      Show more...
    </Text>
  ) : (
    <Text
      style={{
        color: "white",
        fontSize: 15,
        paddingVertical: 10,
        paddingLeft: 10,
      }}
    >
      Show more...
    </Text>
  );
};

const styles = StyleSheet.create({});

export default ShowMore;

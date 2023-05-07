import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Emoji from "./Emoji";

const NewCategoryCard = (props) => {
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
        onPress={() => {
          // debugger;
          props.handleCategorySelect(props.categoryName);
          props.toggleTransactionsList();
        }}
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
              width:
                String((props.categoryAmount / props.totalSpent) * 100) + "%",
            },
            props.loadingStyle,
          ]}
        ></View>
        <View style={{ position: "absolute", left: 10 }}>
          <Emoji
            style={{}}
            name={props.categoryName}
            fontSize={25}
            symbol={props.categoryIcon}
          ></Emoji>
        </View>
        <Text
          style={{
            position: "absolute",
            left: 60,
            fontSize: 14.5,
            fontFamily: "SSP-Regular",
          }}
        >
          {props.categoryName}
        </Text>
        {props.categoryAmount < 0 ? (
          <>
            <Text
              style={{
                position: "absolute",
                right: 10,
                color: "darkgreen",
              }}
            >
              +${-props.categoryAmount.toFixed(2)}
            </Text>
          </>
        ) : (
          <>
            <Text style={{ position: "absolute", right: 10 }}>
              ${props.categoryAmount.toFixed(2)}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewCategoryCard;

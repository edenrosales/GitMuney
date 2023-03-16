import React, { Component, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Progress from "react-native-progress";
import TransactionModal from "./TransactionModal";
// import {styles} from 'C:\Users\eden\React Native\FinanceTracker\components\styles.jsx'

const TopBarStats = (props) => {
  return (
    <View style={styles.titleContainer}>
      <View style={{ marginLeft: 20 }}>
        <Text>
          <Text style={styles.title}>
            $
            {(
              Math.round((props.myBudget - props.totalSpent) * 100) / 100
            ).toFixed(2)}
          </Text>
          <Text style={{ fontSize: 40, color: "white" }}> Left</Text>
        </Text>
        <Text style={{ color: "white", paddingBottom: 10 }}>
          Month Started With: ${props.myBudget}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Progress.Bar
          style={{ display: "flex" }}
          progress={(props.myBudget - props.totalSpent) / props.myBudget}
          width={props.pixel80percent}
          borderRadius={10}
          height={20}
          color={"#414141"}
          unfilledColor={"#d9d9d9"}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {props.children}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TopBar: {
    position: "absolute",
    backgroundColor: "#2C2E31",
    height: "60%",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  StatusBar: {
    position: "absolute",
    backgroundColor: "#252628",
    height: "9%",
  },
  titleContainer: {
    backgroundColor: "#2d2e30",
    flex: 0,
    // height: "40%",
    // width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    // paddingLeft: 20,
    paddingTop: 5,
  },
  title: {
    fontSize: 60,
    color: "white",
  },
});
export default TopBarStats;

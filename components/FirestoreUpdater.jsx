import React, { useEffect, useState, useReducer } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import Categories from "./Categories";

const FirestoreUpdater = () => {
  firestore()
    .collection("users")
    .doc("n2sgi9dxZtMEUi9Df3Xny3kTjYp2")
    .update({
      sortCategories: [
        {
          categoryIcon: "💸",
          categoryName: "Bills",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
        {
          categoryIcon: "🎭",
          categoryName: "Entertainment",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
        {
          categoryIcon: "🥫",
          categoryName: "Groceries",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
        {
          categoryIcon: "📈",
          categoryName: "Investing",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
        {
          categoryIcon: "🎲",
          categoryName: "Misc",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
        {
          categoryIcon: "🏠",
          categoryName: "Rent",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
        {
          categoryIcon: "🏛️",
          categoryName: "Taxes",
          categoryBackgroundColor: "blue",
          categoryTextColor: "black",
        },
      ],
    });

  //   firestore()
  //     .collection("users")
  //     .doc("n2sgi9dxZtMEUi9Df3Xny3kTjYp2")
  //     .collection("transactions")
  //     .add({
  //       categoryName: "Misc",
  //       categoryIcon: "🎲",
  //       categoryBackgroundColor: "blue",
  //       categoryTextColor: "black",
  //       cost: 1000,
  //       date: new Date(2023, 2, 1),
  //       excluded: false,
  //       isWithdrawl: true,
  //       pendingSort: false,
  //       transactionName: "iPhone",
  //     });
  return (
    <View style={{ height: "100%", width: "100%" }}>
      {/* <TextInput></TextInput> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FirestoreUpdater;

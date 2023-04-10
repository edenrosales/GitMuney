import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text, FlatList } from "react-native";
import Emoji from "./Emoji";
// import {}

// import Modal from "react-native-modal";
import { useTotalSpent } from "./ContextProvider";

const TransactionsList = (props) => {
  const [loading, setLoading] = useState(true);
  //   const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState();
  const [transactions, setTransactions] = useState();
  //   const [visible, setVisible]
  useEffect(() => {
    console.log(props.listInfo.category);
    setCategory(props.listInfo.category);
  }, [props.listInfo.category]);
  useEffect(() => {
    setTransactions(props.listInfo.transactions);
  }, [props.listInfo.transactions]);
  useEffect(() => {
    // debugger;
    setLoading(() => {
      if (category !== undefined && transactions !== undefined) {
        return false;
      }
      return true;
    });
  }, [category, transactions]);
  if (loading) {
    return <></>;
  }
  return (
    <>
      <Pressable
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "black",
          opacity: 0.2,
          zIndex: props.isVisible ? 2 : 0,
        }}
        onPress={() => {
          props.toggleVisible();
        }}
      ></Pressable>
      <View
        style={{
          height: "95%",
          width: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: "absolute",
          backgroundColor: "white",
          zIndex: props.isVisible ? 3 : 0,
          bottom: 0,
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Emoji
          style={{ marginTop: 20 }}
          fontSize={55}
          name={category.categoryName}
          symbol={category.categoryIcon}
        ></Emoji>
        <Text style={{ fontSize: 35, fontFamily: "SSP-Bold", marginTop: 10 }}>
          ${props.listInfo.category.total}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SSP-SemiBold",
            marginTop: 5,
            color: "gray",
          }}
        >
          {props.listInfo.category.categoryName}
        </Text>
        <FlatList
          style={{
            height: "100%",
            width: "100%",
            // zIndex: 5,
            // backgroundColor: "black",
          }}
          data={Object.values(props.listInfo.transactions)}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  height: 50,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  //   backgroundColor: "black",
                }}
              >
                <View
                  style={{
                    // height: 50,
                    height: "100%",
                    width: "95%",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <Emoji
                    name={item.categoryName}
                    symbol={item.categoryIcon}
                    fontSize={20}
                    style={{ margin: 5, marginRight: 15 }}
                  ></Emoji>
                  {/* <View
                    style={{
                      backgroundColor: item.categoryBackgroundColor,
                      aspectRatio: 1,
                    //   borderRadius: 
                    }}
                  >
                  </View> */}
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 15, fontFamily: "SSP-SemiBold" }}>
                      {item.transactionName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "SSP-Regular",
                        color: "gray",
                      }}
                    >
                      {item.date.toDate().toDateString()}
                    </Text>
                  </View>
                  <Text
                    style={{
                      position: "absolute",
                      right: 25,
                      fontFamily: "SSP-SemiBold",
                      fontSize: 17,
                    }}
                  >
                    ${item.cost}
                  </Text>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default TransactionsList;

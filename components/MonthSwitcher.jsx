import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Emoji from "./Emoji";
import { Entypo } from "@expo/vector-icons";
import { useDateDispatch, useDate } from "./ContextProvider";

const MonthSwitcher = (props) => {
  // const useDateDispatch = useRef(useDateDispatch());
  const dateDispatcherContext = useDateDispatch();
  const dateContext = useDate();
  const [date, setDate] = useState();
  useEffect(() => {
    // console.log("This is the date: " + dateContext);
    setDate(dateContext);
  }, [dateContext]);
  const [dateDispatcher, setDateDispatcher] = useState();
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (dateDispatcherContext !== undefined) {
  //     // debugger;
  //     console.log(dateDispatcherContext);
  //     // setDateDispatcher(dateDispatcherContext);
  //   }
  // }, [dateDispatcherContext]);

  useEffect(() => {
    setLoading(() => {
      if (date !== undefined) {
        return false;
      }
      return true;
    });
  }, [date]);

  if (loading) {
    return <></>;
  }
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: 50,
        // height: "12%",
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          overflow: "hidden",
          width: "93%",
          //   backgroundColor: "gray",
          //   opacity: 0.15,
          height: "90%",
          borderRadius: 15,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "gray",
            opacity: 0.15,
          }}
        ></View>
        <Pressable
          style={{ left: 10 }}
          onPress={() => {
            // console.log("this ran");
            dateDispatcherContext({ type: "Decrease Month" });
          }}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={{ fontFamily: "SSP-SemiBold", fontSize: 15 }}>
          {date.toLocaleString("default", { month: "long" })}
        </Text>
        <Pressable
          style={{ right: 10 }}
          onPress={() => {
            dateDispatcherContext({ type: "Increase Month" });
          }}
        >
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MonthSwitcher;

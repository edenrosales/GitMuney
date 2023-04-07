import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SectionList,
  useWindowDimensions,
} from "react-native";
import {
  usePendingSort,
  useExcluded,
  useCategories,
} from "../components/ContextProvider";
import _, { isEmpty } from "lodash";
import Categories from "../components/Categories";
import TransactionModalComponent from "../components/TransactionModalComponent";
import { Directions, FlatList } from "react-native-gesture-handler";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  runOnJS,
  useDerivedValue,
  runOnUI,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const SortCard = (props) => {
  const excludeWrapper = () => {
    console.log("this works!");
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .doc(props.transaction.key)
      .update({
        excluded: true,
      });
  };
  const { width, height } = useWindowDimensions();
  const position = useSharedValue({ x: 0, y: 0 });
  // const leftActive = useSharedValue(false)
  const xPos = useSharedValue(0);
  const yPos = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });
  const leftActive = useSharedValue(false);
  const rightActive = useSharedValue(false);
  const panActive = useSharedValue(true);
  const excludeTransaction = useSharedValue(false);
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      leftActive.value = false;
      rightActive.value = false;
      panActive.value = true;
    })
    .onUpdate((event) => {
      if (panActive.value) {
        if (event.translationX <= props.leftTranslation) {
          leftActive.value = true;
          // console.log("this is happening");
          console.log(event.translationX + "   :    " + props.leftTranslation);
        } else if (event.translationX >= props.rightTranslation) {
          rightActive.value = true;
          console.log(event.translationX + " : " + props.rightTranslation);
        } else if (
          event.translationY >= props.downTranslation ||
          event.translationY <= props.upTranslation
        ) {
          // console.log(event.absoluteY + " !:! " + props.downTranslation);
          // console.log("this working");
          panActive.value = false;
        } else {
          // console.log(event.translationY + " !:! " + props.downTranslation);
          leftActive.value = false;
          rightActive.value = false;
        }
        xPos.value = withSpring(event.translationX + context.value.x);
        yPos.value = withSpring(event.translationY + context.value.y);
      } else {
        xPos.value = withSpring(0);
        yPos.value = withSpring(0);
      }
    })
    .onEnd(() => {
      xPos.value = withSpring(0);
      yPos.value = withSpring(0);
      if (leftActive.value) {
        rightActive.value = false;
        leftActive.value = false;
        xPos.value = withSpring(-width);
        excludeTransaction.value = true;
      }
      if (rightActive.value) {
        rightActive.value = false;
        leftActive.value = false;
        xPos.value = withSpring(width);
        excludeTransaction.value = true;
      }
      if (excludeTransaction.value) {
        console.log("transaction excluded");
        excludeTransaction.value = false;
        // exclude.value();
        runOnJS(excludeWrapper)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: xPos.value }, { translateY: yPos.value }],
  }));

  return (
    <View style={{ position: "absolute" }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle, {}]}>
          <>
            <View
              style={{
                height: 250,
                width: 250,
                aspectRatio: 1,
                backgroundColor: "#eef2f5",
                // backgroundColor: "transparent",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "black",
              }}
            >
              <>
                <Text>Icon</Text>
                <Text style={{ fontFamily: "SSP-Regular", fontSize: 20 }}>
                  {props.transaction.transactionName}
                </Text>
                <Text
                  style={{ fontFamily: "SSP-Bold", fontSize: 70 }}
                  // allowFontScaling={true}
                >
                  ${props.transaction.cost}
                </Text>
                <Text
                  style={{
                    fontFamily: "SSP-Regular",
                    color: "gray",
                  }}
                >
                  {props.transaction.date &&
                    props.transaction.date.toDate().toDateString()}
                </Text>
              </>
            </View>
          </>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SortCard;

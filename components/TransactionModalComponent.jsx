import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import _ from "lodash";
import Emoji from "./Emoji";
import { debug } from "react-native-reanimated";
import { useExcluded } from "./ContextProvider";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TransactionModalComponent = (props) => {
  const [transactionSelected, setTransactionSelected] = useState(undefined);
  const [category, setCategories] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTransactionSelected(props.transaction);
  }, [props.transaction]);

  useEffect(() => {
    setCategories(props.category);
  }, [props.category]);

  useEffect(() => {
    setLoading(() => {
      if (transactionSelected !== undefined && category !== undefined) {
        return false;
      } else {
        return true;
      }
    });
  }, [transactionSelected, category]);
  // debugger;
  if (loading) {
    return <></>;
  }
  return (
    <>
      <View style={{}}>
        <Modal
          // onSwipeComplete={() => {
          //   props.toggleVisible();
          // }}
          isVisible={props.visible}
          onBackdropPress={() => {
            props.toggleVisible();
          }}
          avoidKeyboard={false}
          statusBarTranslucent={true}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 25,
              width: "95%",
              height: "45%",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              padding: 10,
            }}
          >
            <View
              style={{
                flex: 1.5,
                borderRadius: 25,
                backgroundColor: "#eef2f5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Emoji
                fontSize={40}
                name={props.category.key}
                symbol={props.category.icon}
              ></Emoji>
              <Text style={{ fontFamily: "SSP-Regular", fontSize: 15 }}>
                {props.category.key}
              </Text>

              <Text
                style={{ fontFamily: "SSP-Bold", fontSize: 70 }}
                // allowFontScaling={true}
              >
                ${transactionSelected.cost}
              </Text>
              <Text style={{ fontFamily: "SSP-SemiBold", fontSize: 20 }}>
                {transactionSelected.transactionName}
              </Text>
              <Text
                style={{
                  fontFamily: "SSP-Regular",
                  color: "gray",
                }}
              >
                {transactionSelected.date &&
                  transactionSelected.date.toDate().toDateString()}
              </Text>
            </View>
            <View
              style={{
                flex: 0.33,
                display: "flex",
                flexDirection: "column",
                marginTop: 10,
                // padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // padding: 5,
                }}
              >
                <Pressable
                  style={{
                    flex: 1,
                    backgroundColor: "#eef2f5",
                    margin: 5,
                    // aspectRatio: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    firestore()
                      .collection("users")
                      .doc(auth().currentUser.uid)
                      .collection("transactions")
                      .doc(transactionSelected.key)
                      .update({
                        pendingSort: true,
                      });
                    props.toggleVisible();
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Re-sort</Text>
                </Pressable>
                {/* <View style={{ flex: 1 }}>
                  <Text>This works</Text>
                </View> */}
                {/* <Pressable
                  style={{
                    flex: 1,
                    backgroundColor: "#eef2f5",
                    margin: 5,
                    aspectRatio: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Exclude</Text>
                </Pressable> */}
                {/* <Pressable
                  style={{
                    flex: 1,
                    backgroundColor: "#eef2f5",
                    margin: 5,
                    aspectRatio: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    console.log("right");
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Exclude</Text>
                </Pressable> */}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default TransactionModalComponent;

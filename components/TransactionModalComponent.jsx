import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import _ from "lodash";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TransactionModalComponent = (props) => {
  const [transactionSelected, setTransactionSelected] = useState({});
  useEffect(() => {
    setTransactionSelected(props.transaction);
  }, [props.transaction]);
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
              height: "55%",
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
            </View>
            <View
              style={{
                flex: 0.5,
                display: "flex",
                flexDirection: "column",
                padding: 10,
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
                    aspectRatio: 1,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    console.log("left");
                  }}
                >
                  <Text style={{ textAlign: "center" }}>Re-sort</Text>
                </Pressable>
                <View style={{ flex: 1 }}></View>
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
                <Pressable
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
                </Pressable>
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

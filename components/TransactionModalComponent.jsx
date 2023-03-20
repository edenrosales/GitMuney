import React from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import Modal from "react-native-modal";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TransactionModalComponent = (props) => {
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
                Transaction Name
              </Text>
              <Text
                style={{ fontFamily: "SSP-Bold", fontSize: 70 }}
                // allowFontScaling={true}
              >
                $56.12
              </Text>
              <Text
                style={{
                  fontFamily: "SSP-Regular",
                  color: "gray",
                }}
              >
                Wed Mar 15 2023
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
              {/* <View
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  // padding: 5,
                }}
              >
                <Pressable
                  style={{
                    flex: 1,
                    backgroundColor: "black",
                    margin: 5,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                ></Pressable>
                <Pressable
                  style={{
                    flex: 1,
                    backgroundColor: "black",
                    margin: 5,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                ></Pressable>
                <Pressable
                  style={{
                    flex: 1,
                    backgroundColor: "black",
                    margin: 5,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                ></Pressable>
              </View> */}
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

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import Modal from "react-native-modal";
import DatePicker from "react-native-date-picker";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const AddTransactionModal = (props) => {
  const [editDateVisible, setEditDateVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [transactionName, setTransactionName] = useState("");
  const [transactionCost, setTransactionCost] = useState("");
  const [formComplete, setFormComplete] = useState(false);
  const [isWithdrawl, setIsWithdrawl] = useState(true);
  useEffect(() => {
    setFormComplete(() => {
      if (transactionName.length >= 1 && transactionCost.length >= 1) {
        return true;
      } else {
        return false;
      }
    });
  }, [transactionName, transactionCost]);
  const handleFormSubmit = () => {
    if (formComplete) {
      // const returning = {
      //   categoryBackgroundColor: "gray",
      //   categoryIcon: "❔",
      //   categoryName: "None",
      //   categoryTextColor: "gray",
      //   cost: parseFloat(transactionCost),
      //   date: date,
      //   excluded: false,
      //   isWithdrawl: isWithdrawl,
      //   pendingSort: true,
      //   transactionName: transactionName,
      // };
      // console.log(returning);

      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("transactions")
        .add({
          categoryBackgroundColor: "gray",
          categoryIcon: "❔",
          categoryName: "None",
          categoryTextColor: "gray",
          cost: parseFloat(transactionCost),
          date: date,
          excluded: false,
          isWithdrawl: isWithdrawl,
          pendingSort: true,
          transactionName: transactionName,
        })
        .then(() => {
          setTransactionName("");
          setTransactionCost("");
          setDate(new Date());
          setIsWithdrawl(true);
        });

      props.toggleVisible();
    } else {
      return;
    }
  };
  return (
    <>
      <DatePicker
        modal
        mode={"date"}
        open={editDateVisible}
        date={date}
        onConfirm={(newDate) => {
          setDate(newDate);
          setEditDateVisible(false);
        }}
        onCancel={() => {
          setEditDateVisible(false);
        }}
        style={{
          zIndex: 100,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></DatePicker>
      <Modal
        isVisible={props.isVisible}
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
            // alignItems: "center"
            zIndex: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                height: "10%",
                fontFamily: "SSP-SemiBold",
                textAlign: "center",
                fontSize: 20,
                marginTop: 10,
              }}
            >
              Add Transaction
            </Text>
            <View
              style={{
                height: "90%",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TextInput
                placeholder="Transaction Name"
                style={{
                  flex: 0.33,
                  position: "relative",
                  borderBottomWidth: 1.5,

                  width: "75%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderColor: "gray",
                  fontFamily: "SSP-SemiBold",
                  padding: 0,
                  // margin: 10,
                }}
                value={transactionName}
                onChangeText={(text) => {
                  setTransactionName(text);
                }}
                placeholderTextColor={"gray"}
              />
              <TextInput
                placeholder="Cost"
                style={{
                  flex: 0.33,
                  margin: 10,
                  position: "relative",
                  borderBottomWidth: 1.5,
                  width: "75%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderColor: "gray",
                  fontFamily: "SSP-SemiBold",
                  padding: 0,
                }}
                value={transactionCost}
                onChangeText={(text) => {
                  if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                    setTransactionCost(text);
                  }
                }}
                inputMode={"numeric"}
                placeholderTextColor={"gray"}
              />
              <Pressable
                onPress={() => {
                  setEditDateVisible(true);
                }}
                style={{ flex: 0.33 }}
              >
                <Text
                  style={{
                    fontFamily: "SSP-Regular",
                    fontSize: 16,
                    // margin: ,
                  }}
                >
                  {date.toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </Pressable>
              <View
                style={{
                  flex: 0.25,
                  width: "85%",
                  margin: 10,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setIsWithdrawl(true);
                    }}
                    style={{
                      borderRadius: 2,
                      flex: 1,
                      // height: "100%",
                      // width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      backgroundColor: isWithdrawl ? "black" : "white",
                    }}
                  >
                    <Text style={{ color: isWithdrawl ? "white" : "black" }}>
                      Withdrawl
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setIsWithdrawl(false);
                    }}
                    style={{
                      borderRadius: 2,
                      flex: 1,
                      // height: "100%",
                      // width: "100%",
                      backgroundColor: isWithdrawl ? "white" : "black",

                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ color: isWithdrawl ? "black" : "white" }}>
                      Deposit
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  flex: 0.25,
                  // backgroundColor: "black",
                  flexDirection: "row",
                  // height: "12.5%",
                  // gap: 25,
                  height: "100%",
                  width: "85%",
                }}
              >
                <View style={{ height: "100%", width: "100%" }}>
                  <Pressable
                    onPress={() => {
                      handleFormSubmit();
                    }}
                    Pressable
                    style={{
                      // bottom: -15,
                      borderRadius: 2,
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ fontFamily: "SSP-Regular" }}>Submit</Text>
                  </Pressable>
                </View>
                {/* <View style={{ flex: 1 }}>
                  <Pressable
                    onPress={() => {
                      props.toggleVisible();
                    }}
                    style={{
                      bottom: -15,
                      borderRadius: 2,
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ fontFamily: "SSP-Regular" }}>Cancel</Text>
                  </Pressable>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({});

export default AddTransactionModal;

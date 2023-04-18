import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
import _ from "lodash";
import Emoji from "./Emoji";
import { debug } from "react-native-reanimated";
import { useExcluded } from "./ContextProvider";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import Dialog from "react-native-dialog";
import DatePicker from "react-native-date-picker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const TransactionModalComponent = (props) => {
  // const [transactionDate, setTransactionDate] = useState(new Date())
  const [editDateVisible, setEditDateVisible] = useState(false);
  const [editAmountVisible, setEditAmountVisible] = useState(false);
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [transactionSelected, setTransactionSelected] = useState(undefined);
  const [category, setCategories] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTransactionSelected(props.transaction);
  }, [props.transaction]);
  // useEffect(() => {
  //   if (transactionSelected !== undefined) {
  //     setTransactionDate(net Date(transactionSelected.date.toDate()))
  //   }
  // }, [transactionSelected]);
  useEffect(() => {
    setCategories(props.category);
  }, [props.category]);

  useEffect(() => {
    // debugger;
    setLoading(() => {
      if (transactionSelected !== undefined && category !== undefined) {
        return false;
      } else {
        return true;
      }
    });
  }, [transactionSelected, category]);
  const handleEditDateSubmit = (date) => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .doc(transactionSelected.key)
      .update({
        date: date,
      })
      .then(() => {
        setEditDateVisible(false);
      });
    // setEditDateVisible(false);
  };
  const handleEditNameSubmit = () => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .doc(transactionSelected.key)
      .update({
        transactionName: editName,
      })
      .then(() => {
        setEditName("");
        setEditNameVisible(false);
      });
  };

  const handleEditAmountSubmit = () => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .doc(transactionSelected.key)
      .update({
        cost: parseFloat(editAmount),
      })
      .then(() => {
        setEditAmount("");
        setEditAmountVisible(false);
      });
  };
  if (loading) {
    return <></>;
  }

  return (
    <>
      <View style={{}}>
        <DatePicker
          modal
          open={editDateVisible}
          date={transactionSelected.date.toDate()}
          onConfirm={(date) => {
            handleEditDateSubmit(date);
          }}
          onCancel={() => {
            setEditDateVisible(false);
          }}
          style={{
            zIndex: 100,
            position: "absolute",
            top: 0,
            left: 0,
            // height: "100%",
            // width: "100%",
          }}
        ></DatePicker>
        <Dialog.Container visible={editNameVisible}>
          <Dialog.Title>Edit Name</Dialog.Title>
          <Dialog.Input
            onChangeText={(text) => {
              setEditName(text);
            }}
            value={editName}
          ></Dialog.Input>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setEditName("");
              setEditNameVisible(false);
            }}
          ></Dialog.Button>
          <Dialog.Button
            label="Submit"
            onPress={() => {
              handleEditNameSubmit();
            }}
          ></Dialog.Button>
        </Dialog.Container>

        <Dialog.Container visible={editAmountVisible}>
          <Dialog.Title>Edit Amount</Dialog.Title>
          <Dialog.Input
            value={editAmount}
            onChangeText={(text) => {
              if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                setEditAmount(text);
              }
            }}
            inputMode={"numeric"}
            placeholderTextColor={"gray"}
            // style={styles.input}
            placeholder="e.g $13.45"
          ></Dialog.Input>
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setEditAmount("");
              setEditAmountVisible(false);
            }}
          ></Dialog.Button>
          <Dialog.Button
            label="Submit"
            onPress={() => {
              handleEditAmountSubmit();
            }}
          ></Dialog.Button>
        </Dialog.Container>
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
            // zIndex: ,
          }}
        >
          <MenuProvider
            skipInstanceCheck
            style={{
              // position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "black",
              // zIndex: -100,
            }}
          >
            <Pressable
              onPress={() => {
                props.toggleVisible();
              }}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
              }}
            ></Pressable>

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
                {category.categoryName !== "Excluded" && (
                  <Menu style={{ position: "absolute", right: 10, top: 5 }}>
                    <MenuTrigger>
                      <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={24}
                        color="black"
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption
                        onSelect={() => {
                          setEditDateVisible(true);
                          console.log(editDateVisible);
                        }}
                        text="Change Date"
                      />
                      <MenuOption
                        onSelect={() => setEditNameVisible(true)}
                        text="Edit Name"
                      ></MenuOption>
                      <MenuOption
                        onSelect={() => setEditAmountVisible(true)}
                        text="Edit Amount"
                      />
                      <MenuOption
                        onSelect={() => {
                          firestore()
                            .collection("users")
                            .doc(auth().currentUser.uid)
                            .collection("transactions")
                            .doc(transactionSelected.key)
                            .update({
                              excluded: true,
                            });
                        }}
                        text="Exclude"
                      />
                    </MenuOptions>
                  </Menu>
                )}

                {/* <Pressable
                  style={{ position: "absolute", right: 10, top: 5 }}
                  onPress={() => {}}
                >
                  <MaterialCommunityIcons
                    // style={{ justifyContent: "flex-end" }}
                    name="dots-horizontal"
                    size={24}
                    color="black"
                  />
                </Pressable> */}

                <Emoji
                  fontSize={40}
                  name={category.categoryName}
                  symbol={category.categoryIcon}
                ></Emoji>
                <Text style={{ fontFamily: "SSP-Regular", fontSize: 15 }}>
                  {category.categoryName}
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
                  {category.categoryName !== "Excluded" ? (
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
                  ) : (
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
                            excluded: false,
                          });
                        props.toggleVisible();
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>Un-Exclude</Text>
                    </Pressable>
                  )}
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
          </MenuProvider>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default TransactionModalComponent;

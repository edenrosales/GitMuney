import "react-native-gesture-handler";
import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Input,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  SectionList,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import TopBarStats from "../components/TopBarStats";
import Categories from "../components/Categories";
import { useFB } from "../components/ContextProvider";
import { HeaderBackButton } from "@react-navigation/elements";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Progress from "react-native-progress";
import { Picker } from "@react-native-picker/picker";
import _ from "lodash";
import ShowMore from "../components/ShowMore";
import TransactionModalComponent from "../components/TransactionModalComponent";
import TransactionModal from "../components/TransactionModal";
import DepositModal from "../components/DepositModal";
import BudgetModal from "../components/BudgetModal";

export default function ViewAccountScreen({ route, navigation }) {
  const handleBack = async () => {
    //make this function limited to 5 seconds
    // await GoogleSignin.revokeAccess(0)
    await signOut();
    navigation.navigate("Home");
    // auth()
    //   .signOut()
    //   .then(()=> {
    //     navigation.navigate("Home").
    //   })
  };

  const signOut = async () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
      });
    if (await GoogleSignin.isSignedIn()) {
      await GoogleSignin.revokeAccess().catch((err) => console.log(err));
      await GoogleSignin.signOut().catch((err) => console.log(err));
      console.log("signed out");
    }
  };

  const [totalSpent, setTotalSpent] = useState(0);

  const [categories, setCategories] = useState({});

  const [myBudget, setMyBudget] = useState(5000);

  const [expenses, setExpenses] = useState({});

  const [more, setMore] = useState(false);

  // const [pickerValue, setPickerValue] = useState("Select a Value");

  const [
    transactionModalComponentVisible,
    setTransactionModalComponentVisible,
  ] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderBackButton
            style={{ tontColor: "#746961", marginLeft: 0 }}
            onPress={() => handleBack()}
          />
        );
      },
    });
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .orderBy("date", "desc")
      .onSnapshot(
        (result) => {
          let currentSpent = 0;
          const transactions = {};
          const newCategories = {};
          result.forEach((transaction) => {
            const data = transaction.data();
            currentSpent += data.cost;
            transactions[transaction.id] = {
              ...data,
              key: transaction.id,
            };
            if (!(data.category in newCategories)) {
              newCategories[data.category] = {
                key: data.category,
                total: data.cost,
              };
            } else {
              newCategories[data.category].total += data.cost;
            }
          });
          setExpenses(() => {
            console.log("expenses updated");
            return { ...transactions };
          });
          setCategories((previousCategories) => {
            //i didnt know you could do this in js
            //makes a new object and replaces all the keys that are identical in the first and second with the latter most object
            return { ...previousCategories, ...newCategories };
          });
          setTotalSpent(currentSpent);
        },
        (err) => {
          console.log("error here1");
          console.log(err);
        }
      );
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .onSnapshot(
        (documentSnapshot) => {
          const data = documentSnapshot.data();
          const categories = {};
          data.categories.forEach((category) => {
            categories[category] = {
              key: category,
              total: 0,
            };
          });

          setCategories((prev) => {
            return { ...categories, ...prev };
          });
          setMyBudget(data.budget);
        },
        (err) => {
          console.log("error here2");
          console.log(err);
        }
      );
    return () => subscriber();
  }, []);

  useEffect(() => {
    console.log("categories!!!");
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    console.log("EXPENSES");
    console.log(expenses);
  }, [expenses]);

  const handleMore = () => {
    setMore((prev) => !prev);
  };

  const handleBudgetModal = () =>
    setIsBudgetModalVisible(() => !isBudgetModalVisible);

  const screenWidth = Dimensions.get("window").width;
  // console.log(screenWidth)
  const pixel80percent = (screenWidth / 100) * 90;
  return (
    //going to try to get state to work here and get it into components
    <View style={styles.container}>
      <TransactionModalComponent
        viComponentsible={transactionModalComponentVisible}
        toggleVisible={setTransactionModalComponentVisible}
      ></TransactionModalComponent>
      <StatusBar barStyle="light-content" />

      <View styles={{ flex: 1 }}>
        <SectionList
          ListHeaderComponent={() => {
            return (
              <TopBarStats
                myBudget={myBudget}
                totalSpent={totalSpent}
                pixel80percent={pixel80percent}
              >
                <TransactionModal categories={categories}></TransactionModal>
                <DepositModal></DepositModal>
                <BudgetModal></BudgetModal>
              </TopBarStats>
            );
          }}
          keyExtractor={(item, itemIndex) => item.key}
          sections={[
            {
              title: "categories",
              data: more
                ? Object.values(categories)
                : Object.values(categories).length > 3
                ? Object.values(categories).slice(0, 3)
                : Object.values(categories),
              renderItem: ({ item }) => {
                return (
                  <View style={{}}>
                    <Text style={[styles.recTran, { marginTop: 10 }]}>
                      {item.key}
                    </Text>
                    {/* <TouchableOpacity></TouchableOpacity> */}
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Progress.Bar
                        progress={item.total / myBudget}
                        width={pixel80percent}
                        borderRadius={10}
                        height={20}
                        color={"tomato"}
                        unfilledColor={"#d9d9d9"}
                        borderWidth={0}
                      />
                    </View>
                  </View>
                );
              },
              //adding the keyextractors causes issues i guess
            },
            {
              title: "expenses",
              data: Object.values(expenses),
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setTransactionModalComponentVisible((prev) => !prev);
                  }}
                >
                  <View style={styles.topGroup}>
                    {/* {console.log("HELP ME IM GOING TO KMS ")}
                  {console.log(item)} */}
                    <View style={styles.tranGroup}>
                      <Text style={styles.item}>
                        {item.transactionName
                          ? item.transactionName
                          : "Deposit"}
                      </Text>
                      <Text
                        style={[
                          styles.item,
                          {
                            color:
                              item.isWithdrawl == true
                                ? "tomato"
                                : "greenyellow",
                          },
                        ]}
                      >
                        ${item.cost}
                      </Text>
                    </View>
                    <Text
                      style={{ color: "#999", fontSize: 20, paddingLeft: 10 }}
                    >
                      {item.hasOwnProperty("date") &&
                        item.date.toDate().toDateString()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            },
          ]}
          renderSectionFooter={({ section: { title } }) => {
            if (title == "categories") {
              return (
                <View>
                  <TouchableOpacity onPress={handleMore}>
                    <ShowMore more={more}></ShowMore>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return null;
            }
          }}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <View
                style={{
                  paddingTop: 10,
                }}
              >
                <Text style={{ fontSize: 35, color: "white" }}>
                  {title == "categories" ? "Categories" : "Transactions"}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    color: "white",
  },
  titleContainer: {
    backgroundColor: "#2d2e30",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    // paddingLeft: 20,
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#45494f",
  },
  categories: {
    padding: 10,
  },
  item: {
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 20,
    color: "white",
  },
  fStyle: {
    flex: 1,
    marginBottom: 40,
  },
  recTran: {
    color: "white",
    fontSize: 25,
  },
  topGroup: {
    borderColor: "black",
    borderTopWidth: 0.7,
    paddingBottom: 10,
  },
  tranGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewable: {
    borderRadius: 10,
    width: "100%",
    height: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2d2e30",
  },
  modalTitle: {
    fontSize: 30,
    color: "white",
  },
  modalText: {
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    color: "white",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

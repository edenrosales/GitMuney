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
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Progress from "react-native-progress";
import { Picker } from "@react-native-picker/picker";

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

  const [testInfo, setTest] = useState();

  const [transactionInput, setTransactionInput] = useState(["", ""]);

  const [totalSpent, setTotalSpent] = useState(0);

  const [depositInput, setDepositInput] = useState("");

  const [categories, setCategories] = useState();

  const [categoriesSet, setCategoriesSet] = useState(new Set());

  const [myBudgetInput, setMyBudgetInput] = useState("");

  const [curKeyValue, setCurKeyValue] = useState();

  const [myBudget, setMyBudget] = useState(5000);

  const [expenses, setExpenses] = useState();

  const [isTraModalVisible, setIsTraModalVisible] = useState(false);

  const handleTraModal = () => setIsTraModalVisible(() => !isTraModalVisible);

  const [isDepModalVisible, setIsDepModalVisible] = useState(false);

  const handleDepModal = () => setIsDepModalVisible(() => !isDepModalVisible);

  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);

  const [more, setMore] = useState(false);

  const [pickerValue, setPickerValue] = useState("Select a Value");


  useEffect(() => {
    let newCategories = categories !== undefined ? categories : [];
    
    let transactions = [];
    let totalMoneySpentDuringPeriod = 0;
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .get()
      .then((result) => {
        // console.log("transactions loaded")
        result.forEach((document) => {
          let data = document.data();
          let id = document.id;
          // console.log(data);
          totalMoneySpentDuringPeriod += data.cost;
          let found = false;
          newCategories.forEach(( item ) => {
            if (item.name === data.category) {
              item = {
                ...item,
                total: item.total + data.cost,
              };
              found = true;
            }
          });
          if (!found) {
            newCategories.push({
              name: data.category,
              total: data.cost,
            });
          }
          transactions.push({
            ...data,
            id: id,
            date: data.date.toDate(),
          });
        });
      })
      .finally(() => {
        console.log("transactions resolved")
        setCategories((prev)=>{
          if(prev === undefined) {
            console.log("transactions is first implementation")
            return newCategories
          }
          console.log("transactions is second implementation")
          
          prev.forEach((previous)=>{
            let found = false; 
            newCategories.forEach((category)=>{
              if(category.name === previous.name){
                found = true; 
                
              }
              
            })
            if(found === false){
              newCategories.push(previous);
            }
          })
          return newCategories;
        });
        setExpenses(transactions);
        setTotalSpent(totalMoneySpentDuringPeriod);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let newCategories = categories !== undefined ? categories : [];
    firestore()
      .collection("users") 
      .doc(auth().currentUser.uid)
      .get()
      .then((result) => result.data())
      .then((result) => {
        setMyBudget(result.budget)
        // console.log("users loaded")
        result.categories.forEach((value) => {
          let found = false;
          // console.log(newCategories)
          newCategories.forEach((item ) => {
            if (item.name == value) {
              found = true;
              return;
            }
          });
          if (!found) {
            newCategories.push({
              name: value,
              total: 0,
            });
          }
        });
      })
      .finally(() => {
        console.log("users resolved")
        // console.log("inside of set function: " + newCategories)
        setCategories((prev)=>{
          if(prev === undefined){
            console.log("users is first implementation")
            return newCategories
          }
          newCategories.forEach((newItem)=>{
            
            prev.forEach((previousValue)=>{
              if(newItem.name === previousValue.name){
                console.log(previousValue); 
                newItem = previousValue;
              }
            })
            console.log(newCategories)
          })
          return newCategories
        })
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => {
  //       return (
  //         <HeaderBackButton
  //           style={{ tontColor: "#746961", marginLeft: 0 }}
  //           onPress={() => handleBack()}
  //         />
  //       );
  //     },
  //   });
  // }, []);


  
  useEffect(() => {
    console.log("====")
    console.log(categories);
  }, [categories]);
  
  const addTransaction = () => {
    expenses.unshift({
      title: transactionInput[0],
      amount: transactionInput[1],
      date: new Date().toLocaleString(),
      type: "p",
      key: curKeyValue,
    });
    setTotalSpent(totalSpent + parseFloat(transactionInput[1]));
    setCurKeyValue(uuid.v4());
    transactionInput[0] = "";
    transactionInput[1] = "";
  };

  const addDeposit = () => {
    expenses.unshift({
      title: "",
      amount: depositInput,
      date: new Date().toLocaleString(),
      type: "d",
      key: curKeyValue,
    });
    setTotalSpent(totalSpent - parseFloat(depositInput));
    setCurKeyValue(uuid.v4());
    setDepositInput("");
  };

  const addBudget = () => {
    setMyBudget(myBudgetInput);
    setMyBudgetInput(myBudget);
  };

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
      <StatusBar barStyle="light-content" />
      <Modal isVisible={isTraModalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalViewable}>
            <Text style={styles.modalTitle}>Add a Transaction</Text>
            <View>
              <Text style={styles.modalText}>Transaction Title</Text>
              <TextInput
                value={transactionInput[0]}
                onChangeText={(text) =>
                  setTransactionInput([text, transactionInput[1]])
                }
                placeholderTextColor={"gray"}
                style={styles.input}
                placeholder="e.g Turkey Sandwich"
              />
              <Text style={styles.modalText}>Transaction Amount</Text>
              <TextInput
                value={transactionInput[1]}
                onChangeText={(text) =>
                  setTransactionInput([transactionInput[0], text])
                }
                placeholderTextColor={"gray"}
                style={styles.input}
                placeholder="e.g $13.45"
              />
              <Text style={styles.modalText}>Category</Text>
              {/* {console.log(categories.map((values) => values.name))} */}

              {categories !== undefined ? (
                <Picker
                  selectedValue={pickerValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setPickerValue(itemValue)
                  }
                  style={{ color: "white" }}
                >
                  <Picker.Item
                    style={{ color: "black" }}
                    label="Select a Value"
                    value="Select a Value"
                    key="Select a Value"
                  ></Picker.Item>
                  {categories.map((values) => {
                    return (
                      <Picker.Item
                        style={{ color: "black" }}
                        label={values.name}
                        value={values.name}
                        key={values.name}
                      ></Picker.Item>
                    );
                  })}
                </Picker>
              ) : null}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Add"
                onPress={() => {
                  if (
                    transactionInput[0] == "" ||
                    transactionInput[1] == "" ||
                    pickerValue == "Select a Value"
                  ) {
                    console.log("Fill out the form completely");
                    return;
                  }
                  handleTraModal();
                  addTransaction();
                }}
              />
              <Button title="Cancel" onPress={handleTraModal} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isDepModalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalViewable}>
            <Text style={styles.modalTitle}>Make a Deposit</Text>
            <View>
              <Text style={styles.modalText}>Deposit Amount</Text>
              <TextInput
                value={depositInput}
                onChangeText={(text) => setDepositInput(text)}
                placeholderTextColor={"gray"}
                placeholder={"e.g $100"}
                style={styles.input}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Deposit"
                onPress={() => {
                  handleDepModal();
                  addDeposit();
                  save();
                }}
              />
              <Button title="Cancel" onPress={handleDepModal} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isBudgetModalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalViewable}>
            <Text style={styles.modalTitle}>Set a Budget</Text>
            <View>
              <Text style={styles.modalText}>Budget Amount</Text>
              <TextInput
                value={myBudgetInput}
                onChangeText={(text) => setMyBudgetInput(text)}
                placeholderTextColor={"gray"}
                placeholder={"e.g $100"}
                style={styles.input}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Set Budget"
                onPress={() => {
                  handleBudgetModal();
                  addBudget();
                  save();
                }}
              />
              <Button title="Cancel" onPress={handleBudgetModal} />
            </View>
          </View>
        </View>
      </Modal>

      <View styles={{ flex: 1 }}>
        <TopBarStats
          myBudget={myBudget}
          totalSpent={totalSpent}
          pixel80percent={pixel80percent}
          handleTraModal={handleTraModal}
          handleDepModal={handleDepModal}
          handleBudgetModal={handleBudgetModal}
        ></TopBarStats>
        {categories && expenses && (
          <SectionList
            ListHeaderComponent={() => {
              return (
                <TopBarStats
                  myBudget={myBudget}
                  totalSpent={totalSpent}
                  pixel80percent={pixel80percent}
                  handleTraModal={handleTraModal}
                  handleDepModal={handleDepModal}
                  handleBudgetModal={handleBudgetModal}
                ></TopBarStats>
              );
            }}
            sections={[
              {
                title: "categories",
                // data: categories,
                data: more ? categories : categories.length  >3 ? categories.slice(0,3): rcategories,
                renderItem: ({ item }) => {
                  return (
                    <View style={{}}>
                      <Text style={[styles.recTran, { marginTop: 10 }]}>
                        {item.name}
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
                data: expenses,
                renderItem: ({ item }) => (
                  // <Text>{item.transactionName}</Text>
                  <View style={styles.topGroup}>
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
                              item.isWithdrawl == "p"
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
                      {item.date.toDateString()}
                      {/* {console.log(item.date)} */}
                    </Text>
                  </View>
                ),
              },
            ]}
            renderSectionFooter={({ section: { title } }) => {
              if (title == "categories") {
                return (
                  <View>
                    <TouchableOpacity onPress={handleMore}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                          paddingVertical: 10,
                          paddingLeft: 10,
                        }}
                      >
                        Show more...
                      </Text>
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
        )}
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

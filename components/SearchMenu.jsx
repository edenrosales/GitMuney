import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  SectionList,
  TextInput,
  Keyboard,
} from "react-native";
import Emoji from "./Emoji";
import { useExcluded, useExpenses, useTotalSpent } from "./ContextProvider";
import TransactionModalComponent from "./TransactionModalComponent";
import Fuse from "fuse.js";
// import { TextInput } from "react-native-gesture-handler";

const SearchMenu = (props) => {
  const transactionsContext = useExpenses();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState();
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState();
  const [categorySelected, setCategorySelected] = useState();
  const [searchWord, setSearchWord] = useState("");
  const [searchIndex, setSearchIndex] = useState();
  const [foundTransactions, setFoundTransactions] = useState();

  useEffect(() => {
    setTransactions(() => {
      return transactionsContext;
    });
    setSearchIndex(() => {
      if (transactionsContext !== undefined) {
        const options = {
          threshold: 0.3,
          keys: ["transactionName"],
        };
        return new Fuse(Object.values(transactionsContext), options);
      }
      return undefined;
    });
    // console.log(transactionsContext);
  }, [transactionsContext]);
  useEffect(() => {
    if (transactionSelected !== undefined) {
      setCategorySelected({
        categoryBackgroundColor: transactionSelected.categoryBackgroundColor,
        categoryIcon: transactionSelected.categoryIcon,
        categoryName: transactionSelected.categoryName,
        categoryTextColor: transactionSelected.categtoryTextColor,
      });
    }
  }, [transactionSelected]);
  //for loading
  useEffect(() => {
    setLoading(() => {
      if (foundTransactions !== undefined) {
        // console.log(transactions);
        return false;
      }
      return true;
    });
  }, [foundTransactions]);

  useEffect(() => {
    if (transactions !== undefined) {
      setFoundTransactions(() => {
        let searchResults;
        if (searchWord === "") {
          searchResults = Object.values(transactions);
        } else {
          searchResults = searchIndex.search(searchWord).map((transaction) => {
            return transaction.item;
          });
        }
        const sortedResults = Object.values(searchResults).sort((a, b) => {
          if (a.date > b.date) {
            return -11;
          } else if (a.date < b.date) {
            return 1;
          }
          return 0;
        });
        const groupedResults = sortedResults.reduce((object, transaction) => {
          const date = transaction.date.toDate();
          const compareDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDay()
          );

          if (!object[compareDate]) {
            object[compareDate] = {
              title: compareDate,
              data: [],
            };
          }

          object[compareDate].data.push(transaction);
          return object;
        }, {});
        return Object.values(groupedResults);
      });
    }
  }, [searchWord, searchIndex]);
  const toggleTransactionModalVisible = () => {
    setTransactionModalVisible((prev) => !prev);
  };
  const handleTransactionPress = (item) => {
    setTransactionSelected(item);
    toggleTransactionModalVisible();
  };

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
          Keyboard.dismiss();
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
        <TransactionModalComponent
          visible={transactionModalVisible}
          category={categorySelected}
          transaction={transactionSelected}
          toggleVisible={toggleTransactionModalVisible}
        ></TransactionModalComponent>
        <TextInput
          placeholder="Search..."
          style={{
            position: "relative",
            margin: 15,
            backgroundColor: "#f0f0f0",
            borderRadius: 20,
            width: "85%",
            height: "5%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          value={searchWord}
          onChangeText={(text) => {
            setSearchWord(text);
          }}
          placeholderTextColor={"gray"}
          caretHidden
        ></TextInput>
        <SectionList
          style={{
            height: "100%",
            width: "100%",
            // zIndex: 5,
            // backgroundColor: "black",
          }}
          sections={foundTransactions}
          renderSectionHeader={({ section }) => {
            // debugger;
            return (
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 5,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    width: "93%",
                    color: "grey",
                    fontFamily: "SSP-Regular",
                  }}
                >
                  {section.title.toDateString()}
                </Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            // debugger;
            return (
              <Pressable
                onPress={() => {
                  handleTransactionPress(item);
                }}
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
                    {/* <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "SSP-Regular",
                        color: "gray",
                      }}
                    >
                      {item.date.toDate().toDateString()}
                    </Text> */}
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
              </Pressable>
            );
          }}
        ></SectionList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchMenu;

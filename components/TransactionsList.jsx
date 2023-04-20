import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Text, FlatList } from "react-native";
import Emoji from "./Emoji";
import { useExcluded, useExpenses, useTotalSpent } from "./ContextProvider";
import TransactionModalComponent from "./TransactionModalComponent";

const TransactionsList = (props) => {
  const transactionsContext = useExpenses();
  const excludedContext = useExcluded();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  const [transactions, setTransactions] = useState();
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState();
  const [transactionSelectedKey, setTransactionSelectedKey] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (transactionSelectedKey !== undefined && transactions !== undefined) {
      setTransactionSelected(() => {
        for (let transaction of transactions) {
          if (transaction.key === transactionSelectedKey) {
            return transaction;
          }
        }
      });
    }
  }, [transactionSelectedKey, transactions]);
  useEffect(() => {
    // console.log(props.listInfo.category);

    setCategory(props.listInfo.category);
  }, [props.listInfo.category]);

  useEffect(() => {
    //this is making sure that the special cases for transactions are handled properly

    setTransactions(() => {
      if (
        props.listInfo.transactions !== undefined &&
        transactionsContext !== undefined &&
        excludedContext !== undefined
      ) {
        const expensesObject = transactionsContext;
        if (props.listInfo.transactions === "Intentional") {
          return Object.values(expensesObject);
        } else if (props.listInfo.transactions === "Excluded") {
          return Object.values(excludedContext);
        } else if (props.listInfo.transactions === "Income") {
          return Object.values(transactionsContext).filter((item) => {
            if (!item.isWithdrawl) {
              return true;
            }
            return false;
          });
        } else {
          return Object.values(expensesObject).filter((item) => {
            if (item.categoryName === props.listInfo.transactions) {
              return true;
            }
            return false;
          });
        }
      }
    });
  }, [props.listInfo.transactions, transactionsContext, excludedContext]);
  useEffect(() => {
    console.log(transactions);
    if (transactions !== undefined) {
      let totalSpent = 0;
      transactions.forEach((item) => {
        totalSpent += item.cost;
      });
      setTotal(totalSpent);
    }
  }, [transactions]);
  //for loading
  useEffect(() => {
    setLoading(() => {
      if (category !== undefined && transactions !== undefined) {
        return false;
      }
      return true;
    });
  }, [category, transactions]);

  const toggleTransactionModalVisible = () => {
    setTransactionModalVisible((prev) => !prev);
  };

  //we have to make sure that the selectedTransaction is tied to the state of the trasnsactions state
  //this is so that it receives updates when it is changed on the card
  const handleTransactionPress = (itemKey) => {
    // debugger;
    setTransactionSelectedKey(itemKey);
    toggleTransactionModalVisible();
  };

  if (loading) {
    return <></>;
  }
  return (
    <>
      {/* <View style={{ height: "100%", width: "100%" }}> */}
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
          category={category}
          transaction={transactionSelected}
          toggleVisible={toggleTransactionModalVisible}
        ></TransactionModalComponent>
        <Emoji
          style={{ marginTop: 20 }}
          fontSize={55}
          name={category.categoryName}
          symbol={category.categoryIcon}
        ></Emoji>
        <Text style={{ fontSize: 35, fontFamily: "SSP-Bold", marginTop: 10 }}>
          ${total}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "SSP-SemiBold",
            marginTop: 5,
            color: "gray",
          }}
        >
          {category.categoryName}
        </Text>
        <FlatList
          style={{
            height: "100%",
            width: "100%",
            // zIndex: 5,
            // backgroundColor: "black",
          }}
          data={transactions}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  handleTransactionPress(item.key);
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
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "SSP-Regular",
                        color: "gray",
                      }}
                    >
                      {item.date.toDate().toDateString()}
                    </Text>
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
        ></FlatList>
      </View>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default TransactionsList;

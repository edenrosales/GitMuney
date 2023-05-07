import "react-native-gesture-handler";
import React, { useState, useEffect, Component, useTransition } from "react";
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
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import TopBarStats from "../components/TopBarStats";
import Categories from "../components/Categories";
import {
  useExpenses,
  useCategories,
  useTotalSpent,
  useBudget,
  useExcluded,
  useUserSettings,
} from "../components/ContextProvider";
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
import FirstLoginConfig from "../components/FirstLoginConfig";
import { usePendingSort } from "./../components/ContextProvider";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  debug,
} from "react-native-reanimated";
import NewCategoryCard from "./NewCategoryCard";
import Emoji from "./Emoji";
import MonthSwitcher from "./MonthSwitcher";
import TransactionsList from "./TransactionsList";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import SearchMenu from "./SearchMenu";
import AddTransactionModal from "./AddTransactionModal";

const NewViewAccountScreen = (props) => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const pixel80percent = (screenWidth / 100) * 90;

  const expensesContext = useExpenses();
  const categoriesContext = useCategories();
  const totalSpentContext = useTotalSpent();
  const budgetContext = useBudget();
  const excludedContext = useExcluded();
  const pendingSortContext = usePendingSort();
  const userSettingsContext = useUserSettings();

  const [totalSpent, setTotalSpent] = useState(0);
  const [categories, setCategories] = useState();
  const [myBudget, setMyBudget] = useState(5000);
  const [expenses, setExpenses] = useState();
  const [transactionsListInformation, setTransactionsListInformation] =
    useState({});
  const [excluded, setExcluded] = useState();
  const [pendingSort, setPendingSort] = useState();
  const [loading, setLoading] = useState(true);
  const [totalExcluded, setTotalExcluded] = useState(0);
  const [transactionListVisible, setTransactionListVisible] = useState(false);
  const [searchMenuVisible, setSearchMenuVisible] = useState(false);
  const [addTransactionVisible, setAddTransactionVisible] = useState(false);
  const [userSettings, setUserSettings] = useState();
  // const [categoryData, setCategoryData] = useState();
  useEffect(() => {
    setUserSettings(userSettingsContext);
  }, [userSettingsContext]);
  useEffect(() => {
    setExcluded(excludedContext);
    if (excludedContext !== undefined) {
      let total = 0;
      Object.values(excludedContext).forEach((item) => {
        total += item.cost;
      });
      setTotalExcluded(total);
    }
  }, [excludedContext]);
  useEffect(() => {
    setPendingSort(pendingSortContext);
  }, [pendingSortContext]);
  useEffect(() => {
    setExpenses(expensesContext);
  }, [expensesContext]);
  useEffect(() => {
    setCategories(categoriesContext);
  }, [categoriesContext]);
  useEffect(() => {
    setTotalSpent(totalSpentContext);
  }, [totalSpentContext]);
  useEffect(() => {
    setMyBudget(budgetContext);
  }, [budgetContext]);

  useEffect(() => {
    console.log("categories!!!");
    console.log(categories);
    // setCategoryData(() => {
    //   if (categories !== undefined) {
    //     // console.log(setti)
    //     return Object.values(categories);
    //   }
    // });
  }, [categories]);
  useEffect(() => {
    console.log("EXPENSES");
    console.log(expenses);
  }, [expenses]);

  useEffect(() => {
    setLoading(() => {
      if (
        categories !== undefined &&
        expenses !== undefined &&
        pendingSort !== undefined &&
        excluded !== undefined &&
        userSettings !== undefined
      ) {
        return false;
      } else {
        return true;
      }
    });
  }, [categories, expenses, pendingSort, excluded, userSettings]);

  const handleCategorySelect = (categoryName) => {
    if (categoryName === "Intentional") {
      // debugger;
      setTransactionsListInformation({
        category: {
          categoryBackgroundColor: "#C7E9B0",
          categoryIcon: "✔️",
          categoryName: "Intentional",
          categoryTextColor: "black",
          // total: totalSpent,
        },
        transactions: "Intentional",
      });
    } else if (categoryName === "Excluded") {
      setTransactionsListInformation({
        category: {
          categoryBackgroundColor: "#52575D",
          categoryIcon: "🗑️",
          categoryName: "Excluded",
          categoryTextColor: "black",
          // total: "Excluded",
        },
        transactions: "Excluded",
      });
    } else if (categoryName === "Income") {
      // const incomeExpenses = {};
      // let income = 0;
      // Object.values(expenses).forEach((transaction) => {
      //   if (!transaction.isWithdrawl) {
      //     incomeExpenses[transaction.key] = transaction;
      //     income += transaction.cost;
      //   }
      // });
      setTransactionsListInformation({
        category: {
          categoryBackgroundColor: "#52575D",
          categoryIcon: "💰",
          categoryName: "Income",
          categoryTextColor: "black",
          // total: income,
        },
        transactions: "Income",
      });
    } else {
      setTransactionsListInformation(() => {
        // const transactionList = {};
        // const allExpenses = Object.values(expenses);
        // allExpenses.forEach((transaction) => {
        //   if (transaction.categoryName === categoryName) {
        //     transactionList[transaction.key] = transaction;
        //   }
        // });
        return {
          category: categories[categoryName],
          transactions: categoryName,
        };
      });
    }
  };

  const handleTransactionListVisibleToggle = () => {
    setTransactionListVisible((prev) => !prev);
  };
  const handleSearchMenuVisibleToggle = () => {
    setSearchMenuVisible((prev) => !prev);
  };
  const handleAddTransactionVisibleToggle = () => {
    setAddTransactionVisible((prev) => !prev);
  };
  useEffect(() => {
    console.log("transaction list information");
    console.log(transactionsListInformation);
  }, [transactionsListInformation]);
  if (loading) {
    return <></>;
  }
  return (
    <>
      <TransactionsList
        listInfo={transactionsListInformation}
        isVisible={transactionListVisible}
        toggleVisible={handleTransactionListVisibleToggle}
        // visible={transactionListVisible}
      ></TransactionsList>
      <SearchMenu
        isVisible={searchMenuVisible}
        toggleVisible={handleSearchMenuVisibleToggle}
      ></SearchMenu>
      <AddTransactionModal
        isVisible={addTransactionVisible}
        toggleVisible={handleAddTransactionVisibleToggle}
      ></AddTransactionModal>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: "6%",
            backgroundColor: "white",
            zIndex: 1,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              position: "absolute",
              left: 15,
              fontSize: 24,
              fontFamily: "SSP-SemiBold",
              bottom: 0,
              // top: 10,
            }}
          >
            Transactions
          </Text>
          <Pressable
            style={{ position: "absolute", right: 15, bottom: 0 }}
            onPress={() => {
              handleSearchMenuVisibleToggle();
            }}
          >
            <Emoji name={"Search"} fontSize={21} symbol={"🔍"}></Emoji>
          </Pressable>
        </View>

        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flex: 6, height: "100%", width: "100%" }}>
            <SectionList
              ListHeaderComponent={() => (
                <View style={{ height: screenHeight * 0.28 }}>
                  {/* <View style={{ height: "15%" }}></View> */}
                  <View
                    style={{
                      height: "55%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "center",
                        // gap: 15,
                      }}
                      onPress={() => {
                        console.log("total spent press");
                      }}
                    >
                      {userSettings.budgetStyle === "Manual" ? (
                        <>
                          <Text
                            style={{
                              flex: 2,
                              fontSize: 55,
                              fontFamily: "SSP-Bold",
                              textAlign: "right",
                            }}
                          >
                            ${(userSettings.budget - totalSpent).toFixed(2)}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              left: 15,
                              fontFamily: "SSP-Bold",
                              fontSize: 30,

                              // textAlign: "top",
                              // backgroundColor: "black",
                            }}
                          >
                            Left
                          </Text>
                        </>
                      ) : totalSpent > 0 ? (
                        <>
                          <Text
                            style={{ fontSize: 55, fontFamily: "SSP-Bold" }}
                          >{`$${totalSpent.toFixed(2)}`}</Text>
                        </>
                      ) : (
                        <>
                          <Text
                            style={{
                              fontSize: 55,
                              fontFamily: "SSP-Bold",
                              color: "green",
                            }}
                          >{`+$${-totalSpent.toFixed(2)}`}</Text>
                        </>
                      )}
                    </Pressable>
                  </View>
                  <View style={{ height: "30%" }}>
                    <MonthSwitcher></MonthSwitcher>
                  </View>
                  {userSettings.managementStyle !== "Automatic" ? (
                    <View
                      style={{
                        width: "100%",
                        // backgroundColor: "black",
                        height: "10%",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          // console.log("this works");
                          handleAddTransactionVisibleToggle();
                        }}
                        style={{
                          height: "100%",
                          width: "33%",
                          // backgroundColor: "black",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontFamily: "SSP-SemiBold",
                            fontSize: 15,
                          }}
                        >
                          Add Transaction
                        </Text>
                      </Pressable>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
                // {/* <View style={{ height: screenHeight * 0.08 }}>
                //   <MonthSwitcher></MonthSwitcher>
                // </View> */}
              )}
              sections={[
                {
                  title: "TOTALS",
                  data: Object.values(categories)
                    .filter((entry) => {
                      if (
                        entry.categoryName === "Intentional" ||
                        entry.categoryName === "Excluded" ||
                        entry.categoryName === "Income"
                      ) {
                        // debugger;
                        return true;
                      }
                      return false;
                    })
                    .sort((a, b) => {
                      if (a.sortOrder > b.sortOrder) {
                        return 1;
                      } else {
                        return -1;
                      }
                    }),
                  renderItem: ({ item }) => {
                    if (item.spent === 0 && item.title === "Income") {
                      return <></>;
                    }
                    return (
                      <NewCategoryCard
                        categoryIcon={item.categoryIcon}
                        categoryName={item.categoryName}
                        categoryAmount={item.total}
                        totalSpent={totalSpent + totalExcluded}
                        loadingStyle={{
                          backgroundColor: item.categoryBackgroundColor,
                          opacity: 0.7,
                        }}
                        handleCategorySelect={handleCategorySelect}
                        toggleTransactionsList={
                          handleTransactionListVisibleToggle
                        }
                      ></NewCategoryCard>
                    );
                  },
                },
                {
                  title: "CATEGORIES",
                  data: Object.values(categories)
                    .sort((a, b) => {
                      if (a.total > b.total) {
                        return -1;
                      } else if (a.total < b.total) {
                        return 1;
                      }
                      return 0;
                    })
                    .filter((entry) => {
                      if (
                        entry.categoryName === "Intentional" ||
                        entry.categoryName === "Excluded" ||
                        entry.categoryName === "Income"
                      ) {
                        // debugger;
                        return false;
                      }
                      return true;
                    }),
                  renderItem: ({ item }) => {
                    if (item.total === 0) {
                      return <></>;
                    }

                    return (
                      <NewCategoryCard
                        categoryIcon={item.categoryIcon}
                        categoryName={item.categoryName}
                        categoryAmount={item.total}
                        totalSpent={totalSpent}
                        loadingStyle={{ backgroundColor: "blue", opacity: 0.7 }}
                        handleCategorySelect={handleCategorySelect}
                        toggleTransactionsList={
                          handleTransactionListVisibleToggle
                        }
                      ></NewCategoryCard>
                    );
                  },
                },
              ]}
              renderSectionHeader={({ section }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      marginBottom: 5,
                      marginTop: section.title === "TOTALS" ? 5 : 25,
                    }}
                  >
                    <Text
                      style={{
                        width: "93%",
                        color: "grey",
                        fontFamily: "SSP-Regular",
                      }}
                    >
                      {section.title}
                    </Text>
                  </View>
                );
              }}
            ></SectionList>
          </View>
        </View>
      </View>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({});

export default NewViewAccountScreen;

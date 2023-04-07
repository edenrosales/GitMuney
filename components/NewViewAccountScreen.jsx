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
} from "react-native-reanimated";
import NewCategoryCard from "./NewCategoryCard";
import Emoji from "./Emoji";
import MonthSwitcher from "./MonthSwitcher";

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

  const [totalSpent, setTotalSpent] = useState(0);
  const [categories, setCategories] = useState();
  const [myBudget, setMyBudget] = useState(5000);
  const [expenses, setExpenses] = useState();
  //   const [more, setMore] = useState(false);
  const [
    transactionModalComponentVisible,
    setTransactionModalComponentVisible,
  ] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState({});
  const [excluded, setExcluded] = useState();
  const [pendingSort, setPendingSort] = useState();
  const [loading, setLoading] = useState(true);
  const [totalExcluded, setTotalExcluded] = useState(0);

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
        excluded !== undefined
      ) {
        return false;
      } else {
        return true;
      }
    });
  }, [categories, expenses, pendingSort, excluded]);
  if (loading) {
    return <></>;
  }
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
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
            console.log("this works");
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
                <View style={{ height: "15%" }}></View>
                <View
                  style={{
                    height: "55%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{}}
                    onPress={() => {
                      console.log("total spent press");
                    }}
                  >
                    <Text style={{ fontSize: 55, fontFamily: "SSP-Bold" }}>
                      ${totalSpent}
                    </Text>
                  </Pressable>
                </View>
                <View style={{ height: "30%" }}>
                  <MonthSwitcher></MonthSwitcher>
                </View>
              </View>
              // {/* <View style={{ height: screenHeight * 0.08 }}>
              //   <MonthSwitcher></MonthSwitcher>
              // </View> */}
            )}
            sections={[
              {
                title: "TOTALS",
                data: [
                  {
                    title: "Ententional",
                    spent: totalSpent,
                    icon: "💰",
                    backgroundColor: "#C7E9B0",
                  },
                  {
                    title: "Excluded",
                    spent: totalExcluded,
                    backgroundColor: "#52575D",
                    icon: "🗑️",
                  },
                ],
                renderItem: ({ item }) => {
                  return (
                    <NewCategoryCard
                      categoryIcon={item.icon}
                      categoryName={item.title}
                      categoryAmount={item.spent}
                      totalSpent={totalSpent + totalExcluded}
                      loadingStyle={{
                        backgroundColor: item.backgroundColor,
                        opacity: 0.7,
                      }}
                    ></NewCategoryCard>
                  );
                },
              },
              {
                title: "CATEGORIES",
                data: Object.values(categories).sort((a, b) => {
                  if (a.total > b.total) {
                    return -1;
                  } else if (a.total < b.total) {
                    return 1;
                  }
                  return 0;
                }),
                renderItem: ({ item }) => {
                  // if (item.total === 0) {
                  //   return <></>;
                  // }

                  return (
                    <NewCategoryCard
                      categoryIcon={item.icon}
                      categoryName={item.key}
                      categoryAmount={item.total}
                      totalSpent={totalSpent}
                      loadingStyle={{ backgroundColor: "blue", opacity: 0.7 }}
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
    </>
  );
};

const styles = StyleSheet.create({});

export default NewViewAccountScreen;

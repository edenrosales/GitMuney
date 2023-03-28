import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable, SectionList } from "react-native";
import {
  usePendingSort,
  useExcluded,
  useCategories,
} from "../components/ContextProvider";
import _, { isEmpty } from "lodash";
import Categories from "../components/Categories";
import TransactionModalComponent from "../components/TransactionModalComponent";
import { FlatList } from "react-native-gesture-handler";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
const SortCategories = () => {
  const PendingSortContext = usePendingSort();
  const ExcludedContext = useExcluded();
  const CategoriesContext = useCategories();

  const [loading, setLoading] = useState(true);
  const [pendingSort, setPendingSort] = useState();
  const [excluded, setExcluded] = useState();
  const [firstCard, setFirstCard] = useState();
  const [categories, setCategories] = useState();
  const [needsSorting, setNeedsSorting] = useState();
  useEffect(() => {
    setPendingSort(PendingSortContext);
  }, [PendingSortContext]);
  useEffect(() => {
    setExcluded(ExcludedContext);
  }, [ExcludedContext]);
  useEffect(() => {
    if (CategoriesContext !== undefined && !_.isEmpty(CategoriesContext)) {
      setCategories(Object.keys(CategoriesContext).slice(0, 6));
    } else {
      setCategories({});
    }
  }, [CategoriesContext]);
  useEffect(() => {
    if (pendingSort !== undefined && !_.isEmpty(PendingSortContext)) {
      setFirstCard(Object.values(pendingSort)[0]);
      setNeedsSorting(true);
    } else {
      setFirstCard({});
      setNeedsSorting(false);
    }
  }, [pendingSort]);
  useEffect(() => {
    console.log("first card");
    console.log(firstCard);
  }, [firstCard]);

  useEffect(() => {
    console.log("pending sort");
    console.log(pendingSort);
  }, [pendingSort]);
  useEffect(() => {
    console.log("needs sorting");
    console.log(needsSorting);
  }, [needsSorting]);

  useEffect(() => {
    if (
      !(
        pendingSort === undefined ||
        excluded === undefined ||
        firstCard === undefined ||
        categories === undefined ||
        needsSorting === undefined
      )
    ) {
      setLoading(false);
      console.log("done loading");
    }
  }, [pendingSort, excluded, firstCard, categories, needsSorting]);

  const handleCategoryPress = (category) => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .doc(firstCard.key)
      .update({
        category: category,
        pendingSort: false,
      });
  };
  if (loading) {
    return <Text>Loading</Text>;
  }
  return needsSorting && needsSorting !== undefined ? (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 0.25, backgroundColor: "white" }}></View>
      <View
        style={{
          flex: 2,
          aspectRatio: 1,
          backgroundColor: "#eef2f5",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <Text>Icon</Text>
          <Text style={{ fontFamily: "SSP-Regular", fontSize: 20 }}>
            {firstCard.transactionName}
          </Text>
          <Text
            style={{ fontFamily: "SSP-Bold", fontSize: 70 }}
            // allowFontScaling={true}
          >
            ${firstCard.cost}
          </Text>
          <Text
            style={{
              fontFamily: "SSP-Regular",
              color: "gray",
            }}
          >
            {firstCard.date && firstCard.date.toDate().toDateString()}
          </Text>
        </>
      </View>
      <View style={{ flex: 0.25 }}></View>
      <View
        style={{
          flex: 1.5,
          flexDirection: "column",
          // height: "100%",
          // width: "100%",
        }}
      >
        <View
          style={{
            // margin: 5,
            flex: 1,
            // margin: 20,
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "#f2f5f7",
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          }}
        >
          <FlatList
            contentContainerStyle={{
              height: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
            data={categories.slice(0, 6)}
            numColumns={3}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  console.log("transaction sorted!");
                  handleCategoryPress(item);
                }}
                style={{
                  width: "30%",
                  height: "50%",
                  aspectRatio: 1,
                  backgroundColor: "white",
                  margin: 5,
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 15,
                  backgroundColor: "#eef2f5",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontFamily: "SSP-Regular",
                  }}
                >
                  Icon
                </Text>
                <Text
                  style={{ textAlign: "center", fontFamily: "SSP-Regular" }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          ></FlatList>
        </View>
      </View>
      {/* <View
        style={{
          flex: 0.4,
          backgroundColor: "black",
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ flex: 1 }}> hi </Text>
      </View> */}
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>
        No transactions to sort... come back later : ]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SortCategories;

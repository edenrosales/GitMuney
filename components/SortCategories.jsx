import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { usePendingSort, useExcluded, useCategories } from "./ContextProvider";
import _ from "lodash";
import Categories from "./Categories";
import TransactionModalComponent from "./TransactionModalComponent";
const SortCategories = () => {
  const PendingSortContext = usePendingSort();
  const ExcludedContext = useExcluded();
  const CategoriesContext = useCategories();

  const [pendingSort, setPendingSort] = useState({});
  const [excluded, setExcluded] = useState({});
  const [firstCard, setFirstCard] = useState({});
  const [categories, setCategories] = useState({});
  useEffect(() => {
    setPendingSort(PendingSortContext);
  }, [PendingSortContext]);
  useEffect(() => {
    setExcluded(ExcludedContext);
  }, [ExcludedContext]);
  useEffect(() => {
    setFirstCard(pendingSort[1]);
  }, [pendingSort]);
  useEffect(() => {
    setCategories(Object.keys(CategoriesContext));
  }, [CategoriesContext]);

  return (
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
      <View style={{ flex: 0.5, backgroundColor: "white" }}></View>
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
        {_.isEqual(firstCard, {}) ? (
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
        ) : (
          <Text style={{ textAlign: "center", fontFamily: "SSP-Regular" }}>
            no transactions to sort, come back later! : ]
          </Text>
        )}
      </View>
      <View style={{ flex: 2 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SortCategories;

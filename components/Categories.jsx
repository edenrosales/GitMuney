import "react-native-gesture-handler";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Touchable,
  Button,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import * as Progress from "react-native-progress";
import Heap from "heap-js";

export default function Categories(props) {
  const [budget, setBudget] = useState(1);
  const [categories, setCategories] = useState();
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = (prev) => !prev;
  useEffect(() => console.log("component mounted"), []);

  useEffect(() => {
    if (props.categories != undefined) {
      setCategories(
        [...props.categories].sort((value1, value2) => {
          if (value1.total > value2.total) {
            return -1;
          } else if (value1.total < value2.total) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }
    // setCategories(props.categories)
    setBudget(props.budget);
  }, [props.categories, props.budget]);

  return (
    <View style={{ height: "100%" }}>
      {/* <View style={styles.categories}>
          <Categories remove = {() => this.remove()}></Categories>
          <TouchableOpacity>
              <Text style={[styles.recTran, {marginTop: 10}]}>Groceries</Text>
          </TouchableOpacity>
          <Progress.Bar progress={0.15} width={props.pixel80percent}
              borderRadius={10} height={20} color={'tomato'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
          <Text style={[styles.recTran, {marginTop: 10}]}>Rent</Text>
          <Progress.Bar progress={0.45} width={props.pixel80percent}
              borderRadius={10} height={20} color={'dodgerblue'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
          <Text style={[styles.recTran, {marginTop: 10}]}>Gas</Text>
          <Progress.Bar progress={0.23} width={props.pixel80percent}
              borderRadius={10} height={20} color={'yellow'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
      </View> */}
      {categories &&
        categories.map((item) => {
          return (
            <View>
              <Text style={[styles.recTran, { marginTop: 10 }]}>
                {item.name}
              </Text>
              {/* <TouchableOpacity></TouchableOpacity> */}
              <Progress.Bar
                progress={item.total / budget}
                width={props.pixel80percent}
                borderRadius={10}
                height={20}
                color={"tomato"}
                unfilledColor={"#d9d9d9"}
                borderWidth={0}
              />
            </View>
          );
        })}
      <Button
        onPress={() => {
          console.log("test");
        }}
        title={"cool"}
      ></Button>
      <Text style={{ color: "white", fontSize: 15 }}>Show more... </Text>
      <Text style={[styles.recTran, { padding: 10 }]}>Recent Transactions</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  categories: {
    padding: 10,
  },
  recTran: {
    color: "white",
    fontSize: 25,
  },
});

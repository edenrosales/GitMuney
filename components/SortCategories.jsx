import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SectionList,
  useWindowDimensions,
} from "react-native";
import {
  usePendingSort,
  useExcluded,
  useCategories,
  useSortCategories,
  useAccessToken,
  useUserSettings,
  useCursor,
} from "../components/ContextProvider";
import _, { isEmpty } from "lodash";
import Categories from "../components/Categories";
import TransactionModalComponent from "../components/TransactionModalComponent";
import { Directions, FlatList } from "react-native-gesture-handler";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  runOnJS,
  useDerivedValue,
  runOnUI,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import SortCard from "./SortCard";
import Emoji from "./Emoji";
import { useUpdateTransactions } from "../backend/PlaidConnector";

const SortCategories = () => {
  const { width, height } = useWindowDimensions();
  let cardWidth = 250 / 2;
  let cardHeight = 250 / 2;
  const leftBorder = -width / 2;
  const rightBorder = width / 2;
  const PendingSortContext = usePendingSort();
  const ExcludedContext = useExcluded();
  const SortCategoriesContext = useSortCategories();
  const AccessTokenContext = useAccessToken();
  const UserSettingsContext = useUserSettings();
  const CursorContext = useCursor();

  const [loading, setLoading] = useState(true);
  const [pendingSort, setPendingSort] = useState();
  const [excluded, setExcluded] = useState();
  // const [firstCard, setFirstCard] = useState();
  const [sortCategories, setSortCategories] = useState();
  const [needsSorting, setNeedsSorting] = useState();
  const [panViewBottomHeight, setPanViewBottomHeight] = useState(height);
  const [panViewTopHeight, setPanViewTopHeight] = useState(-height);
  const [accessToken, setAccessToken] = useState();
  const [cursor, setCursor] = useState();
  const [userSettings, setUserSettings] = useState();

  useEffect(() => {
    console.log(CursorContext);
    setCursor(CursorContext);
  }, [cursor]);
  useEffect(() => {
    setUserSettings(UserSettingsContext);
  }, [UserSettingsContext]);
  useEffect(() => {
    if (AccessTokenContext) {
      setAccessToken(AccessTokenContext);
    }
  }, [AccessTokenContext]);

  useEffect(() => {
    setPendingSort(Object.values(PendingSortContext));
  }, [PendingSortContext]);
  useEffect(() => {
    setExcluded(Object.values(ExcludedContext));
  }, [ExcludedContext]);
  useEffect(() => {
    if (
      SortCategoriesContext !== undefined &&
      !_.isEmpty(SortCategoriesContext)
    ) {
      // debugger;
      setSortCategories(Object.values(SortCategoriesContext).slice(0, 6));
    } else {
      setSortCategories({});
    }
  }, [SortCategoriesContext]);
  useEffect(() => {
    console.log("sort categories");
    console.log(sortCategories);
  }, [sortCategories]);
  useEffect(() => {
    if (pendingSort !== undefined && !_.isEmpty(PendingSortContext)) {
      // setFirstCard(Object.values(pendingSort)[0]);
      setNeedsSorting(true);
    } else {
      // setFirstCard({});
      setNeedsSorting(false);
    }
  }, [pendingSort]);
  // useEffect(() => {
  //   console.log("first card");
  //   console.log(firstCard);
  // }, [firstCard]);

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
        sortCategories === undefined ||
        needsSorting === undefined
      )
    ) {
      setLoading(false);
      console.log("done loading");
    }
  }, [pendingSort, excluded, , sortCategories, needsSorting]);

  const handleCategoryPress = (category) => {
    // debugger;
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .doc(pendingSort[pendingSort.length - 1].key)
      .update({
        categoryName: category.categoryName,
        categoryBackgroundColor: category.categoryBackgroundColor,
        categoryIcon: category.categoryIcon,
        categoryTextColor: category.categoryTextColor,
        pendingSort: false,
      });
  };

  const decrementRefreshes = () => {
    if (userSettings.refreshes > 0) {
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .update({ refreshes: userSettings.refreshes - 1 })
        .finally(() => {
          useUpdateTransactions(accessToken, cursor);
        });
    }
  };
  // const animatedColorStyle = useAnimatedStyle(() => ({
  //   backgroundColor: "blue",
  //   opacity: leftActive.value
  //     ? withTiming(1, { duration: 500 })
  //     : withTiming(0, { duration: 500 }),
  // }));
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <>
      {needsSorting && needsSorting !== undefined ? (
        <View
          style={{
            // zIndex: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "100%",
              width: "100%",
              flex: 2.5,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "white",
            }}
            onLayout={(eventLayout) => {
              const viewHeight = eventLayout.nativeEvent.layout.height;
              console.log(viewHeight);
              setPanViewBottomHeight(viewHeight / 2 - cardHeight);
              setPanViewTopHeight(-(viewHeight / 2 - cardHeight));
            }}
          >
            {pendingSort.map((transaction) => {
              return (
                <SortCard
                  style={{}}
                  key={transaction.key}
                  transaction={transaction}
                  leftTranslation={leftBorder}
                  rightTranslation={rightBorder}
                  upTranslation={panViewTopHeight}
                  downTranslation={panViewBottomHeight}
                ></SortCard>
              );
            })}
          </View>
          <View
            style={{
              flex: 1.5,
              flexDirection: "column",
              height: "100%",
              width: "100%",
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
                backgroundColor: "white",
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
                data={sortCategories.slice(0, 6)}
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
                      alignItems: "center",
                    }}
                  >
                    <Emoji
                      name={item.categoryName}
                      symbol={item.categoryIcon}
                      fontSize={35}
                    ></Emoji>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "SSP-Regular",
                        marginTop: 15,
                        // marignTop: 15,
                      }}
                    >
                      {item.categoryName}
                    </Text>
                  </Pressable>
                )}
              ></FlatList>
            </View>
          </View>
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
            backgroundColor: "white",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            No transactions to sort... come back later : ]
          </Text>
        </View>
      )}
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
          Sort
        </Text>
        {accessToken !== "" && userSettings.managementStyle !== "Manual" ? (
          <Pressable
            style={{
              position: "absolute",
              right: 15,
              bottom: 0,
            }}
            onPress={() => {
              decrementRefreshes();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "SSP-SemiBold",
                  // right: 15,
                  bottom: 0,
                }}
              >
                ⟳
              </Text>
              <Text style={{ fontFamily: "SSP-Light", fontSize: 20 }}>
                {userSettings.refreshes} Left
              </Text>
            </View>
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  test: {
    height: 20,
    backgroundColor: "green",
  },
});

export default SortCategories;

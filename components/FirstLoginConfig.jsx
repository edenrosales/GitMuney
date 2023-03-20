import { toInt } from "heap-js";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  GoogleSignin,
  statusCodes,
  isSignedIn,
} from "@react-native-google-signin/google-signin";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FirstLoginConfig = ({ props, navigation }) => {
  // props.toggleFirstLogin()
  // console.log(props.visible);
  const [managementStyle, setManagementStyle] = useState(undefined);
  const [budgetStyle, setBudgetStyle] = useState(undefined);
  const [budget, setBudget] = useState(undefined);
  const onlyNumbersInput = RegExp("/^[0-9]+$/");
  const [inputStatus, setInputStatus] = useState(false);

  const signOut = async () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
      });
    if (GoogleSignin.isSignedIn()) {
      await GoogleSignin.revokeAccess().catch((err) => console.log(err));
      await GoogleSignin.signOut().catch((err) => console.log(err));
      console.log("signed out");
    }
  };

  useEffect(() => {
    validInput();
  }, [budgetStyle, managementStyle, budget]);

  const navigateToAccountScreen = () => {
    navigation.navigate("MainContent");
  };
  //returns a string identifying which valid input has been passed
  const validInput = () => {
    if (
      managementStyle &&
      ["Automatic (WIP)", "Free Style"].includes(budgetStyle)
    ) {
      setInputStatus("non-manual budget style");
    } else if (managementStyle && budgetStyle === "Manual" && budget) {
      setInputStatus("manual budget style");
    } else {
      return setInputStatus(false);
    }
  };
  const submitFirstLoginConfigForm = () => {
    if (inputStatus === "non-manual budget style") {
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .update({
          managementStyle: managementStyle,
          budgetStyle: budgetStyle,
          firstLogin: false,
        })
        .then(() => {
          setManagementStyle(undefined);
          setBudgetStyle(undefined);
          setBudget(undefined);
          navigateToAccountScreen();
        });
    } else if (inputStatus == "manual budget style") {
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .update({
          managementStyle: managementStyle,
          budgetStyle: budgetStyle,
          budget: budget,
          firstLogin: false,
        })
        .then(() => {
          setManagementStyle(undefined);
          setBudgetStyle(undefined);
          setBudget(undefined);
          navigateToAccountScreen();
        });
    } else {
      console.log("Invalid Press");
    }
  };
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "black",
        backgroundColor: "#ffffff",
        width: screenWidth,
        height: screenHeight,
        // zIndex: props.visible ? 1 : -1,
        // opacity: props.visible ? 1 : 0,
      }}
    >
      <KeyboardAvoidingView
        keyboardVerticalOffset={40}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior={"height"}
        style={{
          flex: 1,
          // backgroundColor: "black",
          // zIndex: 1,
        }}
      >
        <ScrollView>
          <View
            style={{ display: "flex", flexDirection: "row", top: 30, left: 15 }}
          >
            <Text
              style={{
                fontFamily: "SSP-Bold",
                fontSize: 30,
              }}
            >
              First time?...
            </Text>
            {/* <Text
              style={{
                // position: "absolute",
                fontFamily: "SSP-SemiBold",
                fontSize: 30,
                marginLeft: 150,
              }}
            >
              x
            </Text> */}
          </View>

          <Text
            style={{
              marginTop: 40,
              fontFamily: "SSP-Regular",
              fontSize: 18,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Help us better tailor your experience
          </Text>
          <Text
            style={{
              fontFamily: "SSP-SemiBold",
              fontSize: 20,
              marginTop: 60,
              left: 10,
            }}
          >
            Transaction Management Style
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (managementStyle === "Automatic") {
                  setManagementStyle(undefined);
                } else {
                  setManagementStyle("Automatic");
                }
              }}
              style={[
                styles.button,
                {
                  backgroundColor:
                    managementStyle === "Automatic" ? "black" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: managementStyle === "Automatic" ? "white" : "black",
                  },
                ]}
              >
                Automatic
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (managementStyle === "Hybrid") {
                  setManagementStyle(undefined);
                } else {
                  setManagementStyle("Hybrid");
                }
              }}
              style={[
                styles.button,
                {
                  backgroundColor:
                    managementStyle === "Hybrid" ? "black" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: managementStyle === "Hybrid" ? "white" : "black",
                  },
                ]}
              >
                Hybrid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (managementStyle === "Manual") {
                  setManagementStyle(undefined);
                } else {
                  setManagementStyle("Manual");
                }
              }}
              style={[
                styles.button,
                {
                  backgroundColor:
                    managementStyle === "Manual" ? "black" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: managementStyle === "Manual" ? "white" : "black",
                  },
                ]}
              >
                Manual
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "SSP-SemiBold",
              fontSize: 20,
              marginTop: 60,
              left: 10,
            }}
          >
            Budget Style
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (budgetStyle === "Automatic (WIP)") {
                  setBudgetStyle(undefined);
                } else {
                  setBudgetStyle("Automatic (WIP)");
                }
              }}
              style={[
                styles.button,
                {
                  backgroundColor:
                    budgetStyle === "Automatic (WIP)" ? "black" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      budgetStyle === "Automatic (WIP)" ? "white" : "black",
                  },
                ]}
              >
                Automatic (WIP)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (budgetStyle === "Free Style") {
                  setBudgetStyle(undefined);
                } else {
                  setBudgetStyle("Free Style");
                }
              }}
              style={[
                styles.button,
                {
                  backgroundColor:
                    budgetStyle === "Free Style" ? "black" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: budgetStyle === "Free Style" ? "white" : "black",
                  },
                ]}
              >
                Free Style
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (budgetStyle === "Manual") {
                  setBudgetStyle(undefined);
                } else {
                  setBudgetStyle("Manual");
                }
              }}
              style={[
                styles.button,
                {
                  backgroundColor: budgetStyle === "Manual" ? "black" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: budgetStyle === "Manual" ? "white" : "black",
                  },
                ]}
              >
                Manual
              </Text>
            </TouchableOpacity>
          </View>

          {budgetStyle === "Manual" && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: 35,
              }}
            >
              <Text
                style={{
                  fontFamily: "SSP-Regular",
                  fontSize: 20,
                }}
              >
                Budget/mo
              </Text>
              <TextInput
                style={{
                  height: "auto",
                  fontFamily: "SSP-Regular",
                  width: "20%",
                  borderBottomWidth: 0.5,
                  textAlign: "center",
                }}
                // keyboardType={"numeric"}
                inputMode={"numeric"}
                onChangeText={(text) => {
                  const filteredText = text.replace(/[^0-9]+/, "");
                  setBudget(filteredText);
                }}
                value={budget}
              ></TextInput>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 100,
          bottom: 50,
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={[
            styles.button,
            {
              marginLeft: "auto",
              marginRight: "auto",
              width: screenWidth * 0.8,
              backgroundColor: "black",
              marginBottom: 5,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            submitFirstLoginConfigForm();
          }}
          style={[
            styles.button,
            {
              marginLeft: "auto",
              marginRight: "auto",
              width: screenWidth * 0.8,
              marginTop: 5,
              backgroundColor: !(inputStatus === false) ? "#0000f5" : "white",
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: !(inputStatus === false) ? "white" : "black",
              },
            ]}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    width: screenWidth / 3 - 10,
    height: 40,

    borderRadius: 0,
    borderWidth: 0.75,
    borderColor: "gray",
  },
  buttonText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: "SSP-Regular",
    fontSize: 15,
  },
});

export default FirstLoginConfig;

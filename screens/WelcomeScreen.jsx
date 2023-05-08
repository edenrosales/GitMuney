import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Pressable,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
} from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  useFB,
  useDB,
  useAuth,
  useUserUpdate,
  useUser,
} from "../components/ContextProvider";
import {
  GoogleSignin,
  statusCodes,
  isSignedIn,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import GoogleSignInButton from "../components/GoogleSignInButton";
import firestore from "@react-native-firebase/firestore";
import FirstLoginConfig from "../components/FirstLoginConfig";
import SignUp from "../components/SignUp";
import SortCategories from "./../components/SortCategories";

function WelcomeScreen({ navigation, authCompleted }) {
  const [signUp, setSignUp] = useState(false);
  const [logininfo, setLogininfo] = useState(["", ""]);
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [reEnterPasswordValid, setReEnterPasswordValid] = useState(true);

  useEffect(() => {
    // console.log(auth().currentUser.uid);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async () => {
    if (auth().currentUser) {
      setLogininfo(["", ""]);
      const userDocument = await firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .get();
      if (!userDocument.exists) {
        await firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .set({
            firstLogin: true,
            refreshes: 2,
            lastLogin: new Date(),
            sortCategories: [
              {
                categoryBackgroundColor: "#919C8C",
                categoryIcon: "💸",
                categoryName: "Bills",
                categoryTextColor: "black",
              },
              {
                categoryBackgroundColor: "#E3F1FF",
                categoryIcon: "🎭",
                categoryName: "Entertainment",
                categoryTextColor: "black",
              },
              {
                categoryBackgroundColor: "#e9edc9",
                categoryIcon: "🥫",
                categoryName: "Groceries",
                categoryTextColor: "black",
              },
              {
                categoryBackgroundColor: "#FFE5EF",
                categoryIcon: "📈",
                categoryName: "Investing",
                categoryTextColor: "black",
              },
              {
                categoryBackgroundColor: "#edede9",
                categoryIcon: "🎲",
                categoryName: "Misc",
                categoryTextColor: "black",
              },
              {
                categoryBackgroundColor: "#F17057",
                categoryIcon: "🏠",
                categoryName: "Rent",
                categoryTextColor: "black",
              },
              {
                categoryBackgroundColor: "#E3F1FF",
                categoryIcon: "🏛️",
                categoryName: "Taxes",
                categoryTextColor: "black",
              },
            ],
            plaidUser: false,
            trueFirstLogin: true,
          });
      }
    } else {
      console.log("not signed in");
    }
  };

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

  const signUpHandler = () => {
    if (logininfo[1] !== reEnterPassword) {
      setReEnterPasswordValid(false);
      return;
    }
    auth()
      .createUserWithEmailAndPassword(logininfo[0], logininfo[1])
      .then(() => {
        setLogininfo(["", ""]);
        setReEnterPassword("");
        setSignUp(false);
      })
      .catch((err) => console.log(err));
  };
  const loginAttempt = () => {
    if (!logininfo[0] || !logininfo[1]) {
      return;
    }
    auth()
      .signInWithEmailAndPassword(logininfo[0], logininfo[1])
      .catch((err) => {
        console.log(err);
      });
  };

  const autosignin = () => {
    auth()
      .signInWithEmailAndPassword("eden@rosales5.com", "12345678")
      .then(() => {
        navigation.navigate("ViewAccount");
      });
  };

  const toggleSignUp = () => {
    setSignUp((prev) => !prev);
  };

  return (
    <>
      <View
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {/* {signOut()} */}
        {/* {console.log(auth().currentUser.uid)} */}
        <Image
          style={styles.image}
          source={require("../assets/gitMunnyLogo.png")}
        />
        <View
          style={{
            position: "relative",
            width: "70%",
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
          }}
        >
          {/* <Text style={{}}>Email:</Text> */}
          <TextInput
            placeholder="example@email.com"
            style={{
              position: "relative",
              borderBottomWidth: 1,
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            value={logininfo[0]}
            onChangeText={(text) => setLogininfo([text, logininfo[1]])}
            placeholderTextColor={"gray"}
          />
        </View>
        <View
          style={{
            position: "relative",
            width: "70%",
            display: "flex",
            flexDirection: "column",
            marginTop: 15,
          }}
        >
          {/* <Text>Password:</Text> */}
          <TextInput
            placeholder="Password"
            style={{
              position: "relative",
              borderBottomWidth: 1,
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            value={logininfo[1]}
            onChangeText={(text) => setLogininfo([logininfo[0], text])}
            placeholderTextColor={"gray"}
          />
        </View>
        {signUp && (
          <View
            style={{
              position: "relative",
              width: "70%",
              display: "flex",
              flexDirection: "column",
              marginTop: 15,
            }}
          >
            {/* <Text>Re-Enter Password:</Text> */}
            <TextInput
              placeholder="Re-Enter Password"
              style={{
                position: "relative",
                borderBottomWidth: 1,
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              value={reEnterPassword}
              onChangeText={(text) => setReEnterPassword(text)}
              placeholderTextColor={"gray"}
            />
          </View>
        )}
        <View
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {signUp ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  signUpHandler();
                }}
                style={{
                  marginTop: 20,
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderRadius: 8,
                  // height: "50%",
                  width: "60%",
                }}
              >
                <Text
                  style={{
                    marginHorizontal: "auto",
                    marginVertical: "auto",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  loginAttempt();
                }}
                style={{
                  marginTop: 20,
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    marginHorizontal: "auto",
                    marginVertical: "auto",
                    fontWeight: "600",
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <View style={{ marginTop: 20, paddingVertical: 10 }}>
                <GoogleSignInButton />
              </View>
              {/* <Button
              onPress={() => {
                signOut();
              }}
              title="Test Sign Out"
            ></Button> */}
            </>
          )}
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 25,
          }}
        >
          {!signUp ? (
            <Text
              onPress={() => {
                auth().signOut();
              }}
            >
              Don't have an account?{" "}
            </Text>
          ) : (
            <Text>Go back to </Text>
          )}
          {/* <Text style = {{color: 'blue'}} onPress={()=>{console.log(logininfo[0] + " " + logininfo[1])}}>Sign Up</Text> */}
          {!signUp ? (
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                toggleSignUp();
              }}
            >
              Sign Up
            </Text>
          ) : (
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                toggleSignUp();
              }}
            >
              Sign In
            </Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonView: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#746961",
  },
  accountText: {
    color: "#746961",
    fontSize: 20,
  },
  image: {
    width: "60%",
    resizeMode: "contain",
    height: "10%",
  },
});

export default WelcomeScreen;

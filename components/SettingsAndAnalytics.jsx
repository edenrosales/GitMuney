import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import {
  GoogleSignin,
  statusCodes,
  isSignedIn,
} from "@react-native-google-signin/google-signin";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Emoji from "./Emoji";
import SettingsCard from "./SettingsCard";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import { PlaidLink, LinkSuccess, LinkExit } from "react-native-plaid-link-sdk";
import {
  getPlaidLinkToken,
  useGenerateLinkToken,
  useLinkSuccess,
} from "../backend/PlaidConnector";
import { result } from "lodash";
import { useAccessToken } from "./ContextProvider";

const SettingsAndAnalytics = () => {
  const accessTokenContext = useAccessToken();
  const [linkToken, setLinkToken] = useState(undefined);
  const [accessToken, setAccessToken] = useState(undefined);
  useEffect(() => {
    setAccessToken(accessTokenContext);
  }, [accessTokenContext]);

  useEffect(() => {
    if (accessToken !== undefined) {
      (async () => {
        const response = await useGenerateLinkToken(accessToken);
        console.log(typeof response.link_token);
        setLinkToken(response.link_token);
      })();
    }
  }, [accessToken]);

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
  const resetBudgetPreferences = () => {
    firestore().collection("users").doc(auth().currentUser.uid).update({
      firstLogin: true,
    });
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // position: "absolute",
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
          Account and Settings
        </Text>
      </View>

      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          // marginTop: 20,
        }}
      >
        <View style={{ marginTop: 25 }}>
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
              PROFILE
            </Text>
          </View>
          <SettingsCard
            // backgroundStyles={{ backgroundColor: "#868380", opacity: 0.8 }}
            settingName={"Name"}
            settingIcon={"👶"}
            rightSideText={
              <Text style={{ position: "absolute", color: "black", right: 30 }}>
                Eden Rosales
              </Text>
            }
          ></SettingsCard>
          <View
            style={{
              alignItems: "center",
              marginBottom: 5,
              //STANDARD SEPARATION BETWEEN SECTIONS
              marginTop: 25,
            }}
          >
            <Text
              style={{
                width: "93%",
                color: "grey",
                fontFamily: "SSP-Regular",
              }}
            >
              ACCOUNTS
            </Text>
          </View>
          <SettingsCard
            // backgroundColor={"purple"}
            settingName={"Connected Accounts..."}
            settingIcon={"🏛️"}
            // backgroundStyles={{ backgroundColor: "#868380", opacity: 0.8 }}
          ></SettingsCard>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: 10,
            }}
          >
            {linkToken !== undefined && (
              <View
                style={{
                  height: 40,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#7a3cf5",

                  borderRadius: 30,
                }}
              >
                <PlaidLink
                  tokenConfig={{ token: linkToken }}
                  onSuccess={(success) => useLinkSuccess(success)}
                  onExit={(exit) => console.log(exit)}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "black",
                      fontFamily: "SSP-SemiBold",
                    }}
                  >
                    Connect Bank or Card
                  </Text>
                </PlaidLink>
              </View>
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 5,
              //STANDARD SEPARATION BETWEEN SECTIONS
              marginTop: 25,
            }}
          >
            <Text
              style={{
                width: "93%",
                color: "grey",
                fontFamily: "SSP-Regular",
              }}
            >
              MISC
            </Text>
          </View>
          <SettingsCard
            // backgroundColor={""}
            settingName={"Reset Budgetting Preferences"}
            settingIcon={"🔄"}
            specialFunction={resetBudgetPreferences}
          ></SettingsCard>
          <SettingsCard
            // backgroundColor={""}
            settingName={"Provide Feedback"}
            settingIcon={"💖"}
          ></SettingsCard>
          <SettingsCard
            // backgroundColor={""}
            settingName={"Visit us online!"}
            settingIcon={"🌐"}
          ></SettingsCard>
          <SettingsCard
            // backgroundColor={""}
            settingName={"Sign out..."}
            settingIcon={"👋🏽"}
            specialFunction={signOut}
          ></SettingsCard>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default SettingsAndAnalytics;

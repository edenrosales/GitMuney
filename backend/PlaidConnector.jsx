import React, { useContext, useState, useEffect, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import keys from "./../keys.json";

export const useUpdateTransactions = async () => {
  let response = await fetch("https://sandbox.plaid.com/transactions/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "63f3d7137ba715001385d56f",
      secret: "3c60f5b3d2a47477e80b96e6baacde",
    }),
  });
};

export const getAccessToken = async (publicToken) => {
  try {
    let response = await fetch(
      "https://sandbox.plaid.com/item/public_token/exchange",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "63f3d7137ba715001385d56f",
          secret: "3c60f5b3d2a47477e80b96e6baacde",
          public_token: publicToken,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getPlaidLinkToken = async (accessToken) => {
  //   return "this";
  try {
    let response;
    if (accessToken === "") {
      response = await fetch("https://sandbox.plaid.com/link/token/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "63f3d7137ba715001385d56f",
          secret: "3c60f5b3d2a47477e80b96e6baacde",
          client_name: "GitMuney",
          country_codes: ["US"],
          language: "en",
          user: {
            client_user_id: "123",
          },
          products: ["auth"],
          android_package_name: "com.edenrosales.FinanceTracker",
        }),
      });
    } else {
      response = await fetch("https://sandbox.plaid.com/link/token/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "63f3d7137ba715001385d56f",
          secret: "3c60f5b3d2a47477e80b96e6baacde",
          client_name: "GitMuney",
          country_codes: ["US"],
          language: "en",
          user: {
            client_user_id: "123",
          },
          products: ["auth"],
          android_package_name: "com.edenrosales.FinanceTracker",
          access_token: accessToken,
        }),
      });
    }

    data = await response.json();
    console.log(data);
    return data;
    // return await response.json();
    //   return data
  } catch (error) {
    console.log(error);
  }
};

export const useGenerateLinkToken = async (accessToken) => {
  const response = await getPlaidLinkToken(accessToken);
  console.log(response);
  console.log(typeof response.link_token);
  return response;
};

export const useLinkSuccess = async (success) => {
  // console.log(success);
  // console.log(typeof success.publicToken);
  const response = await getAccessToken(success.publicToken);

  firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .update({ accessToken: response.access_token, itemId: response.item_id })
    .catch((err) => console.log(err));
};

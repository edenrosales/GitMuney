import React from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider } from "./components/ContextProvider";
import Main from "./Main";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FirestoreUpdater from "./components/FirestoreUpdater";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <MenuProvider skipInstanceCheck>
          <Main />
          {/* <FirestoreUpdater></FirestoreUpdater> */}
        </MenuProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create();

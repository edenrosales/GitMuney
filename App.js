import React from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider } from "./components/ContextProvider";
import Main from "./Main";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FirestoreUpdater from "./components/FirestoreUpdater";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        {/* <FirestoreUpdater></FirestoreUpdater> */}
        <Main />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create();

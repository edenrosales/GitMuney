import React from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider } from "./components/ContextProvider";
import Main from "./Main";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create();

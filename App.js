import React from "react";
import { StyleSheet } from "react-native";

import { ThemeProvider } from "./components/ContextProvider";

import Main from "./Main";
export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create();

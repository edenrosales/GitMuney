import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button } from 'react-native';
import * as Progress from 'react-native-progress';
import Navigator from './routes/homeStack';

export default function App() {

  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create(

);

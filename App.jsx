import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
// import { ScrollView } from 'react-native-web';
import TopBarStats from './components/TopBarStats.jsx';

//we will have two fields called the total amount for the month, and the total spent for the month 


export default function App() {
  const [money,setTotalAmount] = useState({
    totalMoney: 1812, 
    totalSpent: 300
  }); 
  setTotalAmount
  return (
    <View style={styles.container}>
      <View style = {styles.TopBar}></View>
      <ScrollView>
        <View style = {{height: 200, backgroundColor: '#2C2E31', display: 'flex', alignItems: 'center'}}>
          <View style = {{position: 'absolute', left: 30, display:'flex', direction: 'row'}}>
            <Text style = {{position: 'relative', color:'white', fontSize: 65}}>${money.totalMoney- money.totalSpent }</Text>
            <Text style = {{position: 'relative'}}>this works</Text>
          </View>
          
          
          <Progress.Bar borderRadius = {8} progress = {money.totalSpent/ money.totalMoney} color = {'#414141'} width = {320} height = {15} style = {{position: 'relative', top: '70%'}}></Progress.Bar>
          
        </View>
        <View style = {{height: 100, backgroundColor: '#45494F'}}></View>
        <View style= {{height: 500, backgroundColor: '#45494F'}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
    // position: 'absolute'
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  TopBar: { 
    height: 27, 
    width: '100%',
    backgroundColor: '#252628'
  }
});

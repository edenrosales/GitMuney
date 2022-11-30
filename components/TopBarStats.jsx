import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import {styles} from 'C:\Users\eden\React Native\FinanceTracker\components\styles.jsx'

class TopBarStats extends Component {
    render() {
      return (
        <View>        
          <View style = {styles.StatusBar}/>
          <View style = {styles.TopBar}/>
        </View>

      )

    }
  }

  const styles = StyleSheet.create({
    TopBar: {
      position: 'absolute',
      backgroundColor: '#2C2E31',
      height: '60%',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0, 
      right: 0


    },
    StatusBar: { 
      position: 'absolute',
      backgroundColor: '#252628',
      height: '9%'
    }
  });
export default TopBarStats;


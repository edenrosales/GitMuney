import { Text, View , StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import * as Progress from 'react-native-progress';
export default class Categories extends Component {
  render() {
    return (
    
      <View>
      
        <View style={styles.categories}>
            {/* <Categories remove = {() => this.remove()}></Categories> */}
            <TouchableOpacity>
                <Text style={[styles.recTran, {marginTop: 10}]}>Groceries</Text>
            </TouchableOpacity>
            <Progress.Bar progress={0.15} width={this.props.pixel80percent}
                borderRadius={10} height={20} color={'tomato'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
            <Text style={[styles.recTran, {marginTop: 10}]}>Rent</Text>
            <Progress.Bar progress={0.45} width={this.props.pixel80percent}
                borderRadius={10} height={20} color={'dodgerblue'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
            <Text style={[styles.recTran, {marginTop: 10}]}>Gas</Text>
            <Progress.Bar progress={0.23} width={this.props.pixel80percent}
                borderRadius={10} height={20} color={'yellow'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
        </View>
        <Text style={[styles.recTran, {padding: 10}]}>Recent Transactions</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    categories: {
      padding: 10,
    },
    recTran:{
      color: 'white',
      fontSize: 25
    }
})
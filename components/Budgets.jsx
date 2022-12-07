import React, {Component} from 'react';
import {Text, View, StyleSheet, Modal, TextInput,Button} from 'react-native';
import * as Progress from 'react-native-progress';
const Budgets = (props) =>{
    return(
        <View>
        {props.budget.map((item) =>
        {
          return(
            <View key={item.key} style= {{margin: 0}} >
              <Text style = {{marginTop: 10, left: 10, color: 'white',fontSize: 25}}>{item.title}</Text>
              <View style={{display:'flex', width:'100%', flexDirection: 'row', justifyContent: 'center'}}>
                <Progress.Bar  borderColor={'#414141'}  unfilledColor = {'#414141'} color = {item.color}  style = {{display: 'flex'}} progress={item.amountSpent/ item.budgetAmount} width={props.pixel80Percent} borderRadius={10} height={20}/>
              </View>
            </View>
          );
        })}
      </View>
    )
}

export default Budgets;
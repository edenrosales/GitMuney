import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Input, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";

export default function ViewAccountScreen() {

const [people, setPeople] = useState([
  { title: 'E-bike Jetson', amount: 276.13, date: 'Nov 9', type: 'p', key: '1' },
  { title: 'iPhone 14', amount: 1311.98, date: 'Nov 11', type: 'p', key: '2'},
  { title: '', amount: 40, date: 'Nov 11', type: 'd', key: '3'},
  { title: '', amount: 50, date: 'Nov 12', type: 'd', key: '4'},
  { title: 'Macbook Air', amount: 881.21, date: 'Nov 16', type: 'p', key: '5'},
  { title: '', amount: 120, date: 'Nov 21', type: 'd', key: '6'},
  { title: 'Subway', amount: 11.13, date: 'Nov 21', type: 'p', key: '7'},
  { title: 'El Pollo Loco', amount: 7.66, date: 'Nov 29', type: 'p', key: '8'},
  { title: '', amount: 50, date: 'Dec 2', type: 'd', key: '9'},
]);
const [isTraModalVisible, setIsTraModalVisible] = useState(false);

const handleTraModal = () => setIsTraModalVisible(() => !isTraModalVisible);

const [isDepModalVisible, setIsDepModalVisible] = useState(false);

const handleDepModal = () => setIsDepModalVisible(() => !isDepModalVisible);

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <View style={styles.titleContainer}>
        <Text>
          <Text style={styles.title}>$1,812</Text>
          <Text style={{fontSize: 40, color: 'white'}}> Left</Text>
        </Text>
        <Text style={{color: 'white', paddingBottom: 10}}>
          Month Started With: $5,000
        </Text>
        <Progress.Bar progress={0.3} width={400}
        borderRadius={10} height={20} color={'#414141'} unfilledColor={'#d9d9d9'}/>
        <View style={{paddingTop: 10, alignItems: 'flex-start'}}>
          <Button color='tomato' title="Add Transaction" onPress={handleTraModal}/>
          <Button color='greenyellow' title="Deposit" onPress={handleDepModal}/>
        </View>
      </View>

      <Modal isVisible={isTraModalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalViewable}>
            <Text style={styles.modalTitle}>Add a Transaction</Text>
            <View>
              <Text style={styles.modalText}>Transaction Title</Text>
              <TextInput placeholderTextColor={'gray'}
              style={styles.input}
              placeholder='e.g Turkey Sandwich'/>
              <Text style={styles.modalText}>Transaction Amount</Text>
              <TextInput placeholderTextColor={'gray'}
              style={styles.input}
              placeholder='e.g $13.45'/>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button title="Add" onPress={handleTraModal} />
              <Button title="Cancel" onPress={handleTraModal} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isDepModalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalViewable}>
          <Text style={styles.modalTitle}>Make a Deposit</Text>
            <View>
              <Text style={styles.modalText}>Deposit Amount</Text>
              <TextInput placeholderTextColor={'gray'}
              placeholder={'e.g $100'} style={styles.input}/>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button title="Deposit" onPress={handleDepModal} />
              <Button title="Cancel" onPress={handleDepModal} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.categories}>
        <Text style={[styles.recTran, {marginTop: 10}]}>Groceries</Text>
        <Progress.Bar progress={0.15}width={400}
          borderRadius={10} height={20} color={'tomato'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
        <Text style={[styles.recTran, {marginTop: 10}]}>Rent</Text>
        <Progress.Bar progress={0.45}width={400}
          borderRadius={10} height={20} color={'dodgerblue'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
        <Text style={[styles.recTran, {marginTop: 10}]}>Gas</Text>
        <Progress.Bar progress={0.23}width={400}
          borderRadius={10} height={20} color={'yellow'} unfilledColor={'#d9d9d9'} borderWidth={0}/>
      </View>

      <Text style={[styles.recTran, {padding: 10}]}>Recent Transactions</Text>
      <FlatList
        style={styles.fStyle}
        data={people}
        renderItem={({item}) => (
          <View style={styles.topGroup}>
            <View style={styles.tranGroup}>
              <Text style={styles.item}>
                {item.title == '' ? 'Deposit' : item.title}
              </Text>
              <Text style={[styles.item, {color:(item.type == 'p') ? 'tomato' : 'greenyellow'}]}>${item.amount}</Text>
            </View>
            <Text style={{color: '#999', fontSize: 20, paddingLeft: 10}}>
              {item.date}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 60,
    color: 'white',
  },
  titleContainer:{
    backgroundColor: '#2d2e30',
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#45494f',
  },
  categories: {
    padding: 10,
  },
  item: {
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 20,
    color: 'white',
  },
  fStyle:{
    flex: 1,
    marginBottom: 40,
  },
  recTran:{
    color: 'white',
    fontSize: 25
  },
  topGroup:{
    borderColor: 'black',
    borderTopWidth: 0.7,
    paddingBottom: 10,
  },
  tranGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalViewable:{
    borderRadius: 10,
    width: '100%',
    height: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2d2e30',
  },
  modalTitle:{
    fontSize: 30,
    color: 'white',
  },
  modalText:{
    color: 'white',
  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    color: 'white',
    padding: 8,
    margin: 10,
    width: 200,
  }
});
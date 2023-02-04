import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Input, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";
import TransactionModal from '../components/TransactionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import TopBarStats from '../components/TopBarStats';
import Categories from '../components/Categories';
import {useFB} from './../components/ContextProvider'
import { HeaderBackButton } from 'react-navigation-stack';
import { getAuth, signOut} from "firebase/auth"
// const PocketBase = require('pocketbase/cjs');


export default function ViewAccountScreen({route,navigation}) {
  // console.log(route.params);
  const auth = getAuth();

  const handleBack = () =>{ 
    signOut(auth).then(()=>{
      console.log("Signed out")
      navigation.navigate('Home')
    })
    .catch((error) =>{
      console.log(error)
    })
  }
  const [testInfo, setTest] = useState();

  const [transactionInput, setTransactionInput] = useState(["", ""]); 

  const [totalSpent, setTotalSpent] = useState(2234.56);

  const [depositInput, setDepositInput] = useState("");

  const [categories,setCategories] = useState(["Groceries","Rent","Gas"]);

  const [myBudgetInput, setMyBudgetInput] = useState("");

  const [curKeyValue, setCurKeyValue] = useState();

  const [myBudget, setMyBudget] = useState(5000);

  const [expenses, setExpenses] = useState([
    { title: 'E-bike Jetson', amount: 276.13, date: '12/6/2022, 10:34:22', type: 'p', key: uuid.v4(), category: "Groceries" },
    { title: 'iPhone 14', amount: 1311.98, date: '12/6/2022, 10:34:22', type: 'p', key: uuid.v4(), category: "Groceries" },
    { title: '', amount: 40, date: '12/6/2022, 10:34:22', type: 'd', key: uuid.v4(), category: "Groceries" },
    { title: '', amount: 50, date: '12/6/2022, 10:34:22', type: 'd', key: uuid.v4(), category: "Groceries" },
    { title: 'Macbook Air', amount: 881.21, date: '12/6/2022, 10:34:22', type: 'p', key: uuid.v4(), category: "Groceries" },
    { title: '', amount: 120, date: '12/6/2022, 10:34:22', type: 'd', key: uuid.v4(), category: "Groceries" },
    { title: 'Subway', amount: 11.13, date: '12/6/2022, 10:34:22', type: 'p', key: uuid.v4(), category: "Groceries" },
    { title: 'El Pollo Loco', amount: 7.66, date: '12/6/2022, 10:34:22', type: 'p', key: uuid.v4(), category: "Rent" },
    { title: '', amount: 50, date: '12/6/2022, 10:34:22', type: 'd', key: uuid.v4(), category: "Groceries" },
  ]);

  const remove = async() => {
    try{
      await AsyncStorage.removeItem("MyList");
      await AsyncStorage.removeItem("TotalSpent");
      await AsyncStorage.removeItem("MyBudget");
    } catch(error){
      alert(error);
    } finally {
      setExpenses(expenses);
      setTotalSpent(totalSpent);
      setMyBudget(myBudget);
    }
  }

  const save = async() => {
    try{
      await AsyncStorage.setItem("MyList", JSON.stringify(expenses));
      await AsyncStorage.setItem("TotalSpent", totalSpent.toString());
      await AsyncStorage.setItem("MyBudget", myBudget.toString());
    } catch(error){
      alert(error);
    }
  }

  const load = async() => {
    try{
      let expenses = await AsyncStorage.getItem("MyList");
      let totalSpent = await AsyncStorage.getItem("TotalSpent");
      let fTotalSpent = parseFloat(totalSpent);
      let myBudget = await AsyncStorage.getItem("MyBudget");
      let intMyBudget = parseInt(myBudget);

      if(expenses !== null){
        setExpenses(JSON.parse(expenses));
      }
      if(totalSpent !== null){
        setTotalSpent(fTotalSpent);
      }
      if(myBudget !== null){
        setMyBudget(intMyBudget);
      }
    } catch(error){
      alert(error);
    }
  }

  useEffect( () => {
    navigation.setOptions({
          headerLeft: ()=>{
            return <HeaderBackButton style = {{tontColor: '#746961', marginLeft: 0}} onPress = {()=>(handleBack())}/>
          }
      });
  },[])

  const addTransaction = () => {
    expenses.unshift({
      title: transactionInput[0],
      amount: transactionInput[1],
      date: new Date().toLocaleString(),
      type: 'p',
      key: curKeyValue
    });
    setTotalSpent(totalSpent + parseFloat(transactionInput[1]));
    setCurKeyValue(uuid.v4());
    transactionInput[0] = "";
    transactionInput[1] = "";
  }

  const addDeposit = () => {
    expenses.unshift({
      title: '',
      amount: depositInput,
      date: new Date().toLocaleString(),
      type: 'd',
      key: curKeyValue
    });
    setTotalSpent(totalSpent - parseFloat(depositInput));
    setCurKeyValue(uuid.v4());
    setDepositInput("");
  }

  const addBudget = () => {
    setMyBudget(myBudgetInput);
    setMyBudgetInput(myBudget);
  }

  const [isTraModalVisible, setIsTraModalVisible] = useState(false);

  const handleTraModal = () => setIsTraModalVisible(() => !isTraModalVisible);

  const [isDepModalVisible, setIsDepModalVisible] = useState(false);

  const handleDepModal = () => setIsDepModalVisible(() => !isDepModalVisible);

  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);

  const handleBudgetModal = () => setIsBudgetModalVisible(() => !isBudgetModalVisible);



  const screenWidth = Dimensions.get('window').width; 
  // console.log(screenWidth)
  const pixel80percent = (screenWidth/100) * 90;
    return (
      //going to try to get state to work here and get it into components
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <Modal isVisible={isTraModalVisible}>
                  <View style={styles.modalView}>
                    <View style={styles.modalViewable}>
                      <Text style={styles.modalTitle}>Add a Transaction</Text>
                      <View>
                        <Text style={styles.modalText}>Transaction Title</Text>
                        <TextInput value = {transactionInput[0]}
                        onChangeText = {(text) => setTransactionInput([text, transactionInput[1]])}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        placeholder='e.g Turkey Sandwich'/>
                        <Text style={styles.modalText}>Transaction Amount</Text>
                        <TextInput value = {transactionInput[1]}
                        onChangeText = {(text) => setTransactionInput([transactionInput[0], text])}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        placeholder='e.g $13.45'/>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Button title="Add" onPress={() => {
                          handleTraModal();
                          addTransaction();
                          save();
                        }} />
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
                <TextInput value = {depositInput}
                onChangeText = {(text) => setDepositInput(text)}
                placeholderTextColor={'gray'}
                placeholder={'e.g $100'} style={styles.input}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Button title="Deposit" onPress={()=>{
                  handleDepModal();
                  addDeposit();
                  save();
                }} />
                <Button title="Cancel" onPress={handleDepModal} />
              </View>
            </View>
          </View>
        </Modal>

        <Modal isVisible={isBudgetModalVisible}>
          <View style={styles.modalView}>
            <View style={styles.modalViewable}>
            <Text style={styles.modalTitle}>Set a Budget</Text>
              <View>
                <Text style={styles.modalText}>Budget Amount</Text>
                <TextInput value = {myBudgetInput}
                onChangeText = {(text) => setMyBudgetInput(text)}
                placeholderTextColor={'gray'}
                placeholder={'e.g $100'} style={styles.input}/>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Button title="Set Budget" onPress={()=>{
                  handleBudgetModal();
                  addBudget();
                  save();
                }} />
                <Button title="Cancel" onPress={handleBudgetModal} />
              </View>
            </View>
          </View>
        </Modal>

        <FlatList
          ListHeaderComponent={() => {
            return(
              <View>
                <TopBarStats myBudget = {myBudget} totalSpent = {totalSpent} pixel80percent = {pixel80percent} handleTraModal = {handleTraModal} handleDepModal = {handleDepModal} handleBudgetModal = {handleBudgetModal}></TopBarStats>
                <Categories remove={remove} pixel80percent = {pixel80percent}></Categories>
                <Button title = "log info" onPress={()=>{ 
                
                  }}/>
              </View>
            )
          }}
          style={styles.fStyle}
          data={expenses}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingLeft: 20,
    paddingTop: 5
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

import React, { useEffect,useState } from 'react';
import {Button, TextInput} from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {useFB, useDB} from './../components/ContextProvider'
import { collection, getDocs } from "firebase/firestore";

function WelcomeScreen({ navigation }) {
    const fb = useFB() 
    const db = useDB()
    const pressHandler = async () => {
        navigation.navigate("ViewAccount")
    }
    const [logininfo, setLogininfo] = useState(["",""])

    const loginAttempt = async () => {
        navigation.navigate("ViewAccount")
    }
    const log = async ()=>{
        console.log(db)
        try{
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <Image style={styles.image} source={require('../assets/gitMunnyLogo.png')}/>
            <Text>Username:</Text>
            <TextInput value = {logininfo[0]} onChangeText = {(text) => setLogininfo([text,logininfo[1]])} placeholderTextColor={'gray'}/>
            <Text>Password:</Text>
            <TextInput value = {logininfo[1]} onChangeText = {(text) => setLogininfo([logininfo[0],text])} placeholderTextColor={'gray'}/>
            <Button title = "Submit" onPress = {()=>{
                loginAttempt();
            }}/>
            <Button title ="log info" onPress = {()=>{
                log();
            }} />
            {/* <TouchableOpacity
            style={styles.buttonView}
            onPress={pressHandler}>
                <Text style={styles.accountText}>Go To My Account</Text>
            </TouchableOpacity> */}
        </>
    );
}

const styles = StyleSheet.create({
    buttonGroup:{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonView:{
        padding: 20,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#746961',
    },
    accountText:{
        color: '#746961',
        fontSize: 20,
    },
    image:{
        width: '60%',
        resizeMode: 'contain',

    }
})

export default WelcomeScreen;
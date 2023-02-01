import React, { useEffect,useState } from 'react';

import {Button, TextInput} from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import PocketBase from 'pocketbase';
import {usePB} from './../components/ContextProvider'
function WelcomeScreen({ navigation }) {
    const pb = usePB() 
    const pressHandler = async () => {
        try{

            // updatePB(pb)
            navigation.push('ViewAccount');
        }
        catch(err){
            console.log(err)
        }
    }
    const [logininfo, setLogininfo] = useState(["",""])

    const loginAttempt = async () => {
        try{
            console.log("trying")
            const authData = await pb.collection('users').authWithPassword(
                'edenrosales',
                '12345678',
            )
            console.log(pb.authStore.isValid)
            console.log("im here")
            navigation.push('ViewAccount')
            
        }
        catch(err){
            console.log(err)
            setLogininfo(()=>{
                return ["",""]
            })
        }
    }
    const log = ()=>{
        console.log(pb)
        console.log(pb.authStore.isValid)
        // console.log(pb.authStore.isValid)
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
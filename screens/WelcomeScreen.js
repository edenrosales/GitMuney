import React, { useEffect,useState } from 'react';
import {Button, Pressable, TextInput} from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {useFB, useDB, useAuth, useUserUpdate, useUser} from './../components/ContextProvider'
import { collection, getDocs } from "firebase/firestore";
import { isSignInWithEmailLink, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function WelcomeScreen({ navigation }) { 
    const fb = useFB() 
    // const db = useDB()
    const auth = getAuth()
    // const user = useUser()
    // const userUpdate = useUserUpdate()
    const [logininfo, setLogininfo] = useState(["",""])

    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        if(user){
            unsubscribe()
            navigation.navigate("ViewAccount")
        }
        else{ 

        }
    })

    const loginAttempt = async () => {
        signInWithEmailAndPassword(auth,logininfo[0],logininfo[1])
            .then((userCredential)=>{
                setLogininfo(["",""])
                navigation.navigate("ViewAccount")
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message
                console.log(errorCode)
            });
        
        // navigation.navigate("ViewAccount")
    }
    return (
        <View style = {{position:'relative',display: 'flex', flexDirection:'column', width: '100%', height: '100%', alignItems:'center',justifyContent:'center'}}>
            <Image style={styles.image} source={require('../assets/gitMunnyLogo.png')}/>
            <View style = {{position: 'relative', width: '70%',display:'flex',flexDirection:'column', marginTop:20 }}>
                <Text style= {{  }}>Email:</Text>
                <TextInput placeholder='example@email.com' style = {{position:'relative', borderBottomWidth: 1, width: '100%', marginLeft: 'auto',marginRight:'auto'}} value = {logininfo[0]} onChangeText = {(text) => setLogininfo([text,logininfo[1]])} placeholderTextColor={'gray'}/>
            </View>
            <View style = {{ position: 'relative', width: '70%', display:'flex', flexDirection: 'column', marginTop: 15}}>
                <Text>Password:</Text>
                <TextInput placeholder= 'Password' style = {{position:'relative', borderBottomWidth: 1, width: '100%', marginLeft: 'auto',marginRight:'auto'}} value = {logininfo[1]} onChangeText = {(text) => setLogininfo([logininfo[0],text])} placeholderTextColor={'gray'}/>
            </View>
            <View style= {{width: '65%', display:'flex', flexDirection:'row', justifyContent: 'space-around', marginTop: 10}}>
                <TouchableOpacity onPress={()=>{ loginAttempt()}} style= {{marginTop: 20, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 1, borderWidth: 1, borderRadius: 8}}>
                    <Text style= {{marginHorizontal: 'auto', marginVertical: 'auto', fontWeight: '600'}}>Sign In</Text>
                </TouchableOpacity>
                {/*Code below is for auth with google or another service*/}
                <TouchableOpacity style= {{marginTop: 20, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 1, borderWidth: 1, borderRadius: 8}}>
                <Text style= {{marginHorizontal: 'auto', marginVertical: 'auto', fontWeight: '600'}}>Google</Text>
            </TouchableOpacity>
            </View>
            <View style = {{width: '100%',display: 'flex', flexDirection: 'row', justifyContent:'center',marginTop: 25}}>
                <Text>Don't have an account?  </Text>
                <Text style = {{color: 'blue'}} onPress={()=>{console.log("this works")}}>Sign Up</Text>
            </View>
        </View>
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
        height: '10%'

    }
})

export default WelcomeScreen;
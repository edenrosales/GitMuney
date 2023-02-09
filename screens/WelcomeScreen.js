import React, { useEffect,useState, useRef } from 'react';
import {Button, Pressable, TextInput, Animated, Dimensions} from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {useFB, useDB, useAuth, useUserUpdate, useUser} from './../components/ContextProvider'
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import GoogleSignInButton  from './../components/GoogleSignInButton'
// Somewhere in your code

//847719830073-snge66gi4rifitllc9uvpklc6tnlahhc.apps.googleusercontent.com
// GoogleSignin.configure({
//     webClientId:  '847719830073-snge66gi4rifitllc9uvpklc6tnlahhc.apps.googleusercontent.com',
//   });
function WelcomeScreen({ navigation }) {
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; 
      }, []);
    const onAuthStateChanged = () =>{
        console.log(auth().currentUser)
    }
    // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         this.setState({ userInfo });
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //         } else {
    //         // some other error happened
    //         }
    //     }
    // };
    const fb = useFB() 


    const [logininfo, setLogininfo] = useState(["",""])
    const loginAttempt = () => { 
        if(!logininfo[0] || !logininfo[1]){
            return 
        }
        try{
            auth()
            .signInWithEmailAndPassword(logininfo[0],logininfo[1])
        }
        catch(error){
            console.log(error)
        }
    }
    const autosignin = ()=>{
        auth().signInWithEmailAndPassword("eden@rosales5.com","12345678")
        .then(()=>{
            navigation.navigate("ViewAccount")
        })
    }
    return (
        <>
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
                <View style= {{width: '65%', display:'flex', flexDirection:'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10}}>
                        
                        <TouchableOpacity onPress={()=>{ loginAttempt()}} style= {{marginTop: 20, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 1, borderWidth: 1, borderRadius: 8}}>
                            <Text style= {{marginHorizontal: 'auto', marginVertical: 'auto', fontWeight: '600'}}>Sign In</Text>
                        </TouchableOpacity>
                        <View style = {{marginTop: 20, paddingVertical: 10}}>
                            {/* <Button title = "Google Sign-Inaaa" onPress={() => signIn()}/> */}
                            <GoogleSignInButton></GoogleSignInButton>
                        </View>
                </View>
                <View style = {{width: '100%',display: 'flex', flexDirection: 'row', justifyContent:'center',marginTop: 25}}>
                    <Text>Don't have an account?  </Text>
                    {/* <Text style = {{color: 'blue'}} onPress={()=>{console.log(logininfo[0] + " " + logininfo[1])}}>Sign Up</Text> */}
                    <Text style = {{color: 'blue'}} onPress={()=>{auth().signInWithEmailAndPassword('eden@rosales5.com','12345678')}}>Sign Up</Text>
                </View>
                <Button title = "test this" onPress={()=>{console.log(auth().currentUser)}} />
                <Button title = "sign out" onPress ={() =>{auth().signOut()}} />
            </View>
            {/* <Animated.View style = {{position:'absolute',
            transform: [{translateY: modalTransition}]
            , height: '75%', width:'100%', zIndex: 1, backgroundColor: 'white', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                
            </Animated.View> */}
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
        height: '10%'

    }
})

export default WelcomeScreen;
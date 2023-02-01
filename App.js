import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList, Button } from 'react-native';
import * as Progress from 'react-native-progress';
// import Navigator from './routes/homeStack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { HeaderBackButton } from 'react-navigation-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ViewAccountScreen from './screens/ViewAccountScreen';
import { ThemeProvider } from './components/ContextProvider';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    // <Navigator/>

    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name = "Home" component={WelcomeScreen} options ={{ gestureDirection:'horizontal', title: 'Home',headerTintColor: '#746961', headerStyle:{ backgroundColor: '#2d2e30'}}} />
          <Stack.Screen name = "ViewAccount" component={ViewAccountScreen} options ={{ 
            gestureDirection:'horizontal', 
            title: 'Logout',
            headerTintColor: '#746961', 
            headerStyle:{ backgroundColor: '#2d2e30'},
            headerMode: 'screen',
            // headerLeft: () => (
            // <Button
            //   onPress={() => alert('This is a button!')}
            //   title="Info"
            //   color="#fff"
            // />
            // ),


            // headerLeft: ()=>{
            //   return <HeaderBackButton style = {{tontColor: '#746961', marginLeft: 0}} onPress = {()=>(handleBack())}/>
            // }
            }}/>
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create(

);

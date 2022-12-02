import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';

function WelcomeScreen({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('ViewAccount');
    }

    return (
        <ImageBackground style={styles.buttonGroup}
        source={require('../assets/Simple.png')} resizeMode='cover'>
            <Image style={styles.image} source={require('../assets/gitMunnyLogo.png')}/>
            <TouchableOpacity
            style={styles.buttonView}
            onPress={pressHandler}>
                <Text style={styles.accountText}>Go To My Account</Text>
            </TouchableOpacity>
        </ImageBackground>
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
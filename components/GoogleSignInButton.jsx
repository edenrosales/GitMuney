import React from "react";
import { Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

const GoogleSignInButton = (props) => {
  const onGoogleButtonPress = async () => {
    GoogleSignin.configure({
      webClientId:
        "847719830073-snge66gi4rifitllc9uvpklc6tnlahhc.apps.googleusercontent.com",
    });
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <Button
      title="Google Sign-In"
      onPress={() => {
        onGoogleButtonPress()
          .then(() => {
            console.log("this works");
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    />
  );
};

export default GoogleSignInButton;

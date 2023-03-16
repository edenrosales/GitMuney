import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Button,
  Text,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const DepositModal = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [depositInput, setDepositInput] = useState("");

  const addDeposit = () => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .add({
        transactionName: "Deposit",
        isWithdrawl: false,
        category: "Misc",
        cost: parseFloat(depositInput),
        date: firestore.Timestamp.now(),
      });
    setDepositInput("");
  };

  return (
    <View>
      <View>
        <Button
          color="greenyellow"
          title="Deposit Money"
          onPress={() => setVisible((prev) => !prev)}
        />
      </View>
      <Modal
        isVisible={isVisible}
        avoidKeyboard={false}
        onBackdropPress={() => setVisible(false)}
        statusBarTranslucent={true}
      >
        {/* <View style={styles.modalView}> */}
        <View style={styles.modalViewable}>
          <Text style={styles.modalTitle}>Make a Deposit</Text>
          <View>
            <Text style={styles.modalText}>Deposit Amount</Text>
            <TextInput
              value={depositInput}
              onChangeText={(text) => {
                if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                  setDepositInput(text);
                }
              }}
              inputMode={"numeric"}
              placeholderTextColor={"gray"}
              placeholder={"e.g $100"}
              style={styles.input}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="Deposit"
              onPress={() => {
                setVisible((prev) => !prev);
                addDeposit();
              }}
            />
            <Button
              title="Cancel"
              onPress={() => setVisible((prev) => !prev)}
            />
          </View>
        </View>
        {/* </View> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    color: "white",
  },
  titleContainer: {
    backgroundColor: "#2d2e30",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    // paddingLeft: 20,
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#45494f",
  },
  categories: {
    padding: 10,
  },
  item: {
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 20,
    color: "white",
  },
  fStyle: {
    flex: 1,
    marginBottom: 40,
  },
  recTran: {
    color: "white",
    fontSize: 25,
  },
  topGroup: {
    borderColor: "black",
    borderTopWidth: 0.7,
    paddingBottom: 10,
  },
  tranGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewable: {
    borderRadius: 10,
    width: "100%",
    height: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2d2e30",
  },
  modalTitle: {
    fontSize: 30,
    color: "white",
  },
  modalText: {
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    color: "white",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default DepositModal;

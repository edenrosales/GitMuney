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
const BudgetModal = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [myBudgetInput, setMyBudgetInput] = useState("");
  const addBudget = () => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .update({
        budget: parseFloat(myBudgetInput),
      })
      .then(() => {
        setMyBudgetInput("");
      });
  };

  return (
    <View>
      <View>
        <Button
          color="yellow"
          title="Set Budget"
          onPress={() => setVisible((prev) => !prev)}
        />
      </View>
      <Modal
        isVisible={isVisible}
        avoidKeyboard={false}
        onBackdropPress={() => setVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={styles.modalViewable}>
          <Text style={styles.modalTitle}>Set a Budget</Text>
          <View>
            <Text style={styles.modalText}>Budget Amount</Text>
            <TextInput
              value={myBudgetInput}
              onChangeText={(text) => {
                if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                  setMyBudgetInput(text);
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
              title="Set Budget"
              onPress={() => {
                setVisible((prev) => !prev);
                addBudget();
              }}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setVisible((prev) => !prev);
              }}
            />
          </View>
        </View>
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

export default BudgetModal;

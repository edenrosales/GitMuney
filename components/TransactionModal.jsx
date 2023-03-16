import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const TransactionModal = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [transactionInput, setTransactionInput] = useState(["", ""]);
  const [pickerValue, setPickerValue] = useState("Select a Value");
  const addTransaction = () => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("transactions")
      .add({
        category: pickerValue,
        cost: parseFloat(transactionInput[1]),
        isWithdrawl: true,
        transactionName: transactionInput[0],
        date: firestore.Timestamp.now(),
      })
      .then(() => console.log("this owrked"));
    firestore().collection("users").add({
      name: "test",
    });
    setTransactionInput(["", ""]);
    setPickerValue("Select a Value");
  };
  // console.log(props.categories);
  return (
    <View>
      <View>
        <Button
          color="tomato"
          title="Add Transaction"
          onPress={() => {
            setVisible((prev) => !prev);
          }}
        />
      </View>
      <Modal
        isVisible={isVisible}
        avoidKeyboard={false}
        onBackdropPress={() => setVisible(false)}
        statusBarTranslucent={true}
      >
        {/* <View style={styles.modalView}> */}
        {/* <StatusBar hidden /> */}
        <View style={styles.modalViewable}>
          <Text style={styles.modalTitle}>Add a Transaction</Text>
          <View>
            <Text style={styles.modalText}>Transaction Title</Text>
            <TextInput
              value={transactionInput[0]}
              onChangeText={(text) =>
                setTransactionInput([text, transactionInput[1]])
              }
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder="e.g Turkey Sandwich"
            />
            <Text style={styles.modalText}>Transaction Amount</Text>
            {/* inputMode={"numeric"}
            onChangeText=
            {(text) => {
              const filteredText = text.replace(/[^0-9]+/, "");
              setBudget(filteredText);
            }} */}
            <TextInput
              value={transactionInput[1]}
              onChangeText={(text) => {
                if (/^[0-9]*\.?[0-9]*$/.test(text)) {
                  setTransactionInput([transactionInput[0], text]);
                }
              }}
              inputMode={"numeric"}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder="e.g $13.45"
            />
            <Text style={styles.modalText}>Category</Text>
            {/* {console.log(categories.map((values) => values.name))} */}
            {props.categories !== undefined ? (
              <Picker
                selectedValue={pickerValue}
                onValueChange={(itemValue, itemIndex) =>
                  setPickerValue(itemValue)
                }
                style={{ color: "white" }}
              >
                <Picker.Item
                  style={{ color: "black" }}
                  label="Select a Value"
                  value="Select a Value"
                  key="Select a Value"
                ></Picker.Item>
                {Object.values(props.categories).map((values) => {
                  return (
                    <Picker.Item
                      style={{ color: "black" }}
                      label={values.key}
                      value={values.key}
                      key={values.key}
                    ></Picker.Item>
                  );
                })}
              </Picker>
            ) : null}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="Add"
              onPress={() => {
                if (
                  transactionInput[0] == "" ||
                  transactionInput[1] == "" ||
                  pickerValue == "Select a Value"
                ) {
                  console.log("Fill out the form completely");
                  return;
                }
                setVisible((prev) => !prev);
                addTransaction();
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
    flex: 0.75,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingTop: 40,
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

export default TransactionModal;

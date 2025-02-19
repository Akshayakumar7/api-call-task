import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateAllFields = () => {
    if (userName !== "Luke Skywalker") {
      setUserNameError("Please check username and password");
      return false;
    }
    if (password !== "19BBY") {
      setPasswordError("Please check username and password");
      return false;
    }
    return true;
  };

  const onPressLogin = () => {
    let validate = validateAllFields();
    if (validate) {
      navigation.navigate("Search");
    }
  };

  const onChangeUserName = (e) => {
    setUserName(e);
    setUserNameError("");
  };

  const onChangePassword = (e) => {
    setPassword(e);
    setPasswordError("");
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.loginTextStyle}>Login</Text>
      <TextInput
        placeholder="EnterUser name"
        style={styles.textinputStyle}
        onChangeText={(e) => onChangeUserName(e)}
        value={userName}
      />
      {userNameError && (
        <Text style={styles.errorTextStyle}>{userNameError}</Text>
      )}
      <TextInput
        placeholder="Enter Password"
        style={styles.textinputStyle}
        secureTextEntry={true}
        onChangeText={(e) => onChangePassword(e)}
        value={password}
      />
      {passwordError && (
        <Text style={styles.errorTextStyle}>{passwordError}</Text>
      )}
      <Pressable style={styles.buttonStyle} onPress={() => onPressLogin()}>
        <Text style={styles.buttonTextStyle}>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginTextStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  textinputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: "skyblue",
    width: "90%",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  errorTextStyle: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
});

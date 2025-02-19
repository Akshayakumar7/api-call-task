import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const storedReduxData = () => {
  const Users = useSelector((state) => state?.users?.users);

  console.log("Users", Users);

  return (
    <View>
      <Text>storedReduxData</Text>
    </View>
  );
};

export default storedReduxData;

const styles = StyleSheet.create({});

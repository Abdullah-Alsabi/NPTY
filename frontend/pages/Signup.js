import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Signup({ navigation }) {
  return (
    <View>
      <Text>Signup</Text>
      <Button
        title="Signup in NPTY to sell your products !"
        onPress={() => navigation.navigate("Signin", { name: "Jane" })}
      />
    </View>
  );
}

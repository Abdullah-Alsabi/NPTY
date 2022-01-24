import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <Button
      title="Signup in NPTY to sell your products !"
      onPress={() => navigation.navigate("Signup", { name: "Jane" })}
    />
  );
}

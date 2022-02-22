import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Ad from "./pages/Ad";
import Ads from "./pages/Ads";
// import CreateAd from "./pages/CreateAd";
import ForgetPassword from "./pages/ForgetPassword";
import HomeScreen from "./pages/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { NativeBaseProvider } from "native-base";
import axios from "axios";
const Stack = createNativeStackNavigator();
axios.defaults.baseURL =
  "http://e928-2001-16a2-c015-93a7-d8cd-8ee8-ba4-9426.ngrok.io ";

// botom tab navaigtor
export default function App() {
  // <View style={styles.container}>
  //     <Text style={styles.textColor}>Welcome to NPTY</Text>
  //   </View>
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Ads" component={Ads} />
          <Stack.Screen name="Ad" component={Ad} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textColor: {
    color: "blue",
  },
  headerTitle: {
    fontSize: 20,
  },
});

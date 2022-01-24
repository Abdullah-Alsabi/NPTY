import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Ad from "./pages/Ad";
import Ads from "./pages/Ads";
import CreateAd from "./pages/CreateAd";
import ResetPassword from "./pages/ResetPassword";
import HomeScreen from "./pages/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
  // <View style={styles.container}>
  //     <Text style={styles.textColor}>Welcome to NPTY</Text>
  //   </View>
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
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
});

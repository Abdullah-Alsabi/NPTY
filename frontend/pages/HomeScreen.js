import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  Button,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import axios from "axios";
import { getData, storeData } from "../middleware/token";
export default function HomeScreen({ navigation }) {
  const [data, setdata] = useState("");

  useEffect(() => {
    setdata(getData());
    console.log(getData());
  }, []);

  // console.log(getData());
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>
        <Button
          mt="2"
          title="Signup in NPTY to sell your products !"
          onPress={() => navigation.navigate("Signup")}
        />
      </Box>
    </Center>
  );
}

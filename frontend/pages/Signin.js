import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import axios from "axios";
import { getData, storeData } from "../middleware/token";
export default function Signin({ navigation }) {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  // const [token, settoken] = useState("");
  function hundleSignIn() {
    axios
      .post("/api/users/signin", { userName, password })
      .then((res) => {
        storeData(res.data);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
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

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                value={userName}
                onChangeText={(userName) => {
                  setuserName(userName);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                onChangeText={(password) => {
                  setpassword(password);
                }}
                type="password"
              />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button onPress={hundleSignIn} mt="2" colorScheme="indigo">
              Sign in
            </Button>

            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
}

// <Button
//   onPress={() => {
//     settoken(getData());
//   }}
//   mt="2"
//   colorScheme="indigo"
// >
//   getToken{" "}
// </Button>

// <Text
// fontSize="sm"
// color="coolGray.600"
// _dark={{
//   color: "warmGray.200",
// }}
// >
// {JSON.stringify(token)}
// </Text>

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

export default function Signup({ navigation }) {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState();
  function hundleSignUp() {
    axios
      .post("/api/users/signup", {
        userName,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      })
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
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>First name</FormControl.Label>
              <Input
                value={firstName}
                onChangeText={(firstName) => {
                  setfirstName(firstName);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last name</FormControl.Label>
              <Input
                value={lastName}
                onChangeText={(lastName) => {
                  setlastName(lastName);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Phone number</FormControl.Label>
              <Input
                value={phoneNumber}
                onChangeText={(phoneNumber) => {
                  setphoneNumber(phoneNumber);
                }}
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={(email) => {
                  setemail(email);
                }}
              />
            </FormControl>
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
            </FormControl>

            <Button
              onPress={() => {
                hundleSignUp();
              }}
              mt="2"
              colorScheme="indigo"
            >
              Sign up
            </Button>
          </VStack>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I've an account.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Signin")}
            >
              Sign In
            </Link>
          </HStack>
        </Box>
      </Center>
    </TouchableWithoutFeedback>
  );
}

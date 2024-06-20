import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useFonts } from "expo-font";
import { Link, router, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";

const logoImage = require("../assets/images/LOGO.png");
const welcomeImage = require("../assets/images/signUp.png");
const countryCodeImage = require("../assets/images/mask.png");

const Page = () => {
  // Fonts
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // useState to manage first name, last name, country code, and phone number
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+237");
  const [phoneNumber, setPhoneNumber] = useState("");

  const keyboardVerticalOffset = Platform.OS == "ios" ? 80 : 0;

  //implementation of clerk
  const router = useRouter(); // We will go forward to a new page

  // import signUp from clerk expo
  const { signUp } = useSignUp();

  //Wrap everything in the try and catch block
  const onSignup = async () => {
    
    //pass the full phone number and make it a string
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    // // Navigate to the verification page
    // router.push({
    //   pathname: "/verify/[phone]",
    //   params: { phone: fullPhoneNumber },
    // });

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[defaultStyles.container, { flex: 1 }]}>
        <Image source={logoImage} style={styles.logo} />

        {/* <View
          style={{
            alignItems: "center",
            position: "absolute",
            right: "50%",
            top: 3,
          }}
        >
          <Image source={welcomeImage} style={{ width: 100, height: 100 }} />
        </View> */}

        <Text style={[styles.text, { paddingTop: 10 }]}>
          Create your account
        </Text>

        <View>
          <Text
            style={{ textAlign: "center", fontSize: 14, color: Colors.gray }}
          >
            Dem go send one verification code go your phone number to verify
            your account.
          </Text>
        </View>

        <Text
          style={{
            paddingTop: 10,
            fontSize: 14,
            color: Colors.gray,
          }}
        >
          First Name
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                fontSize: 14,
                textAlign: "left",
                height: 50,
                paddingVertical: 0,
              },
            ]}
            placeholder="e.g Hewet"
            placeholderTextColor={Colors.gray}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <Text
          style={{
            paddingTop: 10,
            fontSize: 14,
            color: Colors.gray,
          }}
        >
          Last Name
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                fontSize: 14,
                textAlign: "left",
                height: 50,
                paddingVertical: 0,
              },
            ]}
            placeholder="e.g Doe"
            placeholderTextColor={Colors.gray}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <Text
          style={{
            paddingTop: 10,
            fontSize: 14,
            color: Colors.gray,
          }}
        >
          Phone number
        </Text>
        <View style={styles.inputContainer}>
          <Image source={countryCodeImage} style={styles.countryCodeImage} />
          <TextInput
            style={[styles.input, { fontSize: 18, textAlign: "right" }]}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                fontSize: 18,
                textAlign: "center",
                height: 50,
                paddingVertical: 0,
              },
            ]}
            placeholder="Enter phone Number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.signupContainer}>
          <Text>Already have an account? </Text>
          <Link href={"/login"}>
            <Text style={styles.signupText}>Log in</Text>
          </Link>
        </View>

        <View style={{ flex: 1 }}></View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20, marginTop: 12 },
          ]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.textButton}>
            Make we create your account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
  text: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 24,
  },
  heading: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically
    justifyContent: "flex-start",
  },
  countryCodeImage: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 24,
    zIndex: 9999,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    borderColor: "#D0D5DD",
    borderWidth: 1,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.purple,
  },
  disabled: {
    backgroundColor: Colors.lightPurple,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  signupText: {
    color: Colors.green,
  },
});

export default Page;

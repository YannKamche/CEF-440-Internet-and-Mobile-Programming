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
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const logoImage = require("../assets/images/LOGO.png");
const welcomeImage = require("../assets/images/picLogin.png");
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

  // useState to manage country code and phone number
  const [countryCode, setCountryCode] = useState("+237");
  const [phoneNumber, setPhoneNumber] = useState("");

  const keyboardVerticalOffset = Platform.OS == "ios" ? 80 : 0;

  //Wrap everything in the try and catch block
  const onSignup = async () => {
    //pass the full phone number and make it a string
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    //Navigate to the verification page
    // router.push({
    //   pathname: "/verify/[phone]",
    //   params: { phone: fullPhoneNumber },
    // });

    // try {
    //   await signUp!.create({
    //     phoneNumber: fullPhoneNumber,
    //   });
    //   signUp!.preparePhoneNumberVerification();

    //   router.push({
    //     pathname: "/verify/[phone]",
    //     params: { phone: fullPhoneNumber },
    //   });
    // } catch (error) {
    //   console.error("Error signing up", error);
    // }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[defaultStyles.container, { flex: 1 }]}>
        <Image source={logoImage} style={styles.logo} />

        <View style={{ paddingVertical: 7, alignItems: "center" }}>
          <Image source={welcomeImage} style={{ width: 290, height: 140 }} />
        </View>

        <Text style={styles.text}>Login to your account</Text>

        <View>
          <Text
            style={{ textAlign: "center", fontSize: 14, color: Colors.gray }}
          >
            Dem go send one verification code go your phone number to verify
            your account.
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 14,
              color: Colors.gray,
            }}
          >
            Phone number
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Image source={countryCodeImage} style={styles.countryCodeImage} />
          <TextInput
            style={[styles.input, { fontSize: 15, textAlign: "right" }]}
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
                fontSize: 15,
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

        <View style={{ paddingTop: 10, flexDirection: 'row' }}>
          <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            You no get account ?{" "}
          </Text>
          <Link href={"/signup"}>
            <TouchableOpacity>
              <Text style={{ color: Colors.green }}>Sign Up</Text>
            </TouchableOpacity>
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
          <Text style={defaultStyles.textButton}>Login</Text>
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
    left: 20,
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
});

export default Page;

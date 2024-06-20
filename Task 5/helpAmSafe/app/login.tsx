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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { isClerkAPIResponseError, useSession, useSignIn } from "@clerk/clerk-expo";

// An enum for the different sign in functionalities
enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

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

  const router = useRouter();
  const { signIn } = useSignIn();
  const { session } = useSession();

  const onSignIn = async (type: SignInType) => {
    if (session) {
      Alert.alert("Error", "You are already signed in. Please sign out first.");
      return;
    }

    if (type == SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        // Check the supported factors first
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });

        // Check if phone number exists as supported first factor
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          } else if (err.errors[0].code === "session_exists") {
            Alert.alert("Error", err.errors[0].longMessage);
          }
        }
      }
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
          <Text>You no get account? </Text>
          <Link href={"/signup"}>
            <Text style={styles.signupText}>Sign Up</Text>
          </Link>
        </View>

        <View style={{ flex: 1 }}></View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20, marginTop: 12 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
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

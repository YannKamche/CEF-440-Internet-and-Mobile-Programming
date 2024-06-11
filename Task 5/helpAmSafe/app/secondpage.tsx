import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const logoImage = require("../assets/images/LOGO.png");
const welcomeImage = require("../assets/images/tornado city 1.png");

const Page = () => {
  // Fonts
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={[defaultStyles.container, { flex: 1 }]}>
      <Image source={logoImage} style={styles.logo} />

      <View style={{ paddingVertical: 30 }}>
        <Image source={welcomeImage} style={{ width: 370, height: 300 }} />
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ padding: 10 }}>
          <Text style={[styles.text, styles.heading]}>
            You want make we helep you?
          </Text>
          <Text style={[styles.text, { paddingBottom: 70 }]}>
            Ya hous di burn? Flood don catch up wit you? You need help and tips
            on how to avoid and prepare for dis? HelpAmSafe na de app for you.
          </Text>
          <Link
            href={"/thirdpage"}
            style={[defaultStyles.button, { textAlign: "center" }]}
          >
            <TouchableOpacity
              style={[defaultStyles.button, { justifyContent: "center" }]}
            >
              <Text style={defaultStyles.textButton}>Next</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
  text: {
    fontFamily: "Poppins",
  },
  heading: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Page;
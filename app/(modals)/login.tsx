import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

type OauthStrategy = "oauth_google" | "oauth_apple" | "oauth_facebook";

export default function LoginModal() {
  useWarmUpBrowser();

  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const onAuthPress = async (strategy: OauthStrategy) => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy,
        });
      console.log("🚀 ~ onSelectAuth ~ createdSessionId:", createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (error) {
      // console.error(JSON.stringify(error, null, 2));
      console.log("Oauth error", error);
    }
  };

  // const onPress = useCallback(async () => {
  //   try {
  //     // Start the authentication process by calling `startSSOFlow()`
  //     const { createdSessionId, setActive, signIn, signUp } =
  //       await startSSOFlow({
  //         strategy: "oauth_google",
  //       });

  //     // If sign in was successful, set the active session
  //     if (createdSessionId) {
  //       setActive!({ session: createdSessionId });
  //     } else {
  //       // If there is no `createdSessionId`,
  //       // there are missing requirements, such as MFA
  //       // Use the `signIn` or `signUp` returned from `startSSOFlow`
  //       // to handle next steps
  //     }
  //   } catch (err) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error(JSON.stringify(err, null, 2));
  //   }
  // }, []);

  return (
    <View style={defaultStyles.container}>
      <TextInput
        placeholder="Enter your email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>
        <View style={styles.separatorBorder} />
        <Text>or</Text>
        <View style={styles.separatorBorder} />
      </View>

      <View style={{ gap: 12 }}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onAuthPress("oauth_apple")}
        >
          <Ionicons name="logo-apple" size={22} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onAuthPress("oauth_google")}
        >
          <Ionicons
            name="logo-google"
            size={22}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => onAuthPress("oauth_facebook")}
        >
          <Ionicons
            name="logo-facebook"
            size={22}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    gap: 16,
  },
  separatorBorder: {
    flex: 1,
    backgroundColor: "#888",
    height: 1,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Sora-Regular",
  },
});

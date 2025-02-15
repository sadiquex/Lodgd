import { View, Text, StyleSheet } from "react-native";
import React from "react";
import useWarmUpBrowser from "@/hooks/useWarmUpBrowser";

export default function LoginModal() {
  useWarmUpBrowser();

  return (
    <View style={styles.container}>
      <Text>LoginModal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
});

import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function Profile() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Log out" onPress={() => signOut} />

      {!isSignedIn && <Link href={"/(modals)/login"}>Sign in</Link>}
    </View>
  );
}

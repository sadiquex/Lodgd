import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Homepage() {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={`/listing/2`}>Listing details</Link>
    </View>
  );
}

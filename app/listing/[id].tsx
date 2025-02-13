import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ListingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("🚀 ~ ListingDetails ~ id:", id);

  return (
    <View>
      <Text>ListingDetails</Text>
    </View>
  );
}

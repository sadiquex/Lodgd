import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";

interface ListingsMapProps {
  listings: any;
}

export default function ListingsMap({ listings }: ListingsMapProps) {
  return (
    <View style={defaultStyles.container}>
      <MapView style={styles.map} showsUserLocation showsMyLocationButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

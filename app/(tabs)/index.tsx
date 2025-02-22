import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/explore-header";
import Listings from "@/components/listings";
// import axios from "axios";

export default function Homepage() {
  const [category, setCategory] = useState("Tiny homes");
  const [listings, setListings] = useState([]);

  // make the api call here
  // const getListings = () => {
  //   const data = axios.get(
  //     `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/air-bnb-listings/records?limit=20`
  //   );
  //   console.log("🚀 ~ getListings ~ data:", data);
  // };

  // useEffect(() => {
  //   // getListings();
  // }, []);

  const onDataChanged = (category: string) => {
    // console.log("🚀 ~ onDataChanged ~ category:", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={[]} category={category} />
    </View>
  );
}

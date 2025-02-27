import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/explore-header";
import Listings from "@/components/listings";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsGeoData from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/listings-map";

export default function Homepage() {
  const [category, setCategory] = useState("Tiny homes");
  // when the component is initialized, memoize the data - Performance
  const items = useMemo(() => listingsData as any, []);

  // make the api call here

  const onDataChanged = (category: string) => {
    // console.log("🚀 ~ onDataChanged ~ category:", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={listingsGeoData} />
    </View>
  );
}

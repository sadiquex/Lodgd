import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { ListingInterface } from "@/interfaces/listings";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ category, listings }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log(listings.length);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<ListingInterface> = ({ item }) => (
    <Link asChild href={`/listing/${item.id}`}>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Image
            source={{ uri: item.medium_url }}
            style={styles.listingImage}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={30} color={"#000"} />
          </TouchableOpacity>

          {/* name and rating */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Sora-Semibold",
              }}
            >
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Ionicons name="star" size={18} color={"#FFC107"} />
              <Text
                style={{
                  fontFamily: "Sora-Semibold",
                }}
              >
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          {/*  */}
          <Text style={{ fontFamily: "Sora-Regular" }}>{item.room_type}</Text>

          <View style={{ flexDirection: "row", gap: 4, marginVertical: 4 }}>
            <Text style={{ fontFamily: "Sora-Semibold" }}>${item.price}</Text>
            <Text style={{ fontFamily: "Sora-Regular" }}>/night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : listings}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
  },
  listingImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

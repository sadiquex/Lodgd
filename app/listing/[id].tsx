import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingsData from "@/assets/data/airbnb-listings.json";
import { ListingInterface } from "@/interfaces/listings";
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

const IMG_HEIGHT = 300;

export default function ListingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const listing = (listingsData as ListingInterface[]).find(
    (listing) => listing.id === id
  );
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scrollRef);

  // image parallax scrolling styles
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // image movement mapping
        {
          translateY: interpolate(
            scrollOffset.value, // the current scroll position
            [-IMG_HEIGHT, 0, IMG_HEIGHT], // input scroll range
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75] // corresponding translateY values
          ),
        },
        // image scaling mapping
        {
          scale: interpolate(
            scrollOffset.value, // the current scroll position
            [-IMG_HEIGHT, 0, IMG_HEIGHT], // the input scroll range
            [2, 1, 1] // corresponding scroll values
          ),
        },
      ],
    };
  });

  /*
  How it works
  - When scrolling up (scrollOffset.value is -IMG_HEIGHT), the image moves halfway up (-IMG_HEIGHT / 2).
  - When at rest (scrollOffset.value = 0), the image stays in place (0).
  - When scrolling down (scrollOffset.value = IMG_HEIGHT), the image moves further down (IMG_HEIGHT * 0.75).
*/

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16} // 16 events per second
      >
        <Animated.Image
          source={{ uri: listing?.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
        />

        {/* info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing?.name}</Text>
          <Text style={styles.location}>
            {listing?.room_type} in {listing?.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing?.guests_included} guests · {listing?.bedrooms} bedrooms ·{" "}
            {listing?.beds} bed · {listing?.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing?.review_scores_rating &&
                listing?.review_scores_rating / 20}{" "}
              · {listing?.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: listing?.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing?.host_name}
              </Text>
              <Text>Host since {listing?.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing?.description}</Text>
        </View>
      </Animated.ScrollView>

      {/* footer */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(400)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing?.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: IMG_HEIGHT,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Sora-SemiBold",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "Sora-SemiBold",
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "Sora-Regular",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Sora-Regular",
  },
});

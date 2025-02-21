import {
  View,
  Text,
  ScrollView,
  TouchableOpacityProps,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacityProps | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (categoryIndex: number) => {
    const selectedItem = itemsRef.current[categoryIndex];
    setActiveIndex(categoryIndex);

    // scroll to the selected item
    selectedItem?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 15, y: 0, animated: true });
    });

    // haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onCategoryChanged(categories[activeIndex].name);
  };

  return (
    <SafeAreaView
      style={{ paddingVertical: 20, backgroundColor: "#fff", height: 200 }}
    >
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchMenu}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "Sora-Semibold" }}>Where to?</Text>
                <Text
                  style={{ fontFamily: "Sora-Regular", color: Colors.grey }}
                >
                  Anywhere • Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              ref={(el) =>
                (itemsRef.current[index] = el as TouchableOpacityProps)
              }
              style={
                activeIndex === index
                  ? styles.activeCategoryButton
                  : styles.categoriesButton
              }
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons
                name={category.icon as any}
                size={24}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.activeCategoryText
                    : styles.categoryText
                }
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    // elevation: 2,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // shadowOffset: {
    //   width: 1,
    //   height: 10,
    // },
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 16,
  },
  searchMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // borderColor: "##ff0",
    // borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#fff",
    // width: 200,
    flex: 1,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  categoriesButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  activeCategoryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: Colors.grey,
  },
  activeCategoryText: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "#000",
  },
});

export default ExploreHeader;

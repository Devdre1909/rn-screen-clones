import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavigation } from "./bottom-navigation";
import { AppSearch } from "./app-search";
import { TodayFeed } from "./today-feed";
import { TodayHeader } from "./today-header";
import { styles } from "./today-styles";

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const width = Math.min(windowWidth - 40, 500);
  const [tab, setTab] = useState("Today");
  const scroll = useRef<ScrollView>(null);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        ref={scroll}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 110,
          width,
          alignSelf: "center",
          gap: 16,
        }}
      >
        <TodayHeader title={tab} />
        {tab === "Search" ? (
          <AppSearch />
        ) : (
          <TodayFeed width={width} tab={tab} />
        )}
      </ScrollView>
      <BottomNavigation
        tab={tab}
        onSelect={(nextTab) => {
          setTab(nextTab);
          scroll.current?.scrollTo({ y: 0, animated: false });
        }}
        width={width}
        bottomInset={insets.bottom}
      />
    </View>
  );
}

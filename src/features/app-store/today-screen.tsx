import { StatusBar } from "expo-status-bar";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TodayFeed } from "./today-feed";
import { TodayHeader } from "./today-header";
import { styles } from "./today-styles";

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const width = Math.min(windowWidth - 40, 500);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 24,
          width,
          alignSelf: "center",
          gap: 16,
        }}
      >
        <TodayHeader title="Today" />
        <TodayFeed width={width} tab="Today" />
      </ScrollView>
    </View>
  );
}

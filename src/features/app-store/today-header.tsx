import { artwork } from "./artwork-assets";
import { router } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";
import { Artwork } from "./artwork";
import { styles } from "./today-styles";

export function TodayHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Text accessibilityRole="header" style={styles.heading}>
        {title}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Account and demo information"
        onPress={() =>
          Alert.alert("App Store · Today", "A recreation of the Today feed.", [
            { text: "Close", style: "cancel" },
            { text: "Back to collection", onPress: () => router.back() },
          ])
        }
      >
        <Artwork image={artwork.avatar} width={44} radius={22} />
      </Pressable>
    </View>
  );
}

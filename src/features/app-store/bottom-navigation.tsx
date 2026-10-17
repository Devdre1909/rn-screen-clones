import {
  GlassView,
  isGlassEffectAPIAvailable,
  isLiquidGlassAvailable,
} from "expo-glass-effect";
import { Pressable, Text, View } from "react-native";
import { AppSymbol } from "./app-symbol";
import { styles } from "./today-styles";

function supportsNativeGlass(): boolean {
  // A running native client can expose fewer APIs than the installed JS package.
  // Keep the feed usable when either availability check is absent or throws.
  try {
    return (
      typeof isLiquidGlassAvailable === "function" &&
      typeof isGlassEffectAPIAvailable === "function" &&
      isGlassEffectAPIAvailable() &&
      isLiquidGlassAvailable()
    );
  } catch {
    return false;
  }
}

const tabs = [
  ["Today", "text.rectangle.portrait", "▤"],
  ["Games", "rocket.fill", "◆"],
  ["Apps", "square.stack.3d.up.fill", "▰"],
  ["Arcade", "arcade.stick.console.fill", "♟"],
  ["Search", "magnifyingglass", "⌕"],
] as const;
export function BottomNavigation({
  tab,
  onSelect,
  width,
  bottomInset,
}: {
  tab: string;
  onSelect: (tab: string) => void;
  width: number;
  bottomInset: number;
}) {
  const barItems = (
    <View style={styles.tabItems}>
      {tabs.map(([label, symbol, fallback]) => (
        <Pressable
          key={label}
          accessibilityRole="tab"
          accessibilityState={{ selected: tab === label }}
          accessibilityLabel={label}
          onPress={() => {
            onSelect(label);
          }}
          style={[styles.tab, tab === label && styles.selectedTab]}
        >
          <AppSymbol
            name={symbol}
            fallback={fallback}
            color={tab === label ? "#16b5ff" : "#fff"}
            size={26}
          />
          <Text
            style={[styles.tabLabel, tab === label && { color: "#16b5ff" }]}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View
      style={[
        styles.barPosition,
        { bottom: Math.max(bottomInset, 16), width: width + 2 },
      ]}
    >
      {supportsNativeGlass() ? (
        <GlassView glassEffectStyle="regular" style={styles.bar}>
          {barItems}
        </GlassView>
      ) : (
        <View style={[styles.bar, styles.barFallback]}>{barItems}</View>
      )}
    </View>
  );
}

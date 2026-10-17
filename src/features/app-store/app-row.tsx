import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { type App } from "./app-store-data";
import { AppSymbol } from "./app-symbol";
import { Artwork } from "./artwork";
import { styles } from "./today-styles";

export function AppRow({
  app,
  featured = false,
  dark = false,
}: {
  app: App;
  featured?: boolean;
  dark?: boolean;
}) {
  const [installed, setInstalled] = useState(app.action === "Open");
  const [downloading, setDownloading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function activate() {
    if (installed) {
      Alert.alert(app.name, "You're all set. This is a UI demo.");
      return;
    }
    if (downloading) return;
    setDownloading(true);
    timer.current = setTimeout(() => {
      setDownloading(false);
      setInstalled(true);
    }, 1100);
  }
  return (
    <View style={[styles.appRow, featured && styles.featuredRow]}>
      <Artwork image={app.image} width={48} radius={12} />
      <View style={styles.appCopy}>
        <Text
          numberOfLines={2}
          style={[styles.appName, dark && { color: "#111" }]}
        >
          {app.name}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.appSubtitle,
            featured && { color: dark ? "#777223" : "#ffffffb0" },
          ]}
        >
          {app.subtitle}
        </Text>
      </View>
      <View style={styles.actionArea}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${installed ? "Open" : "Get"} ${app.name}`}
          accessibilityState={{ busy: downloading, disabled: downloading }}
          disabled={downloading}
          onPress={activate}
          style={({ pressed }) => [
            styles.get,
            featured && styles.featuredGet,
            app.action === "cloud" &&
              !installed &&
              !downloading &&
              styles.cloudButton,
            pressed && { opacity: 0.55 },
          ]}
        >
          {app.action === "cloud" && !installed && !downloading ? (
            <AppSymbol
              name="icloud.and.arrow.down"
              fallback="⇩"
              color="#009cff"
              size={29}
            />
          ) : (
            <Text style={[styles.getText, featured && { color: "white" }]}>
              {downloading ? "•••" : installed ? "Open" : "Get"}
            </Text>
          )}
        </Pressable>
        {!installed && app.action !== "cloud" && (
          <Text style={[styles.purchase, featured && { color: "#ffffffa0" }]}>
            In-App Purchases
          </Text>
        )}
      </View>
    </View>
  );
}

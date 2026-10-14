import { DEMOS } from "@/features/demos";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.screen} contentInsetAdjustmentBehavior="never"
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>THE PLAYGROUND</Text>
        <Text accessibilityRole="header" style={styles.title}>Screens & little things.</Text>
        <Text style={styles.subtitle}>UI recreations and interactions, made for the fun of it.</Text>
      </View>
      <View style={styles.sectionLabel}>
        <Text style={styles.sectionTitle}>The collection</Text>
        <Text style={styles.count}>{String(DEMOS.length).padStart(2, "0")}</Text>
      </View>
      {DEMOS.map((demo) => (
        <Link key={demo.id} href={demo.href} asChild>
          <Pressable accessibilityRole="link" accessibilityLabel={`Open ${demo.title}`}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.preview}>
              <View style={styles.previewHeading} />
              <Text style={styles.previewAmount}>₦ 25,000</Text>
              <View style={styles.previewKeypad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => <Text key={digit} style={styles.previewDigit}>{digit}</Text>)}
              </View>
              <View style={styles.previewButton} />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardHeading}>
                <Text style={styles.cardTitle}>{demo.title}</Text>
                <Text style={styles.arrow}>↗</Text>
              </View>
              <Text style={styles.description}>{demo.description}</Text>
              <View style={styles.tags}>
                {demo.tags.map((tag) => <Text key={tag} style={styles.tag}>{tag}</Text>)}
              </View>
            </View>
          </Pressable>
        </Link>
      ))}
      <Text style={styles.footer}>Nothing too fancy. Just enjoying the vibes.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f7f7f2" },
  content: { width: "100%", maxWidth: 540, alignSelf: "center", paddingHorizontal: 24 },
  header: { gap: 14, marginBottom: 36 },
  eyebrow: { color: "#64705b", fontSize: 11, fontWeight: "700", letterSpacing: 2 },
  title: { color: "#232538", fontSize: 38, lineHeight: 44, fontWeight: "700", letterSpacing: -1.5 },
  subtitle: { color: "#72746e", fontSize: 16, lineHeight: 24, maxWidth: 300 },
  sectionLabel: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionTitle: { color: "#232538", fontSize: 14, fontWeight: "600" },
  count: { color: "#72746e", fontSize: 12, fontVariant: ["tabular-nums"] },
  card: { backgroundColor: "#ffffff", borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "#e6e7df", marginBottom: 16 },
  preview: { backgroundColor: "#eef0e9", padding: 24, alignItems: "center", gap: 12 },
  previewHeading: { width: 90, height: 5, borderRadius: 3, backgroundColor: "#c3c8bd" },
  previewAmount: { color: "#232538", fontSize: 36, fontWeight: "700", letterSpacing: -1 },
  previewKeypad: { width: 168, flexDirection: "row", flexWrap: "wrap", rowGap: 10 },
  previewDigit: { width: "33.333333%", color: "#232538", textAlign: "center", fontSize: 14, fontWeight: "600" },
  previewButton: { width: 152, height: 18, borderRadius: 9, backgroundColor: "#232538" },
  cardBody: { padding: 22, gap: 12 },
  cardHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  cardTitle: { color: "#232538", fontSize: 19, fontWeight: "700", flex: 1 },
  arrow: { color: "#232538", fontSize: 24 },
  description: { color: "#72746e", fontSize: 14, lineHeight: 21 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { color: "#64705b", backgroundColor: "#f1f3ed", fontSize: 11, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  footer: { color: "#72746e", fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 20 },
  pressed: { opacity: 0.7 },
});

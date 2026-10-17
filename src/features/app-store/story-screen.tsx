import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppRow } from "./app-row";
import { AppSymbol } from "./app-symbol";
import { Artwork } from "./artwork";
import { EditorialHero } from "./editorial-hero";
import { stories } from "./editorial-stories";

export default function StoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const story = Object.hasOwn(stories, id) ? stories[id] : undefined;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.set(event.contentOffset.y);
  });
  const floatingProps = useAnimatedProps(() => ({
    pointerEvents:
      scrollY.get() > width * 0.7 ? ("auto" as const) : ("none" as const),
  }));
  const floatingStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.get(),
      [width * 0.7, width * 0.7 + 70],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));
  function close() {
    if (router.canGoBack()) router.back();
    else router.replace("/app-store");
  }
  if (!story) {
    return (
      <View
        style={[styles.screen, { padding: 24, paddingTop: insets.top + 24 }]}
      >
        <Text style={styles.sectionTitle}>Story unavailable</Text>
        <Pressable
          onPress={close}
          accessibilityRole="button"
          style={styles.share}
        >
          <Text style={styles.buttonText}>Back to Today</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.ScrollView
        contentInsetAdjustmentBehavior="never"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}
      >
        <Link.AppleZoomTarget>
          <EditorialHero story={story} width={width} />
        </Link.AppleZoomTarget>
        <View style={{ backgroundColor: story.color }}>
          <AppRow app={story.app} featured />
        </View>
        <View style={styles.article}>
          <Text style={styles.body}>{story.introduction}</Text>
          {story.sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text accessibilityRole="header" style={styles.sectionTitle}>
                {section.title}
              </Text>
              <Text style={styles.body}>{section.body}</Text>
              {section.image && (
                <View style={styles.figure}>
                  <Artwork image={section.image} width={width - 40} />
                  {section.caption && (
                    <Text style={styles.caption}>{section.caption}</Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={styles.appFooter}>
          <Artwork image={story.app.image} width={88} radius={22} />
          <Text style={styles.appTitle}>{story.app.name}</Text>
          <Text style={styles.appSubtitle}>
            {story.app.subtitle.replace(/\n/g, " ")}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${story.app.action === "Open" ? "Open" : "Get"} ${story.app.name}`}
            onPress={() =>
              Alert.alert(story.app.name, "You’re all set. This is a UI demo.")
            }
            style={styles.open}
          >
            <Text style={styles.buttonText}>
              {story.app.action === "Open" ? "Open" : "Get"}
            </Text>
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            void Share.share({
              title: story.title.replace(/\n/g, " "),
              message: `${story.title.replace(/\n/g, " ")}\n\n${story.introduction}`,
            });
          }}
          style={styles.share}
        >
          <AppSymbol name="square.and.arrow.up" fallback="↑" size={19} />
          <Text style={styles.buttonText}>Share Story</Text>
        </Pressable>
      </Animated.ScrollView>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close story"
        onPress={close}
        style={[styles.close, { top: insets.top + 6 }]}
      >
        <AppSymbol name="xmark" fallback="×" size={23} />
      </Pressable>
      <Animated.View
        animatedProps={floatingProps}
        style={[
          styles.floating,
          { bottom: Math.max(insets.bottom, 16) },
          floatingStyle,
        ]}
      >
        <AppRow app={story.app} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1c1c1e" },
  article: { padding: 20, gap: 32 },
  body: { color: "#98989e", fontSize: 17, lineHeight: 23 },
  section: {
    gap: 16,
    paddingTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#38383a",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  figure: {
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#2c2c2e",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#48484a",
  },
  caption: { color: "#98989e", fontSize: 13, lineHeight: 17, padding: 20 },
  close: {
    position: "absolute",
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#55555575",
    borderWidth: 1,
    borderColor: "#ffffff25",
  },
  floating: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 24,
    paddingHorizontal: 10,
    backgroundColor: "#3a3a3ceF",
    borderWidth: 1,
    borderColor: "#ffffff30",
    boxShadow: "0 4px 18px #00000030",
  },
  appFooter: {
    backgroundColor: "#2c2c2e",
    alignItems: "center",
    padding: 24,
    paddingBottom: 36,
    gap: 12,
  },
  appTitle: { color: "white", fontSize: 20, fontWeight: "600" },
  appSubtitle: { color: "#98989e", fontSize: 14, textAlign: "center" },
  open: {
    backgroundColor: "#009cff",
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  share: {
    alignSelf: "center",
    marginTop: 64,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: 28,
    paddingHorizontal: 30,
    paddingVertical: 14,
    backgroundColor: "#2c2c2e",
  },
});

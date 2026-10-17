import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useReducedMotion } from "react-native-reanimated";
import { AppRow } from "./app-row";
import { EditorialHero } from "./editorial-hero";
import { type EditorialStory } from "./editorial-stories";
import { styles } from "./today-styles";

export function EditorialCard({
  width,
  story,
}: {
  width: number;
  story: EditorialStory;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <View style={[styles.editorial, { backgroundColor: story.color }]}>
      <Link
        href={{ pathname: "/app-store/story/[id]", params: { id: story.id } }}
        asChild
      >
        <Link.Trigger withAppleZoom={!reducedMotion}>
          <Pressable
            collapsable={false}
            accessibilityRole="button"
            accessibilityLabel={`Read story: ${story.title.replace(/\n/g, " ")}`}
            style={{
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              overflow: "hidden",
            }}
          >
            <EditorialHero story={story} width={width} isSource />
          </Pressable>
        </Link.Trigger>
      </Link>
      <AppRow app={story.app} featured />
    </View>
  );
}

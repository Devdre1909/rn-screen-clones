import { Image } from "expo-image";
import { Text, View } from "react-native";
import { type EditorialStory } from "./editorial-stories";
import { styles } from "./today-styles";

export function EditorialHero({
  story,
  width,
  isSource = false,
}: {
  story: EditorialStory;
  width: number;
  isSource?: boolean;
}) {
  return (
    <View collapsable={false} style={{ backgroundColor: story.color }}>
      <Image
        accessible={false}
        source={story.art.source}
        contentFit="cover"
        style={{
          width,
          height: width / story.art.aspectRatio,
          borderTopLeftRadius: isSource ? 22 : 0,
          borderTopRightRadius: isSource ? 22 : 0,
        }}
      />
      {story.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{story.badge}</Text>
        </View>
      )}
      <View style={styles.editorialCopy}>
        <Text style={styles.eyebrow}>{story.eyebrow}</Text>
        <Text style={styles.cardTitle}>{story.title}</Text>
        {story.subtitle && (
          <Text style={styles.cardSubtitle}>{story.subtitle}</Text>
        )}
      </View>
    </View>
  );
}

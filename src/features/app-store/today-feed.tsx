import { Text, View } from "react-native";
import { AppList } from "./app-list";
import { games, sports } from "./app-store-data";
import { Artwork } from "./artwork";
import { artwork } from "./artwork-assets";
import { EditorialCard } from "./editorial-card";
import { stories } from "./editorial-stories";
import { styles } from "./today-styles";

export function TodayFeed({ width, tab }: { width: number; tab: string }) {
  return (
    <>
      {(tab === "Today" || tab === "Games") && (
        <EditorialCard width={width} story={stories.kings} />
      )}
      {(tab === "Today" || tab === "Games") && (
        <AppList eyebrow="TRY NOW" title="Must-play games" apps={games} />
      )}
      {(tab === "Today" || tab === "Games") && (
        <>
          <Text style={styles.sectionTitle}>Action-Packed</Text>
          <EditorialCard width={width} story={stories.cod} />
        </>
      )}
      {(tab === "Today" || tab === "Apps") && (
        <>
          <Text style={styles.sectionTitle}>Today’s Highlights</Text>
          <EditorialCard width={width} story={stories.shorts} />
        </>
      )}
      {(tab === "Today" || tab === "Games") && (
        <>
          <Text style={styles.sectionTitle}>Get Sporty</Text>
          <AppList
            eyebrow="THE DAILY LIST"
            title="Hey there, sport fans!"
            apps={sports}
          />
        </>
      )}
      {(tab === "Today" || tab === "Arcade" || tab === "Games") && (
        <>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Great for Game Center</Text>
            <Text style={styles.appSubtitle}>
              Challenge friends and unlock achievements
            </Text>
          </View>
          <View style={[styles.editorial, { backgroundColor: "#a787b2" }]}>
            <Artwork width={width} image={artwork.motorbikeArt} />
            <View style={styles.editorialCopy}>
              <Text style={styles.eyebrow}>PLAY TOGETHER</Text>
              <Text style={styles.cardTitle}>Go full throttle</Text>
              <Text style={styles.cardSubtitle}>
                Realistic motorbike experiences
              </Text>
            </View>
          </View>
        </>
      )}
    </>
  );
}

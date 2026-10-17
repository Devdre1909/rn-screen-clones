import { Text, View } from "react-native";
import { type App } from "./app-store-data";
import { AppRow } from "./app-row";
import { styles } from "./today-styles";

export function AppList({
  title,
  eyebrow,
  apps,
}: {
  title: string;
  eyebrow: string;
  apps: App[];
}) {
  return (
    <View style={styles.list}>
      <Text style={styles.listEyebrow}>{eyebrow}</Text>
      <Text style={styles.listTitle}>{title}</Text>
      <View style={styles.rows}>
        {apps.map((app) => (
          <AppRow key={app.name} app={app} />
        ))}
      </View>
    </View>
  );
}

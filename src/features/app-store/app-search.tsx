import { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { allApps } from "./app-store-data";
import { AppRow } from "./app-row";
import { styles } from "./today-styles";

export function AppSearch() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = allApps.filter((app) =>
    `${app.name} ${app.subtitle}`.toLowerCase().includes(normalizedQuery),
  );
  return (
    <>
      <TextInput
        accessibilityLabel="Search apps and games"
        placeholder="Games, apps and more"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        style={styles.search}
      />
      <View style={styles.list}>
        {results.map((app) => (
          <AppRow key={app.name} app={app} />
        ))}
        {results.length === 0 && (
          <Text style={styles.appSubtitle}>No results for “{query}”</Text>
        )}
      </View>
    </>
  );
}

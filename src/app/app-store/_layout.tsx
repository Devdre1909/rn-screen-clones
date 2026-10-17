import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "expo-router/react-navigation";
import { useReducedMotion } from "react-native-reanimated";

const appStoreTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#1c1c1e",
    card: "#1c1c1e",
  },
};

export default function AppStoreLayout() {
  const reducedMotion = useReducedMotion();
  return (
    <ThemeProvider value={appStoreTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: reducedMotion ? "none" : "default",
          contentStyle: { backgroundColor: "#1c1c1e" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="story/[id]" />
      </Stack>
    </ThemeProvider>
  );
}

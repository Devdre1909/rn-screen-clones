import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Stack.Screen
          name="app-store"
          options={{ contentStyle: { backgroundColor: "#1c1c1e" } }}
        />
      </Stack>
    </>
  );
}

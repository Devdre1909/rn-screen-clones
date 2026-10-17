import { Image } from "expo-image";
import { Text } from "react-native";

export function AppSymbol({
  name,
  fallback,
  color = "white",
  size = 25,
}: {
  name: string;
  fallback: string;
  color?: string;
  size?: number;
}) {
  return process.env.EXPO_OS === "ios" ? (
    <Image
      source={`sf:${name}`}
      tintColor={color}
      style={{ width: size, height: size }}
    />
  ) : (
    <Text style={{ fontSize: size, color, textAlign: "center" }}>
      {fallback}
    </Text>
  );
}

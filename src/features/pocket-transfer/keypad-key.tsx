import * as Haptics from "expo-haptics";
import type { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const FEEDBACK_DURATION = 140;
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

type KeypadKeyProps = {
  label: string;
  height: number;
  onPress: () => void;
  onLongPress?: () => void;
  children: ReactNode;
};

export function KeypadKey({
  label,
  height,
  onPress,
  onLongPress,
  children,
}: KeypadKeyProps) {
  const reducedMotion = useReducedMotion();
  const rippleDiameter = Math.min(76, height - 4);
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const rippleStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
    transform: [{ scale: scale.get() }],
  }));

  function showFeedback() {
    scale.set(reducedMotion ? 1 : 0.9);
    opacity.set(1);
    if (!reducedMotion) {
      scale.set(withSpring(1, { duration: FEEDBACK_DURATION, dampingRatio: 1 }));
    }
    const feedback =
      process.env.EXPO_OS === "android"
        ? Haptics.performAndroidHapticsAsync(
            Haptics.AndroidHaptics.Keyboard_Tap,
          )
        : process.env.EXPO_OS === "ios"
          ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          : undefined;
    // Unsupported hardware should never prevent a key from entering a digit.
    void feedback?.catch(() => {});
  }

  function hideFeedback() {
    opacity.set(withTiming(0, { duration: FEEDBACK_DURATION, easing: EASE_OUT }));
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={showFeedback}
      onPressOut={hideFeedback}
      style={[styles.key, { height }]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ripple,
          { width: rippleDiameter, height: rippleDiameter },
          rippleStyle,
        ]}
      />
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  key: { width: "33.333333%", alignItems: "center", justifyContent: "center" },
  ripple: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#e9e9ed",
  },
});

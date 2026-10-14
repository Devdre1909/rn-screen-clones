import { useEffect, useMemo, useRef } from "react";
import { formatAmountInput } from "@/features/pocket-transfer/transfer-amount";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const DIGIT_WIDTH = 0.61;
const SEPARATOR_WIDTH = 0.27;
const BASE_FONT_SIZE = 68;
const BASE_LINE_HEIGHT = 82;
const ROLL_DURATION = 150;

type RollingAmountProps = {
  value: string;
  invalid?: boolean;
};

export function RollingAmount({
  value,
  invalid = false,
}: RollingAmountProps) {
  const { width, fontScale } = useWindowDimensions();
  const reducedMotion = useReducedMotion();
  const offset = useSharedValue(0);
  const previousValue = useRef(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.get() }],
  }));
  const color = invalid ? "#d83b46" : "#232538";

  useEffect(() => {
    const numericValue = Number(value);
    if (invalid && numericValue > previousValue.current && !reducedMotion) {
      offset.set(
        withSequence(
          withTiming(-5, { duration: 40 }),
          withTiming(5, { duration: 60 }),
          withTiming(-3, { duration: 60 }),
          withTiming(0, { duration: 60 }),
        ),
      );
    } else if (!invalid || reducedMotion) {
      offset.set(0);
    }
    previousValue.current = numericValue;
  }, [value, invalid, reducedMotion, offset]);
  const formatted = formatAmountInput(value);
  const characters = formatted.split("");
  const widthUnits = characters.reduce(
    (sum, character) => sum + (/\d/.test(character) ? DIGIT_WIDTH : SEPARATOR_WIDTH),
    0,
  );
  const availableWidth = Math.min(width, 500) * 0.88 - 38;
  const fontSize = Math.min(BASE_FONT_SIZE * fontScale, availableWidth / widthUnits);
  const lineHeight = fontSize * (BASE_LINE_HEIGHT / BASE_FONT_SIZE);
  const entering = useMemo(
    () =>
      reducedMotion
        ? undefined
        : FadeInDown.duration(ROLL_DURATION)
            .easing(EASE_OUT)
            .withInitialValues({ opacity: 0, translateY: lineHeight * 0.5 }),
    [reducedMotion, lineHeight],
  );
  const exiting = useMemo(
    () =>
      reducedMotion
        ? undefined
        : FadeOutDown.duration(ROLL_DURATION)
            .easing(EASE_OUT)
            .withTargetValues({ opacity: 0, translateY: lineHeight * 0.5 }),
    [reducedMotion, lineHeight],
  );

  return (
    <Animated.View
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.row, { height: lineHeight }, shakeStyle]}
    >
      {characters.map((character, index) => {
        const isDigit = /\d/.test(character);
        // Grouping commas move as the amount grows. Identity follows the raw
        // character position so existing digits never remount and roll again.
        const rawIndex = formatted.slice(0, index).replace(/,/g, "").length;
        return (
          <Animated.Text
            key={`${isDigit ? "digit" : "separator"}-${rawIndex}-${character}`}
            entering={isDigit ? entering : undefined}
            exiting={isDigit ? exiting : undefined}
            allowFontScaling={false}
            style={[
              styles.text,
              {
                fontSize,
                color,
                lineHeight,
                height: lineHeight,
                width: fontSize * (isDigit ? DIGIT_WIDTH : SEPARATOR_WIDTH),
              },
            ]}
          >
            {character}
          </Animated.Text>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Exiting digits remain at their previous position while the row shrinks.
  // Clipping here would hide the last digit before its exit can finish.
  row: { flexDirection: "row", alignItems: "center", overflow: "visible" },
  text: {
    fontWeight: "700",
    textAlign: "center",
    fontVariant: ["tabular-nums"],
    includeFontPadding: false,
  },
});

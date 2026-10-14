import { KeypadKey } from "@/features/pocket-transfer/keypad-key";
import { RollingAmount } from "@/features/pocket-transfer/rolling-amount";
import {
  applyAmountKey,
  getKeyLabel,
  KEYPAD_KEYS,
  MAX_TRANSFER_AMOUNT,
  type KeypadValue,
} from "@/features/pocket-transfer/transfer-amount";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const INK = "#232538";
const FORMATTED_LIMIT = MAX_TRANSFER_AMOUNT.toLocaleString("en-NG");

export default function TransferScreen() {
  const [amount, setAmount] = useState("0");
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const numericAmount = Number(amount);
  const exceedsLimit = numericAmount > MAX_TRANSFER_AMOUNT;
  const canContinue = numericAmount > 0 && !exceedsLimit;
  const contentHeight = Math.max(620, height - insets.top - insets.bottom);
  const keyHeight = Math.min(80, contentHeight * 0.104);

  function enterKey(key: KeypadValue) {
    setAmount((current) => applyAmountKey(current, key));
  }

  function reviewTransfer() {
    if (!canContinue) return;
    Alert.alert(
      "Review transfer",
      `Amount to send: ₦${numericAmount.toLocaleString("en-NG", { maximumFractionDigits: 2 })}.`,
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flexGrow: 1,
      }}
    >
      <View style={[styles.content, { minHeight: contentHeight }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={() => {
            if (router.canGoBack()) router.back();
            else router.replace("/");
          }}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <View style={styles.backChevron} />
        </Pressable>
        <View style={styles.intro}>
          <Text accessibilityRole="header" style={styles.heading}>
            {"How much would\nyou like to send?"}
          </Text>
          <Text style={styles.subtitle}>
            Enter the amount you want to transfer.
          </Text>
        </View>
        <View style={styles.amountArea}>
          <View
            accessible
            accessibilityLabel={`Transfer amount: ${amount} naira${exceedsLimit ? `. Exceeds the ${FORMATTED_LIMIT} naira limit` : ""}`}
            accessibilityLiveRegion="polite"
            style={styles.amountRow}
          >
            <View style={styles.currencyBadge}>
              <Text style={[styles.currency, exceedsLimit && styles.errorText]}>
                ₦
              </Text>
            </View>
            <RollingAmount value={amount} invalid={exceedsLimit} />
          </View>
          {exceedsLimit && (
            <Text accessibilityLiveRegion="polite" style={styles.limitError}>
              {`Maximum transfer amount is ₦${FORMATTED_LIMIT}`}
            </Text>
          )}
        </View>
        <View style={styles.keypad}>
          {KEYPAD_KEYS.map((key) => (
            <KeypadKey
              key={key}
              height={keyHeight}
              label={getKeyLabel(key)}
              onPress={() => enterKey(key)}
              onLongPress={key === "delete" ? () => setAmount("0") : undefined}
            >
              {key === "delete" ? (
                <View style={styles.deleteChevron} />
              ) : (
                <Text style={styles.keyText}>{key}</Text>
              )}
            </KeypadKey>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !canContinue }}
          disabled={!canContinue}
          onPress={reviewTransfer}
          style={({ pressed }) => [
            styles.next,
            !canContinue && styles.nextDisabled,
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[styles.nextText, !canContinue && styles.nextTextDisabled]}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  content: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    paddingBottom: 16,
  },
  back: {
    width: 44,
    height: 44,
    marginTop: 6,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  backChevron: {
    width: 13,
    height: 13,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#050505",
    transform: [{ rotate: "45deg" }],
  },
  intro: { alignItems: "center", paddingHorizontal: 24, paddingTop: 7 },
  heading: {
    color: INK,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#777777",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 12,
    letterSpacing: -0.25,
  },
  amountArea: {
    flex: 1,
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    maxWidth: "88%",
  },
  errorText: { color: "#d83b46" },
  limitError: {
    position: "absolute",
    top: "50%",
    marginTop: 52,
    color: "#d83b46",
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  currencyBadge: {
    width: 30,
    height: 30,
    borderRadius: 11,
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  currency: { color: INK, fontSize: 19, lineHeight: 25, fontWeight: "700" },
  keypad: { flexDirection: "row", flexWrap: "wrap" },
  keyText: { color: INK, fontSize: 24, lineHeight: 32, fontWeight: "700" },
  deleteChevron: {
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#8d919b",
    transform: [{ rotate: "45deg" }],
  },
  next: {
    height: 48,
    borderRadius: 999,
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
  },
  nextDisabled: { backgroundColor: "#e9e9e9" },
  nextText: { color: "#ffffff", fontSize: 18, fontWeight: "500" },
  nextTextDisabled: { color: "#8d919b" },
  pressed: { opacity: 0.65 },
});

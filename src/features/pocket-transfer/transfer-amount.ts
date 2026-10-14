export const MAX_TRANSFER_AMOUNT = 5_000_000;
const MAX_WHOLE_DIGITS = 9;
const MAX_DECIMAL_DIGITS = 2;

export const KEYPAD_KEYS = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "delete",
] as const;

export type KeypadValue = (typeof KEYPAD_KEYS)[number];

export function getKeyLabel(key: KeypadValue): string {
  if (key === "delete") return "Delete last digit";
  if (key === ".") return "Decimal point";
  return key;
}

export function applyAmountKey(current: string, key: KeypadValue): string {
  if (key === "delete") return current.slice(0, -1) || "0";
  if (key === ".") return current.includes(".") ? current : `${current}.`;

  const [whole, fraction] = current.split(".");
  if (fraction !== undefined && fraction.length >= MAX_DECIMAL_DIGITS) {
    return current;
  }
  if (fraction === undefined && whole.length >= MAX_WHOLE_DIGITS) {
    return current;
  }
  return current === "0" ? key : current + key;
}

/** Keep unfinished decimals and trailing zeroes visible during entry. */
export function formatAmountInput(value: string): string {
  const [whole, fraction] = value.split(".");
  const groupedWhole = Number(whole).toLocaleString("en-NG");
  return groupedWhole + (fraction !== undefined ? `.${fraction}` : "");
}

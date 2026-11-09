import {
  debounce,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import { CATEGORIES } from "@/lib/categories";

export const searchQueryParser = parseAsString.withDefault("").withOptions({
  clearOnDefault: true,
  limitUrlUpdates: debounce(300),
});

export const TRACK_FILTERS = ["IGCSE", "Advanced"] as const;
export const BOARD_FILTERS = ["CAIE", "Edexcel"] as const;

export const filterParsers = {
  level: parseAsArrayOf(parseAsStringLiteral(TRACK_FILTERS)).withDefault([]),
  board: parseAsArrayOf(parseAsStringLiteral(BOARD_FILTERS)).withDefault([]),
  category: parseAsArrayOf(parseAsStringLiteral(CATEGORIES)).withDefault([]),
};

import { debounce, parseAsString } from "nuqs";

export const searchQueryParser = parseAsString.withDefault("").withOptions({
  clearOnDefault: true,
  limitUrlUpdates: debounce(300),
});

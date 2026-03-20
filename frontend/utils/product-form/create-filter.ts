import { matchSorter } from "match-sorter";
export const createFilter =
  (items: { value: string; label: string }[]) =>
  (options: string[], search: string) => {
    const filteredItems = items.filter((item) => options.includes(item.value));

    return matchSorter(filteredItems, search, {
      keys: ["label"],
      threshold: matchSorter.rankings.MATCHES,
    }).map((item) => item.value);
  };
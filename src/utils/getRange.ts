import type { FilterRanges } from "../interfaces/filters";
import type { AnimeManga } from "../interfaces/stats";

export function getRange(
  titles: AnimeManga[],
  category: keyof FilterRanges
): number[] {
  const values = titles
    .map((titles) => titles[category])
    .filter((value) => value !== undefined);
  const min = values.reduce((prev, curr) => (prev! < curr! ? prev : curr)) ?? 0;
  const max = values.reduce((prev, curr) => (prev! > curr! ? prev : curr)) ?? 0;
  return min === max ? [min - 1, max + 1] : [min, max];
}

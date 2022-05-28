import type { FilterRanges } from "../interfaces/filters";
import type { AnimeManga } from "../interfaces/stats";

export function getRange(
  titles: AnimeManga[],
  category: keyof FilterRanges
): number[] {
  const values = titles
    .map((titles) => titles[category])
    .filter((value) => value !== undefined);
  return [
    values.reduce((prev, curr) => (prev! < curr! ? prev : curr)) ?? 0,
    values.reduce((prev, curr) => (prev! > curr! ? prev : curr)) ?? 0,
  ];
}

import { useMemo, useState } from "react";

type CompareFn<ItemType> = (a: ItemType, b: ItemType) => number;
export type SortFns<ItemType, Identifiers extends string = string> = {
  type: Identifiers;
  fn: CompareFn<ItemType>;
};

export default function useSortCollection<
  ItemType,
  Identifiers extends string = string
>(sortFns: SortFns<ItemType, Identifiers>[]) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Performs a round robin on the SortFn starting from index 1 to the end then looping back
  const cycleSortType = () => {
    setActiveIdx((current) => (current + 1) % sortFns.length);
  };

  const setActive = (type: Identifiers) => {
    const idx = sortFns.findIndex((fn) => fn.type === type);
    setActiveIdx(idx);
  };

  return {
    sortType: sortFns[activeIdx],
    setSortType: setActive,
    cycleSortType,
  };
}

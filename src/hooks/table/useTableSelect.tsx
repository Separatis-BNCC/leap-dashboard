import { Course } from "@/lib/types";
import { checkIfAExistsInB } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { MouseEvent, useEffect, useState } from "react";

type Props<T extends { id: string | number }> = {
  data?: T[];
  onSelect?: (value: T[]) => void;
};

export default function useTableSelect<T extends { id: string | number }>({
  data,
  onSelect,
}: Props<T>) {
  const [selectedData, setSelectedData] = useState<T[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const queryClient = useQueryClient();
  const allSelected = selectedData.length === data?.length;

  const handleSelectAll = () => {
    setShowPopup(!allSelected);
    if (!data) {
      setSelectedData([]);
      return;
    }
    setSelectedData(allSelected ? [] : data);
  };

  const handleSelect = (itemData: T) => (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".edit-session-button")) return;

    const isSelected = selectedData.some((data) => itemData.id === data.id);
    const newSelected = isSelected
      ? selectedData.filter((item) => item.id !== itemData.id)
      : [...selectedData, itemData];

    if (!isSelected) setShowPopup(true);

    setSelectedData(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  const handleReset = () => {
    setShowPopup(false);
    setSelectedData([]);
  };

  // useEffect(() => {
  //   const setStorage = new Set(data?.map((item) => item.id));
  //   const missingItemsId = selectedData.reduce((res: number[], cur) => {
  //     if (!setStorage.has(cur.id)) res.push(cur.id as number);
  //     return res;
  //   }, []);
  //   console.log(missingItemsId);
  //   setSelectedData((current) => {
  //     return current.filter((current) => !(current.id in missingItemsId));
  //   });
  // }, [data, queryClient]);

  return {
    handleSelect,
    handleReset,
    handleSelectAll,
    showPopup,
    allSelected,
    selectedData,
  };
}

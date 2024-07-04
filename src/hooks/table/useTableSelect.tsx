import { MouseEvent, useState } from "react";

type Props<T extends { id: string }> = {
  data?: T[];
  onSelect?: (value: T[]) => void;
};

export default function useTableSelect<T extends { id: string }>({
  data,
  onSelect,
}: Props<T>) {
  const [selectedData, setSelectedData] = useState<T[]>([]);
  const [showPopup, setShowPopup] = useState(false);
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

  return {
    handleSelect,
    handleReset,
    handleSelectAll,
    showPopup,
    allSelected,
    selectedData,
  };
}

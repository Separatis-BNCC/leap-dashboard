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
  const allSelected = selectedData.length === data?.length;

  const handleSelectAll = () => {
    setShowPopup(!allSelected);
    if (!data) {
      setSelectedData([]);
      return;
    }
    setSelectedData(allSelected ? [] : data);
  };

  const handleSelect =
    (itemData: T, disabledClass?: string[]) => (e: MouseEvent) => {
      const clicked = e.target as HTMLElement;
      if (clicked.closest(".edit-session-button")) return;
      // Prevents the function from activating when elements with the following class are clicked.
      if (disabledClass && disabledClass.some((el) => clicked.closest(el)))
        return;

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

  /**
   * Revalidate data everytime a change happens (deletion / creation)
   * Creates an array of id from the actual data list (dataIdList)
   * then makes sure every item ids on the selected array exist on the * dataIdList and updates any data that was changed.
   */
  useEffect(() => {
    if (!data) return;
    const dataIdList = selectedData.map((item) => item.id);
    setSelectedData(data.filter((item) => dataIdList.includes(item.id)));
  }, [data]);

  const registerSelectionToast = {
    showPopup,
    selectedData,
    handleReset,
  };

  return {
    handleSelect,
    handleSelectAll,
    allSelected,
    selectedData,
    registerSelectionToast,
  };
}

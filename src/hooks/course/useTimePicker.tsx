import { useRef, useState } from "react";

type TimePickerHookProps = {
  defaultValue?: number[];
  onChange: (value: number[]) => void;
};

function formatNumber(num: number) {
  return num <= 9 ? `0${num}` : `${num}`;
}

export default function useTimePicker(props?: TimePickerHookProps) {
  const [value, setValue] = useState<number[]>(props?.defaultValue || [0, 0]);
  const keyPressedCount = useRef(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const register = (val: number, i: number) => {
    // TODO : Figure out how do handle delete with focus change.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Backspace") return;

      if (keyPressedCount.current % 2 === 0) {
        keyPressedCount.current -= 2;
        const idx = Math.floor(keyPressedCount.current / 2);

        if (inputRefs.current[idx]) {
          inputRefs.current[idx].focus();
        }

        return;
      }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isNaN(Number(e.target.value))) return;

      const inputtedVal = Number(e.target.value);

      keyPressedCount.current++;

      // Update the state storing the value.
      setValue((current) => {
        const newVal = [...current];
        newVal[i] = inputtedVal;

        if (props?.onChange) props.onChange(newVal);

        return newVal;
      });

      // On second keypresses (odd keypress), change the input element focus
      if (keyPressedCount.current % 2 === 0) {
        // Figure out the index for which element to focus on.
        const idx = Math.floor(keyPressedCount.current / 2);

        if (inputRefs.current[idx]) {
          inputRefs.current[idx].focus();
        } else {
          // If the element does not exist that means we're at the end of the input lists, then we should just blur from the last element.
          inputRefs.current[value.length - 1]?.blur();
          keyPressedCount.current = 0;
        }
      }
    };

    // Initializes key press count based on which input we pressed
    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      e.target.setSelectionRange(0, 2);
      keyPressedCount.current = i * 2;
    };

    // Prevents user for clicking other parts of the number
    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const inputEl = e.target as HTMLInputElement;
      inputEl.disabled = true;
      inputEl.setSelectionRange(0, 2);
      inputEl.disabled = false;
    };

    // Retrieve element into a ref array format
    const handleAddRef = (el: HTMLInputElement | null) => {
      inputRefs.current[i] = el;
    };

    return {
      // onKeyDown: handleKeyDown,
      onChange: handleOnChange,
      onFocus: handleFocus,
      onClick: handleClick,
      ref: handleAddRef,
      value: formatNumber(val),
    };
  };

  return { register, value };
}

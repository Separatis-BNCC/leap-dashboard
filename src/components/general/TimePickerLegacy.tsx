import { cn, isNumber } from "@/lib/utils";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

function formatNumber(num: number) {
  return num <= 9 ? `0${num}` : `${num}`;
}

function parseNumber(num: string) {
  const numArr = num.toString().split("");
  if (numArr[0] === "0" && numArr[1]) {
    return Number(numArr.slice(1).join(""));
  }
  return Number(num);
}

const order = ["hours", "minutes"] as const;

/**
 * Time picker component built from scratch
 */
export default function TimePicker({
  onChange,
  value,
}: {
  onChange?: (value: { hours: number; minutes: number }) => void;
  value?: { hours: number; minutes: number };
}) {
  const [time, setTime] = useState(
    value || {
      hours: 0,
      minutes: 0,
    }
  );
  const elements = useRef<
    Record<(typeof order)[number], HTMLInputElement | null>
  >({
    hours: null,
    minutes: null,
  });

  // Load controlled values
  useEffect(() => {
    if (!value) return;
    setTime(value);

    const hoursEl = elements.current["hours"];
    const minutesEl = elements.current["minutes"];
    if (hoursEl) hoursEl.value = formatNumber(value.hours);
    if (minutesEl) minutesEl.value = formatNumber(value.minutes);
  }, [value]);

  const keyPressedCount = useRef(0);

  const [focused, setFocused] = useState<number | undefined>(undefined);

  // Handles changing input focus to the next element.
  const changeFocus = useCallback(() => {
    keyPressedCount.current = 0;

    // If the focus goes over the array length that means the component should unfocus.
    const newFocusIdx =
      Number(focused) + 1 >= order.length ? undefined : Number(focused) + 1;
    setFocused(newFocusIdx);

    // Focus on the new component
    if (newFocusIdx) {
      const newFocus = order[newFocusIdx];
      const nextElement = elements.current[newFocus];
      nextElement?.focus();
      return;
    }

    // If newFocus is undefined then the component is at the last input and it should unfocus from it
    const lastFocus = order.at(-1);
    if (lastFocus) elements.current[lastFocus]?.blur();
  }, [focused]);

  const register = useCallback(
    (focus: keyof typeof time, props: { className?: string; max: number }) => {
      const element = elements.current[focus];

      const onBlur = () => {
        keyPressedCount.current = 0;
        setFocused(undefined);
      };

      const onFocus = () => {
        keyPressedCount.current = 0;
        // Map the string time (minutes and hours) into numbers
        const timeOrder = order.indexOf(focus);

        // If the timeOrder (index) does not exist then we have went over the last focus.
        setFocused(timeOrder === -1 ? undefined : timeOrder);
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (!isNumber(e.key)) return;

        // When the user inputs 0 as a starting input it should not be accepted.
        if (
          e.key === "0" &&
          time[focus] === 0 &&
          keyPressedCount.current === 1
        ) {
          changeFocus();

          if (onChange) onChange({ ...time, [focus]: 0 });

          e.preventDefault();
          return;
        }

        keyPressedCount.current++;

        // parseNumber converts formatted numbers like "01" into 1
        let value: number;

        // On the first input, the number should be reset to 0
        if (keyPressedCount.current === 1) {
          value = parseNumber(e.key);
        } else {
          value =
            time[focus] * 10 ** (keyPressedCount.current - 1) +
            parseNumber(e.key);
        }

        // Early detection if we input numbers that would "overshoot" the max value, e.g. putting a 9 as first input whent the max value is 24
        const overshooted =
          parseNumber(e.key) * 10 ** (order.length - keyPressedCount.current) >
          props.max;

        // if the new value is over the limit or has pressed twice then change focus
        if (value > props.max || keyPressedCount.current == 2 || overshooted) {
          changeFocus();
          e.preventDefault();
        }

        setTime((current) => {
          if (value > props.max) {
            return current;
          }
          return { ...current, [focus]: value };
        });

        if (onChange) onChange({ ...time, [focus]: value });

        if (element) element.value = formatNumber(value);
      };

      return {
        onBlur,
        onFocus,
        onKeyDown,

        placeholder: "00",
      };
    },
    [time, changeFocus]
  );

  return (
    <div className="flex gap-3 items-center justify-center">
      <div>
        <p className="text-dark mb-1">Hours</p>
        <input
          type="text"
          {...register("hours", {
            max: 23,
          })}
          ref={(ref) => (elements.current.hours = ref)}
          className={cn(
            "px-4 w-[50px] text-lg py-1 rounded-sm border-border border"
          )}
          readOnly
        />{" "}
      </div>
      <div>
        <p className="text-dark mb-1">Minutes</p>
        <input
          type="text"
          {...register("minutes", {
            max: 59,
          })}
          className={cn(
            "px-4 w-[50px] text-lg py-1 rounded-sm border-border border"
          )}
          readOnly
          ref={(ref) => (elements.current.minutes = ref)}
        />
      </div>
    </div>
  );
}

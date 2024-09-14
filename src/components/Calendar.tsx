import React, {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type TCalendarContextValues = {
  startDate: Date;
  startDateDay: number;
  endDate: Date;
  prevDate: Date;
  prevMonthDate: number;
  nextDate: Date;
  nextMonthDay: number;
  date: Date;
  navigateNext: () => void;
  navigatePrev: () => void;
};

const CalendarContext = createContext<TCalendarContextValues | null>(null);

function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("Calendar context must be used inside the provider");
  return context;
}

function Container({
  children,
  onNavigate,
  ...props
}: {
  children: ReactNode;
  onNavigate?: (date: Date) => void;
} & HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState(new Date());
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const startDate = new Date(currentYear, currentMonth, 1);
  const startDateDay = startDate.getDay();

  const endDate = new Date(currentYear, currentMonth + 1, 0);

  const prevDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevMonthDate = prevDate.getDate();

  const nextDate = new Date(currentYear, currentMonth + 1, 1);
  const nextMonthDay = nextDate.getDay();

  const navigatePrev = () => {
    setDate((current) => {
      return new Date(current.getFullYear(), current.getMonth(), 0);
    });
  };

  const navigateNext = () => {
    setDate((current) => {
      return new Date(current.getFullYear(), current.getMonth() + 2, 0);
    });
  };

  return (
    <CalendarContext.Provider
      value={{
        startDate,
        startDateDay,
        endDate,
        prevDate,
        prevMonthDate,
        nextMonthDay,
        nextDate,
        date,
        navigateNext,
        navigatePrev,
      }}
    >
      <div
        {...props}
        onClick={(e) => {
          if (onNavigate) onNavigate(date);
          if (props.onClick) props.onClick(e);
        }}
      >
        {children}
      </div>
    </CalendarContext.Provider>
  );
}

function Navigator({
  children,
  type,
  ...props
}: {
  type: "next" | "prev";
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const { navigateNext, navigatePrev } = useCalendarContext();

  return (
    <div {...props} onClick={type === "next" ? navigateNext : navigatePrev}>
      {children}
    </div>
  );
}

function Body({
  render,
  renderRemainder,
  columns,
  noStyles,
  ...props
}: {
  render: (props: { value: number; date: Date }) => ReactElement;
  renderRemainder: (props: { value: number }) => ReactElement;
  columns?: number;
  noStyles?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  const { endDate, nextMonthDay, prevMonthDate, startDateDay, date } =
    useCalendarContext();

  return (
    <div
      {...props}
      style={
        !noStyles
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${columns || 7}, 1fr)`,
            }
          : undefined
      }
    >
      {new Array(startDateDay).fill("x").map((_, i) => {
        const idx = startDateDay - i;
        return (
          <React.Fragment key={`start${i}`}>
            {renderRemainder({
              value: prevMonthDate - idx + 1,
            })}
          </React.Fragment>
        );
      })}
      {new Array(endDate.getDate()).fill("x").map((_, i) => {
        const nowDate = new Date(date.getFullYear(), date.getMonth(), i + 1);
        return (
          <React.Fragment key={i}>
            {render({ value: i + 1, date: nowDate })}
          </React.Fragment>
        );
      })}
      {nextMonthDay !== 0 &&
        new Array(7 - nextMonthDay).fill("x").map((_, i) => {
          return (
            <React.Fragment key={`end${i}`}>
              {renderRemainder({
                value: i + 1,
              })}
            </React.Fragment>
          );
        })}
    </div>
  );
}

function Title({ render }: { render: (date: Date) => ReactElement }) {
  const { date } = useCalendarContext();
  return render(date);
}

export default { Container, Navigator, Body, Title };

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;
const WEEK_TIMESTAMP = DAY_TIMESTAMP * 7;

export function calculateSchedule({
  dayOfWeek,
  startDate,
  meetingCount,
}: {
  dayOfWeek: (typeof days)[number];
  startDate: Date;
  meetingCount: number;
}) {
  // 1. Check if it starts this week or next week
  const startsThisWeek = days.indexOf(dayOfWeek) >= startDate.getDay();

  return new Array(meetingCount).fill("x").map((_, i) => {
    // 2. Get the iteration's sequential date from start_day
    const date = new Date(startDate.getTime() + i * WEEK_TIMESTAMP);

    // 3. Calculate the timestamp for the date
    const startWeek =
      date.getTime() - 6 * DAY_TIMESTAMP + (6 - date.getDay()) * DAY_TIMESTAMP;

    // 4. Return the day in which the class will be done, if the class starts this week then we can add startWeek's timestamp and the timestamp needed until the class day. If not then just add another extra week timestamp.
    return new Date(
      startWeek +
        days.indexOf(dayOfWeek) * DAY_TIMESTAMP +
        (startsThisWeek ? 0 : WEEK_TIMESTAMP)
    );
  });
}

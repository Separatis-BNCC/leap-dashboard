export class ClassScheduler {
  day: number;
  hour: number;
  minute: number;
  startDate: Date;

  SESSIONS: number;
  WEEK_TIMESTAMP: number;
  DAY_TIMESTAMP: number;

  constructor({
    day,
    hour,
    minute,
    sessionCount,
    startDate,
  }: {
    day: number;
    hour: number;
    sessionCount: number;
    minute: number;
    startDate: Date;
  }) {
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.startDate = startDate;
    this.SESSIONS = sessionCount || 13;
    this.DAY_TIMESTAMP = 1000 * 60 * 60 * 24;
    this.WEEK_TIMESTAMP = this.DAY_TIMESTAMP * 7;
  }

  /**
   * Retrieves the next class date from the date passed in
   */
  next(from: Date) {
    const nextClassIsNextWeek = from.getDay() > this.day;
    const daysUntilNextWeek = 8 - from.getDay();
    const classDay = this.day;

    const nextClassDate = new Date(
      from.getFullYear(),
      from.getMonth(),
      nextClassIsNextWeek
        ? from.getDate() + daysUntilNextWeek + classDay
        : from.getDate() + classDay,
      this.hour,
      this.minute
    );

    return nextClassDate;
  }

  upcoming() {
    const today = new Date();
    return this.next(today);
  }

  all() {
    const firstClassDate = this.next(this.startDate);

    const today = new Date();
    return new Array(this.SESSIONS).fill("x").map((_, i) => {
      const date = new Date(
        firstClassDate.getTime() + i * this.WEEK_TIMESTAMP + this.DAY_TIMESTAMP
      );
      const isCompleted = today.getTime() > date.getTime();
      return {
        date,
        completed: isCompleted,
      };
    });
  }
}

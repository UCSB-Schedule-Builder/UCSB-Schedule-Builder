import { DateTime, Interval } from "luxon";
import { CourseLocation } from "./CourseLocation";

export class CourseTime {
  days: DayOfWeek[];
  startTime: HourMinute | null;
  endTime: HourMinute | null;
  location: CourseLocation;

  constructor(
    days: DayOfWeek[],
    startTimeString: string,
    endTimeString: string,
    location: CourseLocation
  ) {
    this.days = days;
    this.startTime =
      startTimeString != null ? new HourMinute(startTimeString) : null;
    this.endTime =
      startTimeString != null ? new HourMinute(endTimeString) : null;
    this.location = location;
  }

  static fromJSON(timeLocationJSON: any): CourseTime {
    return new CourseTime(
      (timeLocationJSON.days || "")
        .split("")
        .filter((dayString: string) => {
          return dayString !== " ";
        })
        .map((dayLetter: string) => {
          return DayOfWeek.fromLetter(dayLetter);
        }),
      timeLocationJSON.beginTime,
      timeLocationJSON.endTime,
      new CourseLocation(timeLocationJSON.building, timeLocationJSON.room)
    );
  }

  static toDateTime = (day: DayOfWeek, time: HourMinute) =>
    DateTime.fromObject({
      weekday: day.index,
      hour: time.hour,
      minute: time.minute,
    });

  toIntervals(): Interval[] {
    if (this.startTime == null || this.endTime == null) {
      return [];
    }
    const intervals = [];
    for (const day of this.days) {
      const startTime = CourseTime.toDateTime(day, this.startTime);
      const endTime = CourseTime.toDateTime(day, this.endTime);
      intervals.push(Interval.fromDateTimes(startTime, endTime));
    }
    return intervals;
  }

  getDuration(): number {
    if (this.startTime == null || this.endTime == null) {
      return 0;
    }
    return (
      60 * (this.endTime.hour - this.startTime.hour) +
      (this.endTime.minute - this.startTime.minute)
    );
  }
}

export class HourMinute {
  hour: number;
  minute: number;

  constructor(hourMinuteString: string) {
    const splitHourMinuteString = hourMinuteString.split(":");
    this.hour = parseInt(splitHourMinuteString[0]);
    this.minute = parseInt(splitHourMinuteString[1]);
  }
}

class DayOfWeek {
  // Copied structure from API: https://registrar.sa.ucsb.edu/webservices/public/lookups/swagger/ui/index#/Days
  letter: string;
  name: string;
  index: number;

  constructor(letter: string, name: string, index: number) {
    this.letter = letter;
    this.name = name;
    this.index = index;
  }

  static fromLetter(letter: string): DayOfWeek | null {
    switch (letter) {
      case "M":
        return new DayOfWeek("M", "Monday", 1);

      case "T":
        return new DayOfWeek("T", "Tuesday", 2);

      case "W":
        return new DayOfWeek("W", "Wednesday", 3);

      case "R":
        return new DayOfWeek("R", "Thursday", 4);

      case "F":
        return new DayOfWeek("F", "Friday", 5);

      case "S":
        return new DayOfWeek("S", "Saturday", 6);

      case "U":
        return new DayOfWeek("U", "Sunday", 7);

      default:
        return null;
    }
  }
}

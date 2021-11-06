import { CourseLocation } from "./CourseLocation"

export class CourseTime
{
  dayOfWeek: DayOfWeek
  hour: number
  minute: number
  durationMinutes: number
  location: CourseLocation

  constructor(dayOfWeek: DayOfWeek, hour: number, minute: number, duration: number, location: CourseLocation)
  {
    this.dayOfWeek = dayOfWeek
    this.hour = hour
    this.minute = minute
    this.duration = duration
    this.location = location
  }
}

export enum DayOfWeek // Copied structure from API: https://registrar.sa.ucsb.edu/webservices/public/lookups/swagger/ui/index#/Days
{
  Monday = "M",
  Tuesday = "T",
  Wednesday = "W",
  Thursday = "R",
  Friday = "F",
  Saturday = "S",
  Sunday = "U"
}

export const DayOfWeekToNumber = {} // Not sure if we need this for the calendar or not
DayOfWeekToNumber[DayOfWeek.Monday] = 0
DayOfWeekToNumber[DayOfWeek.Tuesday] = 1
DayOfWeekToNumber[DayOfWeek.Wednesday] = 2
DayOfWeekToNumber[DayOfWeek.Thursday] = 3
DayOfWeekToNumber[DayOfWeek.Friday] = 4
DayOfWeekToNumber[DayOfWeek.Saturday] = 5
DayOfWeekToNumber[DayOfWeek.Sunday] = 6

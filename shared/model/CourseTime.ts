import { CourseLocation } from "./model"

export class CourseTime
{
  dayOfWeek: DayOfWeek
  startTime: HourMinute
  endTime: HourMinute
  location: CourseLocation

  constructor(dayOfWeek: DayOfWeek, startTimeString: string, endTimeString: string, location: CourseLocation)
  {
    this.dayOfWeek = dayOfWeek
    this.startTime = new HourMinute(startTimeString)
    this.endTime = new HourMinute(endTimeString)
    this.location = location
  }

  getDuration(): number
  {
    return 60*(this.endTime.hour-this.startTime.hour)+(this.endTime.minute-this.startTime.minute)
  }
}

export class HourMinute
{
  hour: number
  minute: number

  constructor(hourMinuteString: string)
  {
    var splitHourMinuteString = hourMinuteString.split(":")
    this.hour = parseInt(splitHourMinuteString[0])
    this.minute = parseInt(splitHourMinuteString[1])
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

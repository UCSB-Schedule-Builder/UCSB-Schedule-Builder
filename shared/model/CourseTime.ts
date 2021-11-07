import { CourseLocation } from "./model"

export class CourseTime
{
  days: DayOfWeek[]
  startTime: HourMinute
  endTime: HourMinute
  location: CourseLocation

  constructor(days: DayOfWeek[], startTimeString: string, endTimeString: string, location: CourseLocation)
  {
    this.days = days
    this.startTime = new HourMinute(startTimeString)
    this.endTime = new HourMinute(endTimeString)
    this.location = location
  }

  static fromJSON(timeLocationJSON: any): CourseTime
  {
    return new CourseTime(
      (timeLocationJSON.days || "").split("").filter((dayString) => {
        return dayString !== " "
      }).map((dayLetter) => {
        return DayOfWeek.fromLetter(dayLetter)
      }),
      timeLocationJSON.beginTime,
      timeLocationJSON.endTime,
      new CourseLocation(
        timeLocationJSON.building,
        timeLocationJSON.room
      )
    )
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
    if (hourMinuteString == null) { return }

    var splitHourMinuteString = hourMinuteString.split(":")
    this.hour = parseInt(splitHourMinuteString[0])
    this.minute = parseInt(splitHourMinuteString[1])
  }
}

class DayOfWeek // Copied structure from API: https://registrar.sa.ucsb.edu/webservices/public/lookups/swagger/ui/index#/Days
{
  letter: string
  name: string
  index: number

  constructor(letter: string, name: string, index: number)
  {
    this.letter = letter
    this.name = name
    this.index = index
  }

  static fromLetter(letter: string): DayOfWeek
  {
    switch (letter)
    {
      case "M":
      return new DayOfWeek("M", "Monday", 0)

      case "T":
      return new DayOfWeek("T", "Tuesday", 1)

      case "W":
      return new DayOfWeek("W", "Wednesday", 2)

      case "R":
      return new DayOfWeek("R", "Thursday", 3)

      case "F":
      return new DayOfWeek("F", "Friday", 4)

      case "S":
      return new DayOfWeek("S", "Saturday", 5)

      case "U":
      return new DayOfWeek("U", "Sunday", 6)

      default:
      return null
    }
  }
}
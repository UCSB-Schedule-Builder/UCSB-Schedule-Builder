export class CourseLocation
{
  isOnline: boolean
  building: string
  room: string

  constructor(building: string, room: string)
  {
    this.isOnline = building == "ON" && room == "LINE" // the dumbest thing ever
    this.building = building
    this.room = room
  }
}

class CourseTime {
  constructor(dayOfWeek, hour, minute, duration) {
    this.dayOfWeek = dayOfWeek;
    this.hour = hour;
    this.minute = minute;
    this.duration = duration;
  }
}

const DayOfWeek = {
  M: 0 + 1,
  T: 1 + 1,
  W: 2 + 1,
  R: 3 + 1,
  F: 4 + 1,
};

import { Scheduler, WeekView } from "@progress/kendo-react-scheduler";
import { displayDate, sampleData } from "./events-utc";
import useCourseLists from "../stores/courseLists";
import { Course } from "../shared/model/Course";
import { Lecture } from "../shared/model/Lecture";
import { HourMinute } from "../shared/model/CourseTime";
import { Interval } from "luxon";

function CourseCalendar() {
  const { main, alternate } = useCourseLists(({ main, alternate }) => ({
    main,
    alternate,
  }));

  // const courses = [...main, ...alternate];

  const courseToLectureSectionPairs = (course: Course) => {
    const lectureToTimeslotChoices = (lecture: Lecture) => {
      const lectureToIntervals = (lecture: Lecture) => {
        function getDayOfWeek(d: Date, idx: number) {
          d = new Date(d);
          const day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : idx); // adjust when day is sunday
          return new Date(d.setDate(diff));
        }

        const intervals = [];

        return lecture.times.map((time) => {
          const dayHourMinuteToDate = (
            day: number,
            { hour, minute }: HourMinute
          ) => {
            const d = getDayOfWeek(new Date(), day + 1); // + 1 to compensate for API starting Monday as 0
            d.setHours(hour);
            d.setMinutes(minute);
            return d;
          };
          return time.days.map((day) => {
            intervals.push(
              Interval.fromDateTimes(
                dayHourMinuteToDate(day.index + 1, time.startTime!),
                dayHourMinuteToDate(day.index + 1, time.endTime!)
              )
            );
          });
        });
      };

      return lectureToIntervals(lecture);
    };

    return course.lectures.map(lectureToTimeslotChoices);
  };

  const timeslotChoicesListToTimeslotPicks = (timeslotChoicesList) => {
    const timeslotPicks = [];
    const timeslotPick = [];
    // Number of arrays
    let n = timeslotChoicesList.length;

    // To keep track of next element in
    // each of the n arrays
    let indices = new Array(n);

    // Initialize with first element's index
    for (let i = 0; i < n; i++) indices[i] = 0;

    while (true) {
      // Print current combination
      for (let i = 0; i < n; i++)
        timeslotPick.push(timeslotChoicesList[i][indices[i]]);

      timeslotPicks.push(timeslotPick);
      timeslotPick.length = 0;

      // Find the rightmost array that has more
      // elements left after the current element
      // in that array
      let next = n - 1;
      while (next >= 0 && indices[next] + 1 >= timeslotChoicesList[next].length)
        next--;

      // No such array is found so no more
      // combinations left
      if (next < 0) return timeslotPicks;

      // If found move to next element in that
      // array
      indices[next]++;

      // For all arrays to the right of this
      // array current index again points to
      // first element
      for (let i = next + 1; i < n; i++) indices[i] = 0;
    }
  };
  const evaluateTimeslotPick = (timeslotPick) => {
    const getPairs = (timeslotPick) => {
      const pairs = [];
      for (let i = 0; i < timeslotPick.length; i++) {
        const pair = timeslotPick[i];
        pairs.push(pair);
      }
      return pairs;
    };

    const getOverlap = (pair) => {
      const overlap = [];
      for (let i = 0; i < pair.length; i++) {
        const time = pair[i];
        overlap.push(time);
      }
      return overlap;
    };
  };

  const lectureSectionPairsList = main.map(courseToLectureSectionPairs);
  const timeslotPicks = timeslotChoicesListToTimeslotPicks(
    lectureSectionPairsList
  ).map((timeslotPick) => timeslotPick.flat(Infinity));
  const bestTimeslotPick = timeslotPicks.reduce(function (prev, curr) {
    return evaluateTimeslotPick(prev) < evaluateTimeslotPick(curr)
      ? prev
      : curr;
  });

  // {
  //   TaskID: 120,
  //     OwnerID: 3,
  //   Title: "Website upload",
  //   Description: "",
  //   StartTimezone: null,
  //   Start: "2013-06-07T07:00:00.000Z",
  //   End: "2013-06-07T08:30:00.000Z",
  //   EndTimezone: null,
  //   RecurrenceRule: "",
  //   RecurrenceID: null,
  //   RecurrenceException: null,
  //   isAllDay: false,
  // },

  // export const sampleData = baseData.map((dataItem) => ({
  //   id: dataItem.TaskID,
  //   start: parseAdjust(dataItem.Start),
  //   startTimezone: dataItem.StartTimezone,
  //   end: parseAdjust(dataItem.End),
  //   endTimezone: dataItem.EndTimezone,
  //   isAllDay: dataItem.isAllDay,
  //   title: dataItem.Title,
  //   description: dataItem.Description,
  //   recurrenceRule: dataItem.RecurrenceRule,
  //   recurrenceId: dataItem.RecurrenceID,
  //   recurrenceExceptions: dataItem.RecurrenceException,
  //
  //   roomId: dataItem.RoomID,
  //   ownerID: dataItem.OwnerID,
  //   personId: dataItem.OwnerID,
  // }));

  return (
    <Scheduler data={sampleData} defaultDate={displayDate}>
      <WeekView />
    </Scheduler>
  );
}

export default CourseCalendar;

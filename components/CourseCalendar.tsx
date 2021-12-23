import { Scheduler, WorkWeekView } from "@progress/kendo-react-scheduler";
import { displayDate, sampleData } from "./events-utc";
import useSchedule from "../stores/schedule";
import { Day } from "@progress/kendo-date-math";
import '@progress/kendo-date-math/tz/America/Los_Angeles';
import { CourseConfiguration } from "../shared/model/CourseConfiguration";
import { CourseTime, HourMinute } from "../shared/model/CourseTime"
// import { SchedulerModelFields } from "src/models";

function CourseCalendar() {
  // const schedule = useSchedule( ({ schedule }) => schedule);

  const schedule = useSchedule(state => state.schedule);
  const courseArray = schedule.courseConfigurations;
  console.log(`schedule: ${schedule}`);

  // translate lecture times from HourMinutes to Dates (should move into CourseTime under HourMinute)
  const getLectureTime = (currCourse: CourseConfiguration) => {
    const start: HourMinute | null = currCourse.lectureSlot.times[0].startTime;
    const end: HourMinute | null = currCourse.lectureSlot.times[0].endTime;

    if (start == null || end == null){
      return { start: null, end: null };
    }
    //TODO: change these to the quarter begin date
    let courseStart = new Date("2021-06-21T08:30:00.000Z");
    let courseEnd = new Date("2021-06-21T08:30:00.000Z");

    courseStart.setHours(start.hour);
    courseStart.setMinutes(start.minute);
    courseEnd.setHours(end.hour);
    courseEnd.setMinutes(end.minute);

    console.log({ start: courseStart, end: courseEnd});
    return { start: courseStart, end: courseEnd};
  }

  const getSectionTime = (currCourse: CourseConfiguration) => {
    if (currCourse.sectionSlot === undefined){
      return { start: null, end: null };
    }
    const start: HourMinute | null = currCourse.sectionSlot.times[0].startTime;
    const end: HourMinute | null = currCourse.sectionSlot.times[0].endTime;

    if (start == null || end == null){
      return { start: null, end: null };
    }
    //TODO: change these to the quarter begin date
    let courseStart = new Date("2021-06-21T08:30:00.000Z");
    let courseEnd = new Date("2021-06-21T08:30:00.000Z");

    courseStart.setHours(start.hour);
    courseStart.setMinutes(start.minute);
    courseEnd.setHours(end.hour);
    courseEnd.setMinutes(end.minute);

    console.log({ start: courseStart, end: courseEnd});
    return { start: courseStart, end: courseEnd};
  }

  //translate courses into data for calendar
  const mappedLectures: any[] = courseArray.map(
    (currCourse: CourseConfiguration) => {
      const lectureDays: string = currCourse.lectureSlot.times[0].getCalendarDayString();
      const totalLectures: number = currCourse.lectureSlot.times[0].getTotalTimes();
      const { start, end } = getLectureTime(currCourse);
      if (start == null || end == null){
        return;
      }
      // console.log(lectureDays);
      let mappedCourse = {
        id: currCourse.id,
        title: currCourse.id.toString(),
        start: start,
        end: end,
        recurrenceRule: //must be one line; doesn't tolerate spaces btwn rules
          `FREQ=DAILY;COUNT=${totalLectures};BYDAY=${lectureDays}`
      }
      return mappedCourse;
    }
  );

  //copy pasted version of mappedLectures; generalize to a function at some point
  const mappedSections: any[] = courseArray.map(
    (currCourse: CourseConfiguration) => {
      if (currCourse.sectionSlot === undefined){
        return;
      }
      const sectionDays: string = currCourse.sectionSlot.times[0].getCalendarDayString();
      const totalsections: number = currCourse.sectionSlot.times[0].getTotalTimes();
      const { start, end } = getSectionTime(currCourse);
      if (start == null || end == null){
        return;
      }
      // console.log(lectureDays);
      let mappedCourse = {
        id: currCourse.id,
        title: currCourse.id.toString(),
        start: start,
        end: end,
        recurrenceRule: //must be one line; doesn't tolerate spaces btwn rules
          `FREQ=DAILY;COUNT=${totalsections};BYDAY=${sectionDays}`
      }
      return mappedCourse;
    }
  );

  const mappedData: any[] = mappedLectures.concat(mappedSections);

  return (
    <Scheduler data={mappedData} defaultDate={displayDate}>
      <WorkWeekView
        title="School Week"
        showWorkHours={true}
        workWeekStart={Day.Monday}
        workWeekEnd={Day.Friday}
        workDayStart="08:00"
        workDayEnd="22:30"
      />

    </Scheduler>
  );
}

export default CourseCalendar;

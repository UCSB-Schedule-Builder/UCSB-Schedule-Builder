import { Scheduler, WorkWeekView } from "@progress/kendo-react-scheduler";
import { displayDate, sampleData } from "./events-utc";
import useSchedule from "../stores/schedule";
import { Day } from "@progress/kendo-date-math";
import '@progress/kendo-date-math/tz/America/Los_Angeles';
import { CourseConfiguration } from "../shared/model/CourseConfiguration";
// import { SchedulerModelFields } from "src/models";

function CourseCalendar() {
  // const schedule = useSchedule( ({ schedule }) => schedule);

  const schedule = useSchedule(state => state.schedule);

  const courseArray = schedule.courseConfigurations;

  console.log(`schedule: ${schedule}`);

  //returns lecture days for a course
  const courseLectureDay = (currCourse: CourseConfiguration) => {
    let lectureString: String = "";
    currCourse.lectureSlot.times[0].days.forEach(
      (currDay: DayOfWeek) => {
        const dayLetter: String = currDay.letter;
        switch (dayLetter){
          case "M":
            lectureString += "MO,";
            break;
          case "T":
            lectureString += "TU,";
            break;
          case "W":
            lectureString += "WE,";
            break;
          case "R":
            lectureString += "TH,";
            break;
          case "F":
            lectureString += "FR,";
            break;
          case "S":
            lectureString += "SA,";
            break;
          case "U":
            lectureString += "SU,";
            break;
          default:
            lectureString += "";
            break;
        }
      }
    )
    console.log(lectureString);
    return lectureString.substring(0, lectureString.length - 1);
  }

  //translate courses into data for calendar
  const mappedCourses: any[] = courseArray.map(
    (currCourse: CourseConfiguration) => {
      let mappedCourse = {
        id: currCourse.id,
        title: currCourse.title,
        start: new Date("2021-06-22T08:30:00.000Z"),
        end: new Date("2021-06-22T10:30:00.000Z"),
        recurrenceRule: `FREQ=DAILY;COUNT=10;BYDAY=${courseLectureDay(currCourse)}`
// ${courseLectureDay(currCourse)}
      }
      return mappedCourse;
    }
  );

  return (
    <Scheduler data={mappedCourses} defaultDate={displayDate}>
      <WorkWeekView
        title="School Week"
        showWorkHours={false}
        workWeekStart={Day.Monday}
        workWeekEnd={Day.Friday}
      />

    </Scheduler>
  );
}

export default CourseCalendar;

import { Scheduler, WorkWeekView } from "@progress/kendo-react-scheduler";
import useSchedule from "../stores/schedule";
import { Day } from "@progress/kendo-date-math";
import '@progress/kendo-date-math/tz/America/Los_Angeles';
import { CourseConfiguration } from "../shared/model/CourseConfiguration";
import { CourseTime } from "../shared/model/CourseTime"

function CourseCalendar() {
  const schedule = useSchedule(state => state.schedule);
  const courseArray = schedule.courseConfigurations;

  // Date must be at start of week for recurrence rule to work correctly
  const displayDate = new Date()
  displayDate.setTime(displayDate.getTime()-(displayDate.getDay()-1)*1000*60*60*24)

  const mappedCalendarCourseTimes = courseArray.flatMap(
    (currentCourseConfig: CourseConfiguration) => {
      let rawCourseTimes = currentCourseConfig.lectureSlot.times;
      if (currentCourseConfig.sectionSlot)
      {
        rawCourseTimes = rawCourseTimes.concat(currentCourseConfig.sectionSlot.times);
      }

      let mappedCourseTimes = rawCourseTimes.flatMap((currentCourseTime: CourseTime) => {
        const courseTimeDays: string = currentCourseTime.getCalendarDayString();
        const totalOccurences: number = currentCourseTime.getTotalTimes();
        const { start, end } = currentCourseTime.getStartEndDates(displayDate);

        if (start == null || end == null) return [];

        let mappedCourse = {
          id: currentCourseConfig.id,
          title: currentCourseConfig.id.toString(),
          start: start,
          end: end,
          recurrenceRule: //must be one line; doesn't tolerate spaces btwn rules
            `FREQ=DAILY;COUNT=${totalOccurences};BYDAY=${courseTimeDays}`
        }

        return mappedCourse;
      })

      return mappedCourseTimes;
    }
  );

  return (
    <Scheduler
      data={mappedCalendarCourseTimes}
      defaultDate={displayDate}
    >
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

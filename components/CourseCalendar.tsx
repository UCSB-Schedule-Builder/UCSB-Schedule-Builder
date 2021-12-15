import { Scheduler, WeekView, WorkWeekView } from "@progress/kendo-react-scheduler";
import { displayDate, sampleData } from "./events-utc";
import useSchedule from "../stores/schedule";
import { Day } from "@progress/kendo-date-math";

function CourseCalendar() {
  const schedule = useSchedule(({ schedule }) => schedule);

  console.log(`schedule: ${schedule}`);

  return (
    <Scheduler data={sampleData} defaultDate={displayDate}>
      <WorkWeekView
        title="School Week"
        workWeekStart={Day.Monday}
        workWeekEnd={Day.Friday}
      />

    </Scheduler>
  );
}

export default CourseCalendar;

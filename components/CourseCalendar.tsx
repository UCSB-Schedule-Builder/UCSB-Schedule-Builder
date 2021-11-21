import { Scheduler, WeekView } from "@progress/kendo-react-scheduler";
import { displayDate, sampleData } from "./events-utc";
import useSchedule from "../stores/schedule";

function CourseCalendar() {
  const schedule = useSchedule(({ schedule }) => schedule);

  console.log(`schedule: ${schedule}`);

  return (
    <Scheduler data={sampleData} defaultDate={displayDate}>
      <WeekView />
    </Scheduler>
  );
}

export default CourseCalendar;

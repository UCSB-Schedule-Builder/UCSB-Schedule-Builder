import { Scheduler, WeekView } from "@progress/kendo-react-scheduler";
import { displayDate, sampleData } from "./events-utc";

function CourseCalendar() {
  return (
    <Scheduler data={sampleData} defaultDate={displayDate}>
      <WeekView />
    </Scheduler>
  );
}

export default CourseCalendar;

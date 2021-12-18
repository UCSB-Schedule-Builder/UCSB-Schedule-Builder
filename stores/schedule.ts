import create from "zustand";
import cartesianProduct from "just-cartesian-product";
import _ from "lodash";

import useCourseLists from "./courseLists";
import { Schedule } from "../shared/model/Schedule";
import { Course } from "../shared/model/Course";

interface ScheduleState {
  schedule: Schedule;
}

const useSchedule = create(
  (): ScheduleState => ({
    schedule: new Schedule([]),
  })
);

const recalculateSchedule = (courses: Course[]) => {
  const possibleSchedules = cartesianProduct(
    courses.map((course) => course.toPossibleConfigurations())
  ).map((courseConfigurations) => new Schedule(courseConfigurations));
  const bestSchedule = _.minBy(possibleSchedules, (schedule) =>
    schedule.overlap.toMillis()
  );

  if (bestSchedule) {
    useSchedule.setState({ schedule: bestSchedule });
  }
};

useCourseLists.subscribe(({ main }) => main, recalculateSchedule);

export default useSchedule;

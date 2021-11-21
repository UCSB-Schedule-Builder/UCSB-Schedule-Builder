import useCourseLists from "./courseLists";
import create from "zustand";
import { CourseConfiguration } from "../shared/model/CourseConfiguration";
import { Course } from "../shared/model/Course";

const useSchedule = create((set) => ({
  schedule: [],
  setSchedule: (schedule: CourseConfiguration[]) => set(() => ({ schedule })),
}));

const recalculateSchedule = (courses: Course[]) => {
  // const { main } = useCourseLists.useState();
  // const { schedule } = useSchedule.useState();
  // const newSchedule = main.map((course) => ({
  //   ...course,
  //   selected: schedule.find((c) => c.id === course.id)?.selected ?? false,
  // }));
  // useSchedule.useState().setSchedule(newSchedule);
};

useCourseLists.subscribe(({ main }) => main, recalculateSchedule);

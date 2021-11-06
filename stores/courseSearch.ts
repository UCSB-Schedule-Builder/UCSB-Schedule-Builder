import create from "zustand";
import { CourseListType } from "./courseLists";

interface CourseSearchState {
  currentCourseType: CourseListType | null;
  search: (courseType: CourseListType) => void;
  close: () => void;
}

const useSearch = create(
  (set): CourseSearchState => ({
    currentCourseType: null,
    search: (courseType) =>
      set(() => ({
        currentCourseType: courseType,
      })),
    close: () => set(() => ({ currentCourseType: null })),
  })
);

export default useSearch;

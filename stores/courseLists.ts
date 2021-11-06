import create from "zustand";

import insert from "just-insert";
import { DraggableLocation } from "react-beautiful-dnd";

export interface Course {
  id: string;
  content: string;
}

export type CourseListType = "main" | "alternate";

export interface CourseListLocation extends DraggableLocation {
  droppableId: CourseListType;
}

interface CourseListsState {
  main: Course[];
  alternate: Course[];
  append: (course: Course, courseType: CourseListType) => void;
  remove: (location: CourseListLocation) => Course;
  insert: (course: Course, location: CourseListLocation) => void;
  move: (location: CourseListLocation, destination: CourseListLocation) => void;
}

// dummy data generator
const getCourses = (count: number, offset = 0): Course[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `course-${k + offset}-${new Date().getTime()}`,
    content: `course ${k + offset}\nlecture times\nsection times`,
  }));

const useCourseLists = create(
  (set, get: () => CourseListsState): CourseListsState => ({
    main: getCourses(3),
    alternate: getCourses(5, 3),
    insert: (course, { droppableId, index }) =>
      set((state: CourseListsState) => ({
        [droppableId]: insert(state[droppableId], course, index),
      })),
    remove: ({ droppableId, index }) => {
      const courseToRemove = get()[droppableId][index];
      set((state: CourseListsState) => ({
        [droppableId]: state[droppableId].filter((_, i) => i !== index),
      }));
      return courseToRemove;
    },
    append: (course, courseType) => {
      const { [courseType]: courses, insert } = get();
      insert(course, { droppableId: courseType, index: courses.length });
    },
    move: (source: CourseListLocation, destination: CourseListLocation) => {
      const { insert, remove } = get();
      const removed = remove(source);
      insert(removed, destination);
    },
  })
);

export default useCourseLists;

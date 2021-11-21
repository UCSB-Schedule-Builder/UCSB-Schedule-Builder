import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import insert from "just-insert";
import { DraggableLocation } from "react-beautiful-dnd";

import { Course } from "../shared/model/Course";

export type CourseListType = "main" | "alternate";

export interface CourseListLocation extends DraggableLocation {
  droppableId: CourseListType;
}

interface CourseListsState {
  main: Course[];
  alternate: Course[];
  removeAt: (location: CourseListLocation) => Course;
  insertAt: (course: Course, location: CourseListLocation) => void;
  append: (course: Course, courseType: CourseListType) => void;
  remove: (course: Course, courseType: CourseListType) => void;
  move: (location: CourseListLocation, destination: CourseListLocation) => void;
}

const useCourseLists = create(
  subscribeWithSelector(
    (set, get: () => CourseListsState): CourseListsState => ({
      main: [],
      alternate: [],
      insertAt: (course, { droppableId, index }) =>
        set((state: CourseListsState) => ({
          [droppableId]: insert(state[droppableId], course, index),
        })),
      removeAt: ({ droppableId, index }) => {
        const courseToRemove = get()[droppableId][index];
        set((state: CourseListsState) => ({
          [droppableId]: state[droppableId].filter((_, i) => i !== index),
        }));
        return courseToRemove;
      },
      append: (course, courseType) => {
        const { [courseType]: courses, insertAt } = get();
        insertAt(course, { droppableId: courseType, index: courses.length });
      },
      remove: (course, courseType) => {
        const { [courseType]: courses, removeAt } = get();
        const idx = courses.findIndex(
          (c) => c.id.toString() === course.id.toString()
        );
        return removeAt({ droppableId: courseType, index: idx });
      },
      move: (source: CourseListLocation, destination: CourseListLocation) => {
        const { insertAt, removeAt } = get();
        const removed = removeAt(source);
        insertAt(removed, destination);
      },
    })
  )
);

export default useCourseLists;

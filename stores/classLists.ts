import create from 'zustand';

import insert from "just-insert";
import { DraggableLocation } from 'react-beautiful-dnd';

export interface Class {
  id: string;
  content: string;
}

export type ClassListType = "main" | "alternate";

export interface ClassListLocation extends DraggableLocation {
  droppableId: ClassListType
}

interface ClassListsState {
  main: Class[],
  alternate: Class[],
  append: (theClass: Class, classType: ClassListType) => void,
  remove: (location: ClassListLocation) => Class,
  insert: (theClass: Class, location: ClassListLocation) => void,
  move: (location: ClassListLocation, destination: ClassListLocation) => void,
}

// dummy data generator
const getClasses = (count: number, offset = 0): Class[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `class-${k + offset}-${new Date().getTime()}`,
    content: `class ${k + offset}\nlecture times\nsection times`
  }));

const useClassLists = create((set, get: () => ClassListsState): ClassListsState => ({
  main: getClasses(3),
  alternate: getClasses(5, 3),
  insert: (theClass, { droppableId, index }) => set((state: ClassListsState) => ({
    [droppableId]: insert(state[droppableId], theClass, index)
  })),
  remove: ({ droppableId, index }) => {
    const classToRemove = get()[droppableId][index];
    set((state: ClassListsState) => ({
      [droppableId]: state[droppableId].filter((_, i) => i !== index)
    }));
    return classToRemove;
  },
  append: (theClass, classType) => {
    const { [classType]: classes, insert } = get();
    insert(theClass, { droppableId: classType, index: classes.length });
  },
  move: (source: ClassListLocation, destination: ClassListLocation) => {
    const { insert, remove } = get();
    const removed = remove(source);
    insert(removed, destination);
  }
}));

export default useClassLists;
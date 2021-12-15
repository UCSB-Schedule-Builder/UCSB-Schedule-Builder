import create from "zustand";
import { CourseListType } from "./courseLists";

interface ModalState {
  currentCourseType: CourseListType | null;
  search: (courseType: CourseListType) => void;
  close: () => void;
}

const useModal = create<ModalState>((set) => ({
  currentCourseType: null,
  search: (courseType) =>
    set(() => ({
      currentCourseType: courseType,
    })),
  close: () => set(() => ({ currentCourseType: null })),
}));

export default useModal;

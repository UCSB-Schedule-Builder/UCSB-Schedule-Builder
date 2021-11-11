import create from "zustand";
import { Subject } from "../shared/model/Subject";

const useSubjects = create((set) => ({
  subjects: [],
  setSubjects: (subjects: Subject[]) => set(() => ({ subjects })),
}));

export default useSubjects;

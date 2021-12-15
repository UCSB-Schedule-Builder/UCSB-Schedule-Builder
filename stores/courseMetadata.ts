import create from "zustand";
import { defaultQuarter } from "../constants/api";
import { YearQuarter } from "../shared/model/YearQuarter";
import { Subject } from "../shared/model/Subject";

interface CourseMetadataState {
  quarter: YearQuarter;
  subjects: Subject[];
  setQuarter: (quarter: YearQuarter) => void;
  setSubjects: (subjects: Subject[]) => void;
}

const useCourseMetadata = create<CourseMetadataState>((set) => ({
  quarter: defaultQuarter,
  subjects: [],
  setQuarter: (quarter) => set(() => ({ quarter })),
  setSubjects: (subjects) => set(() => ({ subjects })),
}));

export default useCourseMetadata;

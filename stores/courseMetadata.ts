import create from "zustand";
import { Subject } from "../shared/model/Subject";
import { defaultQuarter } from "../constants/api";
import { YearQuarter } from "../shared/model/YearQuarter";

interface CourseMetadataState {
  quarter: YearQuarter;
  subjects: Subject[];
  setQuarter: (quarter: YearQuarter) => void;
  setSubjects: (subjects: Subject[]) => void;
}

const useCourseMetadata = create(
  (set): CourseMetadataState => ({
    quarter: defaultQuarter,
    subjects: [],
    setQuarter: (quarter) => set(() => ({ quarter })),
    setSubjects: (subjects) => set(() => ({ subjects })),
  })
);

export default useCourseMetadata;

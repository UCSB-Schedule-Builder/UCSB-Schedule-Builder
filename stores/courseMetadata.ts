import create from "zustand";
import { Subject } from "../shared/model/Subject";
import { YearQuarter } from "../shared/model/Course";
import { defaultQuarter } from "../constants/api";

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

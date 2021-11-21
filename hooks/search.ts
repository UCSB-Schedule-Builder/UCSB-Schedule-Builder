import { useEffect, useState } from "react";
import { APIManager } from "../api/api-manager";
import useCourseMetadata from "../stores/courseMetadata";
import to from "await-to-js";
import shallow from "zustand/shallow";
import { Course } from "../shared/model/Course";

const networkStatuses = ["idle", "loading", "success", "error"] as const;
export type NetworkStatus = typeof networkStatuses[number];

function useSearch(subjectCode: string) {
  const [results, setResults] = useState<Course[]>();
  const [status, setStatus] = useState<NetworkStatus>("idle");

  const { subjects, quarter } = useCourseMetadata(
    ({ subjects, quarter }) => ({ subjects, quarter }),
    shallow
  );

  const subject = subjects.find((subject) => subject.code === subjectCode);

  useEffect(() => {
    if (!subject) {
      setStatus("idle");
      return;
    }

    const fetchCourses = async () => {
      setStatus("loading");
      setResults([]);
      const [err, courses] = await to(
        APIManager.fetchCourses(quarter, subject, true)
      );
      setStatus(err ? "error" : "success");
      setResults(courses);
    };

    fetchCourses();
  }, [quarter, subjectCode]);

  return { status, results };
}

export default useSearch;

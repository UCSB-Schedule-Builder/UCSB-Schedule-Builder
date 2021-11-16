import { Grid } from "react-loading-icons";

import { NetworkStatus } from "../hooks/search";
import { Course } from "../shared/model/Course";

interface SearchResultsProps {
  status: NetworkStatus;
  courses?: Course[];
}

function SearchResults({ status, courses }: SearchResultsProps) {
  return (
    <div className="search-results">
      {status === "idle" && (
        <div className="search-not-started">
          <p>This is where search results will go.</p>
          <p>Let&apos;s start searching! 😄</p>
        </div>
      )}
      {status === "loading" && <Grid />}
      {status === "error" && <p>Error!</p>}
      {status === "success" && !courses?.length && <p>No results found</p>}
      {status === "success" && courses?.length && (
        <div>
          {courses.map((course) => (
              <div className="search-result-cell">
                <div className="course-ID">{course.id.toString()}</div>
                <div className="course-title">{course.title}</div>
                <div className="is-selected">placeholder for selected icon</div>
              </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .search-results {
          width: 90%;
          justify-content: center;
        }

        .search-not-started {
          display: grid;
          place-items: center;
          margin-bottom: 6rem;

          & > p {
            margin: 0;
          }
        }

        .search-result-cell {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background-color: #ddd;
          border-radius: 5px;
          padding: 20px;
          margin: 3px;
        }

        .search-result-cell:hover {
          background-color: #ccc;

        }
      `}</style>
    </div>
  );
}

export default SearchResults;

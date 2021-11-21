import { Grid } from "react-loading-icons";

import { NetworkStatus } from "../../hooks/search";
import SearchResultCell from "./SearchResultCell";
import { CourseListType } from "../../stores/courseLists";
import { Course } from "../../shared/model/Course";

interface SearchResultsProps {
  status: NetworkStatus;
  courses?: Course[];
  courseListType: CourseListType;
}

function SearchResults({
  status,
  courses,
  courseListType,
}: SearchResultsProps) {
  return (
    <div className="container">
      <div className="search-results">
        {status === "idle" && (
          <div className="search-not-started">
            <p>This is where search results will go.</p>
            <p>Let&apos;s start searching! 😄</p>
          </div>
        )}
        {status === "loading" && (
          <div className="loading-icon">
            <Grid fill="#7331A0" />
          </div>
        )}
        {status === "error" && (
          <div className="error">
            <p>
              A network error occurred! <span className="emoji">⚠️</span>
            </p>
            <p>Please check your internet connection and try again.</p>
          </div>
        )}
        {status === "success" && !courses?.length && (
          <p className="no-results">No results found 😢</p>
        )}
        {status === "success" && !!courses?.length && (
          <div>
            {courses.map((course) => (
              <SearchResultCell
                key={course.id.toString()}
                courseListType={courseListType}
                cellCourse={course}
              />
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .emoji {
          font-family: apple color emoji, segoe ui emoji, noto color emoji,
            android emoji, emojisymbols, emojione mozilla, twemoji mozilla,
            segoe ui symbol;
        }

        .loading-icon,
        .no-results,
        .error {
          display: grid;
          align-content: center;
        }

        .loading-icon {
          display: grid;
          place-items: center;
          margin-bottom: 6rem;
          opacity: 0;
          animation: 600ms ease 400ms 1 forwards fadeIn;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .container {
          display: grid;
          ${!courses?.length && "place-items: center;"}
          white-space: pre-wrap;
          flex-grow: 1;
        }

        .search-results {
          width: 90%;
          justify-content: center;
          margin: 24px auto 50px;
        }

        .search-not-started,
        .no-results,
        .error {
          display: grid;
          place-items: center;
          margin-bottom: 6rem;

          & > p {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default SearchResults;

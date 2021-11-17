import { Grid } from "react-loading-icons";

import { NetworkStatus } from "../hooks/search";
import { Course } from "../shared/model/model";
import SearchResultCell from "./SearchResultCell";

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
            <SearchResultCell
              key={course.id.toString()}
              id={course.id.toString()}
              title={course.title}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        .search-results {
          width: 90%;
          justify-content: center;
          margin-bottom: 50px;
        }

        .search-not-started {
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

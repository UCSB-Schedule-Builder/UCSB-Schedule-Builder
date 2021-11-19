import shallow from "zustand/shallow";
import useCourseLists, { CourseListType } from "../stores/courseLists";
import { Course } from "../shared/model/model";

function SearchResultCell({
  courseListType,
  cellCourse,
}: {
  courseListType: CourseListType;
  cellCourse: Course;
}) {
  const { courses, appendCourse, removeCourse } = useCourseLists((state) => {
    return {
      courses: state[courseListType],
      appendCourse: state.append,
      removeCourse: state.remove,
    };
  }, shallow);

  const isCellSelected = () => {
    return courses.find(
      (course) => course.id.toString() === cellCourse.id.toString()
    );
  };

  const toggleCellSelected = () => {
    if (isCellSelected()) {
      removeCourse(cellCourse, courseListType);
    } else {
      appendCourse(cellCourse, courseListType);
    }
  };

  console.log(cellCourse.units);

  return (
    <div className="search-result-cell" onClick={toggleCellSelected}>
      <div className="search-result-cell-textbox">
        <span>{cellCourse.id.getNumberWithSuffix()}</span>
      </div>
      <div className="search-result-cell-textbox">
        <span>{cellCourse.title}</span>
      </div>
      <div className="search-result-cell-textbox">
        <span>{cellCourse.units.toString()} units</span>
      </div>

      <style jsx>{`
        .search-result-cell {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background: ${isCellSelected()
            ? "linear-gradient(135deg, #2e22ac 0%, #ce448d 100%)"
            : "#ddd"};
          color: ${isCellSelected() ? "#fefefe" : "#000"};
          border-radius: 5px;
          padding: 20px;
          margin: 3px;
          cursor: pointer;
        }

        .search-result-cell:hover {
          background: ${isCellSelected()
            ? "linear-gradient(135deg, #2e22ac 0%, #ce448d 100%)"
            : "linear-gradient(135deg, #6e62ec 0%, #ee84cd 100%)"};
          no-repeat: fixed;
          color: #fefefe;
        }

        .search-result-cell-textbox {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .search-result-cell-textbox:first-child > span {
          margin-right: auto;
        }

        .search-result-cell-textbox:last-child > span {
          margin-left: auto;
        }
      `}</style>
    </div>
  );
}

export default SearchResultCell;

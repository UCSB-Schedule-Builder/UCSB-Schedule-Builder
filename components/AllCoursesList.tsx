import NoSSR from "react-no-ssr";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import useCourseLists, {
  CourseListLocation,
  CourseListType,
} from "../stores/courseLists";
import CourseList from "./CourseList";

interface CourseMetadata {
  id: CourseListType;
  name: string;
}

const courseListOrder: CourseMetadata[] = [
  { id: "main", name: "Courses" },
  { id: "alternate", name: "Alternates" },
];

function AllCoursesList() {
  const move = useCourseLists((state) => state.move);

  interface CourseDropResult extends DropResult {
    source: CourseListLocation;
    destination: CourseListLocation;
  }

  function onDragEnd(result: CourseDropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    move(source, destination);
  }

  return (
    <div className="container">
      <NoSSR>
        <DragDropContext onDragEnd={onDragEnd}>
          {courseListOrder.map(({ id, name }, ind) => (
            <div key={ind}>
              <h2>{name}</h2>
              <div className="course-list">
                <CourseList courseType={id} />
              </div>
            </div>
          ))}
        </DragDropContext>
      </NoSSR>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          grid-row: 2 / 4;
          grid-column: 1;
        }

        h2 {
          margin: 0 auto 0.4rem;

          color: white;

          font-size: 2.4rem;
          font-weight: 500;

          display: flex;
          justify-content: center;
        }

        .course-list {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export default AllCoursesList;

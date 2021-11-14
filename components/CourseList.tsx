import { Droppable } from "react-beautiful-dnd";
import grid from "../constants/coursesList";
import useCourseLists, { CourseListType } from "../stores/courseLists";
import CourseCard from "./CourseCard";
import AddCourseBtn from "./AddCourseBtn";
import shallow from "zustand/shallow";

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "#f9f9f9",
  padding: `${grid * 1.5}px ${grid * 1.5}px ${grid * 0.25}px`,
  width: 500,
  borderRadius: 10,
});

function CourseList({ courseType }: { courseType: CourseListType }) {
  const { courses, remove } = useCourseLists(
    ({ [courseType]: courses, remove }) => ({ courses, remove }),
    shallow
  );

  const removeAt = (index: number) =>
    remove({ droppableId: courseType, index });

  return (
    <>
      <Droppable droppableId={courseType}>
        {({ droppableProps, innerRef, placeholder }, snapshot) => (
          <div
            ref={innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...droppableProps}
          >
            {courses.map((course, index) => (
              <CourseCard
                courseData={course}
                index={index}
                removeAt={removeAt}
                key={course.id}
              />
            ))}
            {placeholder}
            <AddCourseBtn courseType={courseType} />
          </div>
        )}
      </Droppable>
    </>
  );
}

export default CourseList;

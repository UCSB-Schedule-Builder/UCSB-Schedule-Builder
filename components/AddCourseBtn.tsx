import grid from "../constants/courseList";
import useSearch from "../stores/courseSearch";
import { CourseListType } from "../stores/courseLists";

function AddCourseBtn({ courseType }: { courseType: CourseListType }) {
  const search = useSearch((state) => state.search);

  function handleAddCourse() {
    search(courseType);
  }

  return (
    <>
      <button onClick={handleAddCourse}>+ Add Course</button>
      <style jsx>{`
        button {
          border-radius: 10px;
          background-color: #f9f9f9;
          color: #5e6c84;
          border: none;
          width: 100%;
          padding: 0.4rem;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: -${grid * 0.25}px 0 ${grid * 0.75}px;
        }

        button:hover {
          background-color: #091e4214;
          color: #172b4d;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default AddCourseBtn;

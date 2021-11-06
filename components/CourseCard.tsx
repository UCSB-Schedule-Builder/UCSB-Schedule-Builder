import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { CSSProperties } from "react";
import grid from "../constants/courseList";
import { Course } from "../stores/courseLists";

const getCourseStyle = (
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle
): CSSProperties => ({
  // some basic styles to make the course items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid * 1.5}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  boxShadow:
    "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.20)",

  borderRadius: 10,

  // styles we need to apply on draggables
  ...draggableStyle,
});

function CourseCard({
  courseData,
  index,
  removeAt,
}: {
  courseData: Course;
  index: number;
  removeAt: (index: number) => void;
}) {
  const { id, content } = courseData;
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }, snapshot) => (
          <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            style={getCourseStyle(snapshot.isDragging, draggableProps.style)}
          >
            <div className="card">
              <a
                href="#"
                className="close"
                onClick={() => {
                  removeAt(index);
                }}
              >
                <p className="close-inner">&times;</p>
              </a>
              {content}
            </div>
          </div>
        )}
      </Draggable>
      <style jsx>{`
        div {
          cursor: move;
        }

        .card {
          position: relative;
          display: inline-block;
          //display: flex;
          justify-content: space-around;
          white-space: pre-wrap;
        }

        * {
          color: #172b4d;
        }

        .close {
          position: absolute;
          top: -25px;
          left: -25px;
          z-index: 100;
          background-color: #dc143c;
          padding: 8px 5px 5px;
          cursor: pointer;
          opacity: 0;
          border-radius: 50%;
        }

        .close-inner {
          position: relative;
          top: -3px;
          margin: 0;
          color: #fff;
          text-align: center;
          font-size: 20px;
          line-height: 10px;
        }

        div:hover .close {
          opacity: 0.2;
        }

        .card .close:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
}

export default CourseCard;

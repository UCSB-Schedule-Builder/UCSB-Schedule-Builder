import shallow from "zustand/shallow";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import { ChangeEvent, useState } from "react";
import _ from "lodash";

import useModal from "../stores/modal";
import CourseNumInput from "./CourseNumInput";
import SubjectDropdown, { Selection } from "./SubjectDropdown";
import SearchResults from "./SearchResults";
import useSearch from "../hooks/search";

function AddCourseModal() {
  const { currentCourseType, close: handleClose } = useModal(
    ({ currentCourseType, close }) => ({ currentCourseType, close }),
    shallow
  );

  const isEscapePressed = useKeyPress({ targetKey: "Escape" });

  const isVisible = !!currentCourseType;

  if (isVisible && isEscapePressed) {
    handleClose();
  }

  const [subject, setSubject] = useState("");
  const [courseNum, setCourseNum] = useState("");

  const handleSubjectChange = (subject: Selection) => {
    if (_.isString(subject)) {
      setSubject(subject);
    }
  };

  const handleCourseNumChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCourseNum(e.target.value);
  };

  const { status, results } = useSearch(subject);

  const courses = results?.filter((course) =>
    course.id.getNumberWithSuffix().startsWith(courseNum)
  );

  return (
    <>
      <div className="modal" onClick={handleClose}>
        <div
          className="modal-content"
          onClick={(e) =>
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation()
          }
        >
          <div className="modal-header">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h2>Add your course! 📚</h2>
          </div>
          <div className="modal-inputs">
            <div className="input-container">
              <SubjectDropdown value={subject} onChange={handleSubjectChange} />
              <CourseNumInput
                value={courseNum}
                onChange={handleCourseNumChange}
              />
            </div>
          </div>
          <div className="modal-results">
            <SearchResults status={status} courses={courses} />
          </div>
        </div>
      </div>
      <style jsx>{`
        /* The Modal (background) */
        .modal {
          display: ${isVisible ? "block" : "none"}; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          padding-top: 100px; /* Location of the box */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0, 0, 0); /* Fallback color */
          background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-content {
          position: relative;
          display: flex;
          flex-direction: column;
          background-color: #fefefe;
          margin: 10%;
          margin-top: 0%;
          padding: 0;
          border: 1px solid #888;
          width: 80%;
          min-height: 80vh;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
          border-radius: 10px;
          -webkit-animation-name: animatetop;
          -webkit-animation-duration: 0.4s;
          animation-name: animatetop;
          animation-duration: 0.4s;
        }

        /* Add Animation */
        @-webkit-keyframes animatetop {
          from {
            top: -300px;
            opacity: 0;
          }
          to {
            top: 0;
            opacity: 1;
          }
        }

        @keyframes animatetop {
          from {
            top: -300px;
            opacity: 0;
          }
          to {
            top: 0;
            opacity: 1;
          }
        }

        /* The Close Button */
        .close {
          color: #c0c0c0;
          float: right;
          font-size: 28px;
          height: 0;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #172b4d;
          text-decoration: none;
          cursor: pointer;
        }

        .modal-header {
          padding: 2px 16px;
          color: #172b4d;
          font-size: 1.6rem;
        }

        .modal-inputs {
          padding: 2px 16px;
        }

        .modal-results {
          padding: 2px 16px;
          height: auto;
          flex-grow: 1;
          display: grid;
          place-items: center;
          white-space: pre-wrap;
          width: 100%;
        }

        h2 {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 1.4rem;
        }

        .input-container {
          display: flex;
        }

        .modal-inputs {
          display: grid;
          place-items: center;
        }
      `}</style>
    </>
  );
}

export default AddCourseModal;

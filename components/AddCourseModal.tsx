import shallow from "zustand/shallow";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import SelectSearch, { fuzzySearch } from "react-select-search/dist/cjs";
import useModal from "../stores/modal";
import { useState } from "react";

function AddCourseModal() {
  const [courseNum, setCourseNum] = useState("");
  const { currentCourseType, close: handleClose } = useModal(
    ({ currentCourseType, close }) => ({ currentCourseType, close }),
    shallow
  );

  const isEscapePressed = useKeyPress({ targetKey: "Escape" });

  const isVisible = currentCourseType !== null;

  if (isVisible && isEscapePressed) {
    handleClose();
  }

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
          <div className="modal-body">
            <div className="input-container">
              <SelectSearch
                options={[
                  { name: "Swedish", value: "sv" },
                  { name: "English", value: "en" },
                ]}
                search
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                placeholder="Select subject"
              />

              <div className="container">
                <div className="container__item">
                  <form className="form">
                    <input
                      type="email"
                      className="form__field"
                      placeholder="Enter course #"
                      onChange={(e) => setCourseNum(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <h3>Modal Footer</h3>
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
          background-color: #fefefe;
          margin: auto;
          padding: 0;
          border: 1px solid #888;
          width: 80%;
          height: 80vh;
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

        .modal-body {
          padding: 2px 16px;
        }

        .modal-footer {
          padding: 2px 16px;
          color: white;
        }

        h2 {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 1.4rem;
        }

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }

        //** variables
        $background: #f5f6fa;
        $text: #9c9c9c;
        $input-bg-color: #fff;
        $input-text-color: #a3a3a3;
        $button-bg-color: #7f8ff4;
        $button-text-color: #fff;

        //** root
        :root {
          background: $background;
          color: $text;
          font: 1rem "PT Sans", sans-serif;
        }

        html,
        body,
        .container {
          height: 100%;
        }

        a {
          color: inherit;

          &:hover {
            color: $button-bg-color;
          }
        }

        //** helper
        .container {
          margin-left: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .uppercase {
          text-transform: uppercase;
        }

        //** button
        .btn {
          display: inline-block;
          background: transparent;
          color: inherit;
          font: inherit;
          border: 0;
          outline: 0;
          padding: 0;
          transition: all 200ms ease-in;
          cursor: pointer;

          &--primary {
            background: $button-bg-color;
            color: $button-text-color;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            padding: 12px 36px;

            &:hover {
              background: darken($button-bg-color, 4%);
            }

            &:active {
              background: $button-bg-color;
              box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, 0.2);
            }
          }

          &--inside {
            margin-left: -96px;
          }
        }

        //** form
        .form {
          &__field {
            width: 160px;
            background: #fff;
            color: $input-text-color;
            font-family: "Noto Sans", sans-serif;
            box-shadow: 0 0.0625rem 0.125rem rgb(0 0 0 / 15%);
            border: 0;
            outline: 0;
            padding: 10.5px 18px;
            border-radius: 3px;

            &:hover {
              border: 1px solid #2fcc8b;
              padding: 10px 17px;
              margin-bottom: -1px;
            }
          }
        }

        .input-container {
          display: flex;
        }

        .modal-body {
          display: grid;
          place-items: center;
        }
      `}</style>
    </>
  );
}

export default AddCourseModal;

import { useState } from "react";

function CourseNumInput() {
  const [courseNum, setCourseNum] = useState("");
  return (
    <>
      <div className="container">
        <div className="container__item">
          <form className="form">
            <input
              type="number"
              className="form__field"
              placeholder="Enter course #"
              value={courseNum}
              onChange={(e) => setCourseNum(e.target.value)}
              onWheel={(e) => (e.target as HTMLElement).blur()}
            />
          </form>
        </div>
      </div>
      <style jsx>{`
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
      `}</style>
    </>
  );
}

export default CourseNumInput;

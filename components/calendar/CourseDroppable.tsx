import { Droppable } from "react-beautiful-dnd"
import { CourseID } from "../../shared/model/Course"
import { CourseTime } from "../../shared/model/CourseTime"
import { CourseTimeslot } from "../../shared/model/CourseConfiguration"
import * as constants from "./ScheduleGridHelpers"

interface CourseDroppableProps
{
  courseTimes: CourseTime[]
  enrollCode: string
  courseID: CourseID
}

export function CourseDroppable({courseTimes, enrollCode, courseID} : CourseDroppableProps)
{
  let randomBackgroundColor = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")"

  return (
    <>
      <div>
        {courseTimes.flatMap(courseTime => {
          if (!courseTime.startTime || !courseTime.endTime) { return }
          return courseTime.days.flatMap((dayOfWeek, index) => {
            return (
              <Droppable droppableId={enrollCode} type={courseID.toString()} children={() => (
                <div style={{
                  width: constants.width/constants.columnCount-constants.verticalLineWidth,
                  height: constants.getSlotHeight(courseTime.startTime!, courseTime.endTime!),
                  top: constants.timeToYPos(courseTime.startTime!)+constants.weekdayLabelHeight+constants.weekdayLabelTopMargin,
                  left: constants.dayLetterToXPos(dayOfWeek.letter)+constants.timeLabelWidth+constants.verticalLineWidth,
                  position: "absolute",
                  backgroundColor: randomBackgroundColor
                }}></div>
              )} />
            )
          })
        })}
      </div>
    </>
  )
}

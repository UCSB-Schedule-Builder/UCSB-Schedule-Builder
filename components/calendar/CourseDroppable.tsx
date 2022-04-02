import { Droppable } from "react-beautiful-dnd"
import { CourseID } from "../../shared/model/Course"
import { CourseTime } from "../../shared/model/CourseTime"
import { CourseTimeslot } from "../../shared/model/CourseConfiguration"
import * as constants from "./ScheduleGridHelpers"

interface CourseDroppableProps
{
  timeslot: CourseTimeslot
  courseID: CourseID
}

export function CourseDroppable({timeslot, courseID} : CourseDroppableProps)
{
  let mainStartTime = timeslot.times[0].startTime!
  let mainEndTime = timeslot.times[0].endTime!
  let mainDayOfWeek = timeslot.times[0].days[0]

  return (
    <>
      <div>
        {timeslot.times.flatMap(courseTime => {
          if (!courseTime.startTime || !courseTime.endTime) { return }
          return courseTime.days.flatMap((dayOfWeek, index) => {
            return (
              <Droppable droppableId={timeslot.enrollCode} type={courseID.toString()} children={() => (
                <div style={{
                  width: constants.width/constants.columnCount-constants.verticalLineWidth,
                  height: constants.getSlotHeight(courseTime.startTime!, courseTime.endTime!),
                  top: constants.timeToYPos(courseTime.startTime!)+constants.weekdayLabelHeight+constants.weekdayLabelTopMargin,
                  left: constants.dayLetterToXPos(dayOfWeek.letter)+constants.timeLabelWidth+constants.verticalLineWidth,
                  position: "absolute",
                  backgroundColor: "blue"
                }}></div>
              )} />
            )
          })
        })}
      </div>
    </>
  )
}

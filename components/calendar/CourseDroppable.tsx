import { Droppable } from "react-beautiful-dnd"
import { CourseID } from "../../shared/model/Course"
import { CourseTime } from "../../shared/model/CourseTime"
import { CourseTimeslot } from "../../shared/model/CourseConfiguration"
import { timeToYPos, dayLetterToXPos, getSlotHeight, width, columnCount, weekdayLabelMargin, timeLabelMargin } from "./ScheduleGridHelpers"

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
      <div style={{}}>
        <Droppable droppableId={timeslot.enrollCode} type={courseID.toString()} children={() => (
          <div style={{width: width/columnCount, height: getSlotHeight(mainStartTime, mainEndTime), top: timeToYPos(mainStartTime)+weekdayLabelMargin+5, left: dayLetterToXPos(mainDayOfWeek.letter)+timeLabelMargin+4, position: "absolute", backgroundColor: "blue"}}></div>
        )} />
      </div>
      <div>
        {timeslot.times.flatMap(courseTime => {
          if (!courseTime.startTime || !courseTime.endTime) { return }
          return courseTime.days.flatMap((dayOfWeek, index) => {
            if (index == 0) { return [] }
            return (
              <div style={{width: width/columnCount, height: getSlotHeight(courseTime.startTime!, courseTime.endTime!), top: timeToYPos(courseTime.startTime!)+weekdayLabelMargin+5, left: dayLetterToXPos(dayOfWeek.letter)+timeLabelMargin+4, position: "absolute", backgroundColor: "blue"}}></div>
            )
          })
        })}
      </div>
    </>
  )
}

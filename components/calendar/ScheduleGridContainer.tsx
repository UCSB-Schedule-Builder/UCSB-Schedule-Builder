import { ScheduleGridFrame, ScheduleGridFrameProps } from "./ScheduleGridFrame"
import { CourseDroppable } from "./CourseDroppable"
import { DragDropContext } from "react-beautiful-dnd"
import useSchedule from "../../stores/schedule"
import useCourseLists from "../../stores/courseLists"
import { HourMinute } from "../../shared/model/CourseTime"
import * as constants from "./ScheduleGridHelpers"

function ScheduleGridContainer() {
  const schedule = useSchedule(state => state.schedule)
  const courseTimeslotArray = schedule.courseConfigurations

  const courseArray = useCourseLists(state => state.main)

  return (
    <div>
      <div style={{marginTop: 5, marginLeft: 50, position: "relative"}}>
        <ScheduleGridFrame columnCount = {constants.columnCount}
          weekColumns={constants.weekColumns}
          timeStart={constants.timeStart}
          timeEnd={constants.timeEnd}
          timeIncrement={constants.timeIncrement}
          width={constants.width}
          rowHeight={constants.rowHeight}
          weekdayLabelHeight={constants.weekdayLabelHeight}
          timeLabelWidth={constants.timeLabelWidth}
          weekdayLabelTopMargin={constants.weekdayLabelTopMargin}
          timeLabelRightPadding={constants.timeLabelRightPadding}
          verticalLineWidth={constants.verticalLineWidth}
          horizontalLineHeight={constants.horizontalLineHeight}
          labelFontSize={constants.labelFontSize}
          use24HourTime={true}
        />
        <DragDropContext onDragEnd={() => {}}>
          {courseArray.flatMap(course => {
            console.log(course.lectures)
            return course.lectures.filter(lecture => lecture.times.length > 0 && lecture.times[0].startTime && lecture.times[0].endTime)
            .flatMap(lecture => (
              <CourseDroppable courseTimes={lecture.times} enrollCode={lecture.enrollCode} courseID={course.id} />
            ))
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default ScheduleGridContainer

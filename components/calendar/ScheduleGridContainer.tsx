import { ScheduleGridFrame, ScheduleGridFrameProps } from "./ScheduleGridFrame";
import { HourMinute } from "../../shared/model/CourseTime";
import * as constants from "./ScheduleGridHelpers";

function ScheduleGridContainer() {

  return (
    <div>
      <div style={{marginTop: 5, marginLeft: 50, position: "relative"}}>
        <ScheduleGridFrame columnCount = {constants.columnCount}
          weekColumns = {constants.weekColumns}
          timeStart = {constants.timeStart}
          timeEnd = {constants.timeEnd}
          timeIncrement = {constants.timeIncrement}
          width = {constants.width}
          rowHeight = {constants.rowHeight}
          margins= {constants.margins}
        />
      </div>
    </div>
  )
}

export default ScheduleGridContainer;

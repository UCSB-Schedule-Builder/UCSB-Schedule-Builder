import { ScheduleGridFrame, ScheduleGridFrameProps } from "./ScheduleGridFrame";

const weekColumns = [
{id: "monday", letter: "M", name: "Monday"},
{id: "tuesday", letter: "T", name: "Tuesday"},
{id: "wednesday", letter: "W", name: "Wednesday"},
{id: "thursday", letter: "R", name: "Thursday"},
{id: "friday", letter: "F", name: "Friday"}
];

//constants :P
const columnCount = weekColumns.length;
const timeStart = {hour: 8, minute: 0};
const timeEnd = {hour: 22, minute: 1};
const timeIncrement = 5;
const width = 700;
const rowHeight = 3;
const margins = [10, 0];

function ScheduleGridContainer() {

  return (
    <div>
      <div style={{marginTop: 5, marginLeft: 50, position: "relative"}}>
        <ScheduleGridFrame columnCount = {columnCount}
          weekColumns = {weekColumns}
          timeStart = {timeStart}
          timeEnd = {timeEnd}
          timeIncrement = {timeIncrement}
          width = {width}
          rowHeight = {rowHeight}
          margins= {margins}
        />
      </div>
    </div>
  )
}

function dayLetterToXPos(day:string): number {
  let dayIndex = weekColumns.findIndex( (dayColumn) => dayColumn.letter == day );
  return width/columnCount*dayIndex;
}

export default ScheduleGridContainer;

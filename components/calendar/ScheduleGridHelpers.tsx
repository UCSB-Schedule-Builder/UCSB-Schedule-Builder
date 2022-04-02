import { HourMinute } from "../../shared/model/CourseTime"
import { ScheduleGridFrameProps } from "./ScheduleGridFrame"

export const weekColumns = [
  {id: "monday", letter: "M", name: "Monday"},
  {id: "tuesday", letter: "T", name: "Tuesday"},
  {id: "wednesday", letter: "W", name: "Wednesday"},
  {id: "thursday", letter: "R", name: "Thursday"},
  {id: "friday", letter: "F", name: "Friday"}
];

//constants :P
export const columnCount = weekColumns.length;
export const timeStart = {hour: 8, minute: 0};
export const timeEnd = {hour: 22, minute: 1};
export const timeIncrement = 5;
export const width = 700;
export const rowHeight = 3;
export const weekdayLabelHeight = 20;
export const timeLabelWidth = 70;
export const weekdayLabelTopMargin = 5;
export const timeLabelRightPadding = 5;
export const verticalLineWidth = 4;
export const horizontalLineHeight = 2;
export const labelFontSize = 16;

export function dayLetterToXPos(day:string): number {
  let dayIndex = weekColumns.findIndex( (dayColumn) => dayColumn.letter == day );
  return width/columnCount*dayIndex;
}

export function timeToYPos(currTime: HourMinute){
  let rowNum = getTimeDifference(timeStart, currTime)/timeIncrement;
  return rowHeight*rowNum;
}

export function getSlotHeight(startTime: HourMinute, endTime: HourMinute)
{
  return getTimeDifference(startTime, endTime)/timeIncrement*rowHeight
}

export function getTimeDifference(time1: HourMinute, time2: HourMinute)
{
  let time1Minutes = 60*time1.hour+time1.minute
  let time2Minutes = 60*time2.hour+time2.minute
  return time2Minutes-time1Minutes
}

export function getTime(rowNumber: number, props: ScheduleGridFrameProps)
{
  let minutesAfterStart = rowNumber*props.timeIncrement
  return {hour: props.timeStart.hour+Math.floor(minutesAfterStart/60)+Math.floor((props.timeStart.minute+minutesAfterStart%60)/60), minute: (props.timeStart.minute+minutesAfterStart%60)%60} // Have to add extra hour if timeStart.minute+minutesAfterStart%60 is greater than 60
}

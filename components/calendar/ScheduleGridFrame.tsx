import { HourMinute } from "../../shared/model/CourseTime"
import { getTime, getTimeDifference } from "./ScheduleGridHelpers"

export interface ScheduleGridFrameProps
{
  columnCount: number
  weekColumns: any[]
  timeStart: HourMinute
  timeEnd: HourMinute
  timeIncrement: number

  width: number
  rowHeight: number

  weekdayLabelHeight: number
  timeLabelWidth: number

  weekdayLabelTopMargin: number
  timeLabelRightPadding: number

  verticalLineWidth: number
  horizontalLineHeight: number

  labelFontSize: number

  use24HourTime: boolean
}

export function ScheduleGridFrame(props: ScheduleGridFrameProps)
{
  const verticalLineStyle = {
    position: "absolute",
    borderLeft: props.verticalLineWidth + "px solid white",
    opacity: 0.5
  }

  const horizontalLineStyle = {
    position: "absolute",
    borderTop: props.horizontalLineHeight + "px solid white",
    opacity: 0.2
  }

  let rowCount = getTimeDifference(props.timeStart, props.timeEnd)/props.timeIncrement

  const gridContainerStyle = {
    marginTop: props.weekdayLabelTopMargin,
    marginLeft: props.timeLabelWidth,
    position: "relative" as any
  }

  const gridTimeStyle = {
    position: "absolute" as any,
    height: rowCount*props.rowHeight,
    color: "white",
    width: props.timeLabelWidth,
    fontSize: props.labelFontSize,
    display: "flex",
    justifyContent: "right",
    paddingRight: props.timeLabelRightPadding
  }

  const gridWeekdayStyle = {
    width: props.width+gridContainerStyle.marginLeft,
    color: "white",
    height: props.weekdayLabelHeight
  }

  let gridLines = []

  for (let columnOn = 0; columnOn < props.columnCount+1; columnOn++)
  {
    let columnLine: any = {}
    columnLine.left = columnOn*props.width/props.columnCount
    columnLine.height = rowCount*props.rowHeight
    mergeObject(columnLine, verticalLineStyle)

    gridLines.push({key: "columnLine" + columnOn, style: columnLine})
  }

  for (let rowOn = 0; rowOn < rowCount; rowOn++)
  {
    let minuteOn = props.timeStart.minute+rowOn*props.timeIncrement
    if (minuteOn % 60 !== 0) { continue }

    let rowLine: any = {}
    rowLine.left = 0
    rowLine.top = rowOn*props.rowHeight
    rowLine.width = props.width
    mergeObject(rowLine, horizontalLineStyle)

    gridLines.push({key: "rowLine" + rowOn, style: rowLine})
  }

  let gridTimes = []
  for (let rowOn = 0; rowOn < rowCount; rowOn++)
  {
    let timeForRow = getTime(rowOn, props)
    if (timeForRow.minute !== 0) { continue }

    let timeData: any = {style: {position: "absolute"}}
    timeData.style.top = rowOn*props.rowHeight-(props.labelFontSize+2)/2 // +2 for extra padding inside text boxes

    let hour24 = timeForRow.hour
    let hour12
    if (hour24 === 0)
    {
      hour12 = "12 AM"
    }
    else if (hour24 < 12)
    {
      hour12 = hour24 + " AM"
    }
    else if (hour24 === 12)
    {
      hour12 = "12 PM"
    }
    else
    {
      hour12 = (hour24-12) + " PM"
    }

    timeData.hour12 = hour12
    timeData.hour24 = zeroPadding(hour24) + ":00"

    gridTimes.push(timeData)
  }

  let gridWeekdays = []
  for (let columnOn = 0; columnOn < props.columnCount; columnOn++)
  {
    let weekdayData: any = {style: {display: "inline-flex", justifyContent: "center", position: "absolute", fontWeight: "bold"}}
    weekdayData.style.left = props.timeLabelWidth+props.width/props.columnCount*columnOn+props.verticalLineWidth/2
    weekdayData.style.width = props.width/props.columnCount

    weekdayData.name = props.weekColumns[columnOn].name

    gridWeekdays.push(weekdayData)
  }

  return (
    <>
      <div style={gridWeekdayStyle}>
        {
          gridWeekdays.map(weekdayData => {
            return (
              <div style={weekdayData.style} key={"weekday-" + weekdayData.name}>
                {weekdayData.name}
              </div>
            )
          })
        }
      </div>
      <div>
        <div style={gridTimeStyle}>
          {
            gridTimes.map(timeData => {
              return (
                <div style={timeData.style} key={"time-" + timeData.hour12}>
                  {props.use24HourTime ? timeData.hour24 : timeData.hour12}
                </div>
              )
            })
          }
        </div>
        <div style={gridContainerStyle}>
          <div style={{borderRadius:20}}>
            {
              gridLines.map(lineData => {
                return (
                  <div key={lineData.key} style={lineData.style}></div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

function mergeObject(mainObject: any, additionalObject: any, overwrite: boolean = false)
{
  for (let key in additionalObject)
  {
    if (!(key in mainObject) || overwrite)
    {
      mainObject[key] = additionalObject[key]
    }
  }
}

function zeroPadding(num: number)
{
  if (num < 10)
  {
    return "0" + num
  }
  return num
}

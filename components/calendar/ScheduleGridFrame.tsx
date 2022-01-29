import { HourMinute } from "../../shared/model/CourseTime"

export interface ScheduleGridFrameProps
{
  columnCount: number
  weekColumns: any[]
  timeStart: HourMinute
  timeEnd: HourMinute
  timeIncrement: number

  width: number
  rowHeight: number
  margins: number[]
}

export function ScheduleGridFrame(props: ScheduleGridFrameProps)
{
  const verticalLineStyle = {
    position: "absolute",
    borderLeft: "4px solid white",
    opacity: 0.5
  }

  const horizontalLineStyle = {
    position: "absolute",
    borderTop: "2px solid white",
    opacity: 0.2
  }

  let rowCount = getTimeDifference(props.timeStart, props.timeEnd)/props.timeIncrement

  const gridContainerStyle = {
    marginTop: 5,
    marginLeft: 50,
    position: "relative" as any
  }

  const gridTimeStyle = {
    float: "left" as any,
    height: rowCount*(props.rowHeight+props.margins[1]),
    color: "white"
  }

  const gridWeekdayStyle = {
    width: props.width+gridContainerStyle.marginLeft+props.margins[0],
    color: "white"
  }

  let gridLines = []

  for (let columnOn = 0; columnOn < props.columnCount+1; columnOn++)
  {
    let columnLine: any = {}
    columnLine.left = columnOn*(props.width-props.margins[0])/(props.columnCount)+props.margins[0]/2-1
    columnLine.height = rowCount*(props.rowHeight+props.margins[1])+2
    mergeObject(columnLine, verticalLineStyle)

    gridLines.push({key: "columnLine" + columnOn, style: columnLine})
  }

  for (let rowOn = 0; rowOn < rowCount; rowOn++)
  {
    let minuteOn = props.timeStart.minute+rowOn*props.timeIncrement
    if (minuteOn % 60 !== 0) { continue }

    let rowLine: any = {}
    rowLine.left = props.margins[0]-2
    rowLine.top = rowOn*(props.rowHeight+props.margins[1])+props.margins[1]
    rowLine.width = props.width-props.margins[0]-2*2
    mergeObject(rowLine, horizontalLineStyle)

    gridLines.push({key: "rowLine" + rowOn, style: rowLine})
  }

  let gridTimes = []
  for (let rowOn = 0; rowOn < rowCount; rowOn++)
  {
    let timeForRow = getTime(rowOn, props)
    if (timeForRow.minute !== 0) { continue }

    let timeData: any = {style: {}}
    if (rowOn < 60/props.timeIncrement)
    {
      timeData.style.marginTop = rowOn*props.rowHeight-(16+2)/2 // i have no idea where these numbers come from
    }
    else
    {
      timeData.style.marginTop = 60/props.timeIncrement*props.rowHeight-(16+4) // i have no idea where these numbers come from either
    }
    timeData.style.textAlign = "right"

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

    gridTimes.push(timeData)
  }

  let gridWeekdays = []
  for (let columnOn = 0; columnOn < props.columnCount; columnOn++)
  {
    let weekdayData: any = {style: {display: "inline-flex", justifyContent: "center", fontWeight: "bold"}}
    if (columnOn == 0)
    {
      weekdayData.style.marginLeft = gridContainerStyle.marginLeft+props.margins[0]+4 // +4 is manual shifting
      weekdayData.style.marginRight = props.margins[0]
      weekdayData.style.width = props.width/props.columnCount-2*props.margins[0]
    }
    else
    {
      weekdayData.style.marginLeft = props.margins[0]
      weekdayData.style.marginRight = props.margins[0]
      weekdayData.style.width = props.width/props.columnCount-2*props.margins[0]-2 // -2 is manual shifting
    }

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
                  {timeData.hour12}
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

function getTimeDifference(time1: HourMinute, time2: HourMinute)
{
  let time1Minutes = 60*time1.hour+time1.minute
  let time2Minutes = 60*time2.hour+time2.minute
  return time2Minutes-time1Minutes
}

function getTime(rowNumber: number, props: ScheduleGridFrameProps)
{
  let minutesAfterStart = rowNumber*props.timeIncrement
  return {hour: props.timeStart.hour+Math.floor(minutesAfterStart/60)+Math.floor((props.timeStart.minute+minutesAfterStart%60)/60), minute: (props.timeStart.minute+minutesAfterStart%60)%60} // Have to add extra hour if timeStart.minute+minutesAfterStart%60 is greater than 60
}

export interface CurrentQuarterData {
  quarter: string;
  qyy: string;
  name: string;
  category: string;
  academicYear: string;
  firstDayOfClasses: string;
  lastDayOfClasses: string;
  firstDayOfFinals: string;
  lastDayOfFinals: string;
  firstDayOfQuarter: string;
  lastDayOfSchedule: string;
  pass1Begin: string;
  pass2Begin: string;
  pass3Begin: string;
  feeDeadline: string;
  lastDayToAddUnderGrad: string;
  lastDayToAddGrad: string;
  lastDayThirdWeek: string | null;
}

export interface ClassSearchData {
  pageNumber: number;
  pageSize: number;
  total: number;
  classes: Class[] | null;
}

export interface Class {
  quarter: string;
  courseId: string;
  title: string;
  contactHours: number | null;
  description: string;
  college: string;
  objLevelCode: string;
  subjectArea: string;
  unitsFixed: number | null;
  unitsVariableHigh: number | null;
  unitsVariableLow: number | null;
  delayedSectioning: string | null;
  inProgressCourse: string | null;
  gradingOption: string | null;
  instructionType: string;
  onLineCourse: boolean;
  deptCode: string;
  generalEducation: GeneralEducationData[] | null;
  classSections: ClassSection[] | null;
}

export interface GeneralEducationData {
  geCode: string;
  geCollege: string;
}

export interface ClassSection {
  enrollCode: string;
  section: string;
  session: string | null;
  classClosed: string | null;
  courseCancelled: string | null;
  gradingOptionCode: string | null;
  enrolledTotal: number | null;
  maxEnroll: number | null;
  secondaryStatus: string | null;
  departmentApprovalRequired: boolean;
  instructorApprovalRequired: boolean;
  restrictionLevel: string | null;
  restrictionMajor: string | null;
  restrictionMajorPass: string | null;
  restrictionMinor: string | null;
  restrictionMinorPass: string | null;
  concurrentCourses: string[] | null;
  timeLocations: TimeLocation[] | null;
  instructors: Instructor[] | null;
}

export interface TimeLocation {
  room: string | null;
  building: string | null;
  roomCapacity: number | null;
  days: string | null;
  beginTime: string | null;
  endTime: string | null;
}

export interface Instructor {
  instructor: string;
  functionCode: string;
}

import { CourseTime, Lecture } from "./model";

const lectureSuffix = "00";
const sectionRegexPattern = /^(\d+)(\d\d)$/; // Sections can match any combination of 3+ digits, where the leading n-2 digits match with the lecture

export class Section {
  id: SectionID;
  enrollCode: string;
  instructorNames: string[];
  times: CourseTime[];
  lecture: Lecture | null;

  constructor(
    id: SectionID,
    enrollCode: string,
    instructorNames: string[],
    times: CourseTime[]
  ) {
    this.id = id;
    this.enrollCode = enrollCode;
    this.instructorNames = instructorNames;
    this.times = times;
    this.lecture = null;
  }

  static fromJSON(courseSectionJSON: any): Section {
    return new Section(
      SectionID.fromString(courseSectionJSON.section)!,
      courseSectionJSON.enrollCode,
      courseSectionJSON.instructors.map((instructorData: any) => {
        return instructorData.instructor;
      }),
      courseSectionJSON.timeLocations.map((timeLocationJSON: any) => {
        return CourseTime.fromJSON(timeLocationJSON);
      })
    );
  }

  setLecture(lecture: Lecture) {
    this.lecture = lecture;
  }

  isLecture() {
    return this.id.isLecture();
  }

  getLectureID() {
    return this.id.getLectureID();
  }
}

export class SectionID {
  idPrefix: string;
  idSuffix: string;

  constructor(idPrefix: string, idSuffix: string) {
    this.idPrefix = idPrefix;
    this.idSuffix = idSuffix;
  }

  static fromString(idString: string): SectionID | null {
    const regexMatch = idString.match(sectionRegexPattern);
    if (regexMatch == null || regexMatch.length <= 2) {
      return null;
    }

    return new SectionID(regexMatch[1]!, regexMatch[2]!);
  }

  toString(): string {
    return this.idPrefix + this.idSuffix;
  }

  isLecture(): boolean {
    return this.idSuffix === lectureSuffix;
  }

  getLectureID(): SectionID {
    return new SectionID(this.idPrefix, lectureSuffix);
  }
}

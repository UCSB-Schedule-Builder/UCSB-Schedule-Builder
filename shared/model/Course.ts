import { Lecture, Section, Subject } from "./model";
import { YearQuarter } from "./YearQuarter";

export class Course {
  quarter: YearQuarter;
  id: CourseID;
  title: string;
  description: string;
  units: UnitsRange;
  subject: Subject;
  lectures: Lecture[];

  constructor(
    quarter: YearQuarter,
    id: CourseID,
    title: string,
    description: string,
    units: UnitsRange,
    subject: Subject
  ) {
    this.quarter = quarter;
    this.id = id;
    this.title = title;
    this.description = description;
    this.units = units;
    this.subject = subject;
    this.lectures = [];
  }

  static fromJSON(courseJSON: any, subject: Subject): Course {
    return new Course(
      YearQuarter.fromString(courseJSON.quarter)!,
      CourseID.fromString(courseJSON.courseId),
      courseJSON.title,
      courseJSON.description,
      new UnitsRange(
        courseJSON.unitsFixed,
        courseJSON.unitsVariableLow,
        courseJSON.unitsVariableHigh
      ),
      subject
    );
  }

  createLectures(sections: Section[]) {
    sections.sort((section1, section2) => {
      return (section2.isLecture() ? 1 : 0) - (section1.isLecture() ? 1 : 0);
    });

    sections.forEach((section) => {
      if (section.isLecture()) {
        const newLecture = new Lecture(section);
        this.lectures.push(newLecture);
      } else {
        const lectureIDToFind = section.getLectureID();
        const foundLecture = this.lectures.find(
          (lecture) => lecture.id.toString() === lectureIDToFind.toString()
        );
        if (!foundLecture) {
          return;
        }

        foundLecture.addSection(section);
      }
    });
  }
}

export class CourseID {
  subject: string;
  prefix: string;
  number: string;
  suffix: string;

  constructor(subject: string, prefix: string, number: string, suffix: string) {
    this.subject = subject;
    this.prefix = prefix;
    this.number = number;
    this.suffix = suffix;
  }

  static fromString(courseIDString: string): CourseID {
    const subjectLength = 5;
    const prefixLength = 3;
    const numberLength = 3;
    const suffixLength = 2;

    const subjectSlice = courseIDString.slice(0, subjectLength);
    const prefixSlice = courseIDString.slice(
      subjectLength,
      subjectLength + prefixLength
    );
    const numberSlice = courseIDString.slice(
      subjectLength + prefixLength,
      subjectLength + prefixLength + numberLength
    );
    const suffixSlice = courseIDString.slice(
      subjectLength + prefixLength + numberLength,
      subjectLength + prefixLength + numberLength + suffixLength
    );

    return new CourseID(subjectSlice, prefixSlice, numberSlice, suffixSlice);
  }

  toString(): string {
    return (
      this.fillStringWhitespace(this.subject, 5, false) +
      this.fillStringWhitespace(this.prefix, 3, false) +
      this.fillStringWhitespace(this.number, 3, true) +
      this.fillStringWhitespace(this.suffix, 2, false)
    );
  }

  getNumberWithSuffix(): string {
    return (
      this.removeStringWhitespace(this.number, true) +
      this.removeStringWhitespace(this.suffix, false)
    );
  }

  fillStringWhitespace(
    stringToFill: string,
    size: number,
    shouldPrepend: boolean
  ): string {
    let filledString = stringToFill;
    while (filledString.length < size) {
      if (shouldPrepend) {
        filledString = " " + filledString;
      } else {
        filledString += " ";
      }
    }

    if (filledString.length > size) {
      filledString = filledString.slice(0, size);
    }

    return filledString;
  }

  removeStringWhitespace(stringToFill: string, removeLeading: boolean): string {
    return removeLeading
      ? stringToFill.replace(/^\s*/, "")
      : stringToFill.replace(/\s*$/, "");
  }
}

export class UnitsRange {
  areVariable: boolean;
  fixed: number | null;
  min: number | null;
  max: number | null;

  constructor(fixed: number | null, min: number | null, max: number | null) {
    this.areVariable = fixed == null && min != null && max != null;

    this.fixed = fixed;
    this.min = min;
    this.max = max;
  }
}

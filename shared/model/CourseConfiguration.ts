import { YearQuarter } from "./YearQuarter";
import { Subject } from "./Subject";
import { CourseID, UnitsRange } from "./Course";
import { CourseTime } from "./CourseTime";
import { SectionID } from "./Section";
import { Duration, Interval } from "luxon";
import cartesianProduct from "just-cartesian-product";

export class CourseConfiguration {
  constructor(
    public quarter: YearQuarter,
    public id: CourseID,
    public title: string,
    public description: string,
    public units: UnitsRange,
    public subject: Subject,
    public lectureSlot: CourseTimeslot,
    public sectionSlot: CourseTimeslot
  ) {}

  static getOverlap(a: CourseConfiguration, b: CourseConfiguration) {
    return CourseTimeslot.getOverlap(a.lectureSlot, b.lectureSlot)
      .plus(CourseTimeslot.getOverlap(a.lectureSlot, b.sectionSlot))
      .plus(CourseTimeslot.getOverlap(a.sectionSlot, b.lectureSlot))
      .plus(CourseTimeslot.getOverlap(a.sectionSlot, b.sectionSlot));
  }
}

export class CourseTimeslot {
  constructor(
    public id: SectionID,
    public enrollCode: string,
    public instructorNames: string[],
    public times: CourseTime[]
  ) {}

  static getOverlap(courseA: CourseTimeslot, courseB: CourseTimeslot) {
    const courseAIntervals = courseA.toIntervals();
    const courseBIntervals = courseB.toIntervals();
    const intervalPairs = cartesianProduct([
      courseAIntervals,
      courseBIntervals,
    ]);
    return intervalPairs
      .map(([a, b]) => a.intersection(b))
      .reduce((acc, curr) => {
        if (curr?.isValid) {
          return acc.plus(curr.toDuration());
        }
        return acc;
      }, Duration.fromMillis(0));
  }

  toIntervals(): Interval[] {
    return this.times.flatMap((time) => time.toIntervals());
  }
}

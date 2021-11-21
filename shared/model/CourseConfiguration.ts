import { Duration, Interval } from "luxon";
import cartesianProduct from "just-cartesian-product";

import {
  CourseID,
  CourseTime,
  SectionID,
  Subject,
  UnitsRange,
  YearQuarter,
} from "./model";

export class CourseConfiguration {
  constructor(
    public quarter: YearQuarter,
    public id: CourseID,
    public title: string,
    public description: string,
    public units: UnitsRange,
    public subject: Subject,
    public lectureSlot: CourseTimeslot,
    public sectionSlot?: CourseTimeslot
  ) {}

  static getOverlap(a: CourseConfiguration, b: CourseConfiguration) {
    const overlap = CourseTimeslot.getOverlap(a.lectureSlot, b.lectureSlot);
    if (a.sectionSlot) {
      overlap.plus(CourseTimeslot.getOverlap(a.sectionSlot, b.lectureSlot));
    }
    if (b.sectionSlot) {
      overlap.plus(CourseTimeslot.getOverlap(a.lectureSlot, b.sectionSlot));
    }
    if (a.sectionSlot && b.sectionSlot) {
      overlap.plus(CourseTimeslot.getOverlap(a.sectionSlot, b.sectionSlot));
    }
    return overlap;
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

import { Duration } from "luxon";
import { Combination } from "js-combinatorics";

import { CourseConfiguration } from "./CourseConfiguration";

export class Schedule {
  public overlap: Duration;

  constructor(public courseConfigurations: CourseConfiguration[]) {
    const courseConfigurationPairs = new Combination(
      courseConfigurations,
      2
    ).toArray();
    this.overlap = courseConfigurationPairs.reduce(
      (acc, [a, b]) => acc.plus(CourseConfiguration.getOverlap(a, b)),
      Duration.fromMillis(0)
    );
  }
}

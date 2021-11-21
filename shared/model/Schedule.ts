import { Duration } from "luxon";
import { CourseConfiguration } from "./CourseConfiguration";

import { Combination } from "js-combinatorics";

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

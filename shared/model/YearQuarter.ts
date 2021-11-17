export class YearQuarter {
  constructor(private year: number, private quarter: Quarter) {}

  static fromString(yearQuarterString: string): YearQuarter {
    if (yearQuarterString.length !== 5) {
      throw new Error(
        `YearQuarter.fromString: yearQuarterString must be 5 characters long, got ${yearQuarterString}`
      );
    }
    const yearSlice = yearQuarterString.slice(0, 4);
    const quarterSlice = yearQuarterString.slice(4, 5);

    return new YearQuarter(parseInt(yearSlice), parseInt(quarterSlice));
  }

  next(): YearQuarter {
    if (this.quarter === Quarter.FALL) {
      return new YearQuarter(this.year + 1, Quarter.WINTER);
    } else {
      return new YearQuarter(this.year, this.quarter + 1);
    }
  }

  toString(): string {
    return this.year.toString() + this.quarter.toString();
  }
}

export enum Quarter {
  WINTER = 1,
  SPRING = 2,
  SUMMER = 3,
  FALL = 4,
}

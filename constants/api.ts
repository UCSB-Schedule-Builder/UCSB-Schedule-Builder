import { YearQuarter } from "../shared/model/YearQuarter";

export const UCSBAPIKey = process.env.NEXT_PUBLIC_UCSB_API_KEY;

const UCSBAPIEndpoint = "https://api.ucsb.edu";
const UCSBAPIVersion = "v1";

const UCSBAcademicsEndpoint = `${UCSBAPIEndpoint}/academics`;

const UCSBRegistrarEndpoint =
  "https://registrar.sa.ucsb.edu/webservices/public/lookups";
const UCSBRegistrarMajorAPIVersion = "v1";
export const UCSBRegistrarAPIVersion = "1.7";

export const UCSBAPIPaths = {
  classSearch: `${UCSBAcademicsEndpoint}/curriculums/${UCSBAPIVersion}/classes/search`,
  subjects: `${UCSBRegistrarEndpoint}/${UCSBRegistrarMajorAPIVersion}/subjects`,
  currentQuarter: `${UCSBAcademicsEndpoint}/quartercalendar/${UCSBAPIVersion}/quarters/current`,
};

export const maxPageSize = 500;

export const defaultQuarter = YearQuarter.fromString(
  process.env.NEXT_PUBLIC_CURRENT_QUARTER ?? "20221"
);

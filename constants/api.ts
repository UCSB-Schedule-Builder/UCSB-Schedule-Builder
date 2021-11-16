import { YearQuarter, Quarter } from "../shared/model/Course";

export const UCSBAPIKey = process.env.NEXT_PUBLIC_UCSB_API_KEY;

const UCSBAPIEndpoint = "https://api.ucsb.edu";
const UCSBAPIVersion = "v1";

const UCSBRegistrarAPIEndpoint =
  "https://registrar.sa.ucsb.edu/webservices/public/lookups";
const UCSBRegistrarMajorAPIVersion = "v1";
export const UCSBRegistrarAPIVersion = "1.7";

export const UCSBAPIPaths = {
  classSearch:
    UCSBAPIEndpoint +
    "/academics/curriculums/" +
    UCSBAPIVersion +
    "/classes/search",
  subjects:
    UCSBRegistrarAPIEndpoint + "/" + UCSBRegistrarMajorAPIVersion + "/subjects",
};

export const maxPageSize = 500;

export const defaultQuarter = YearQuarter.fromString(process.env.NEXT_PUBLIC_CURRENT_QUARTER) ?? new YearQuarter(2022, Quarter.Winter)

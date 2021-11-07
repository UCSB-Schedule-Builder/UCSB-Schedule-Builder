// import DotEnv from "dotenv"

// DotEnv.config()

export const UCSBAPIKey = "lTYBsNXNiLPT2WhiPDICEylqo9uXhN49"//process.env.UCSB_API_KEY
const UCSBAPIEndpoint = "https://api.ucsb.edu"
const UCSBAPIVersion = "v1"

const UCSBRegistrarAPIEndpoint = "https://registrar.sa.ucsb.edu/webservices/public/lookups"
const UCSBRegistrarMajorAPIVersion = "v1"
const UCSBRegistrarAPIVersion = "1.7"

export enum UCSBAPIPaths {
  classSearch = UCSBAPIEndpoint + "/academics/curriculums/" + UCSBAPIVersion + "/classes/search",
  subjects = UCSBRegistrarAPIEndpoint + "/" + UCSBRegistrarMajorAPIVersion + "/subjects"
}

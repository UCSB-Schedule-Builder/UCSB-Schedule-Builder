export const UCSBAPIKey = process.env.REACT_APP_UCSB_API_KEY

const UCSBAPIEndpoint = "https://api.ucsb.edu"
const UCSBAPIVersion = "v1"

const UCSBRegistrarAPIEndpoint = "https://registrar.sa.ucsb.edu/webservices/public/lookups"
const UCSBRegistrarMajorAPIVersion = "v1"
export const UCSBRegistrarAPIVersion = "1.7"

export const UCSBAPIPaths = {
  classSearch: UCSBAPIEndpoint + "/academics/curriculums/" + UCSBAPIVersion + "/classes/search",
  subjects: UCSBRegistrarAPIEndpoint + "/" + UCSBRegistrarMajorAPIVersion + "/subjects"
}

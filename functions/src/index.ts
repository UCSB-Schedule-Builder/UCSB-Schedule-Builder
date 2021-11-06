import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const regionalFunctions = functions.region("us-west2");

const UCSB_API_KEY = "lTYBsNXNiLPT2WhiPDICEylqo9uXhN49";

const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 500;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.updateClasses = regionalFunctions.pubsub
  .schedule("every 30 minutes")
  .onRun(async (context) => {
    // const increment = (quarter: string) => {
    //   const yr = parseInt(quarter.slice(0, 4));
    //   const season = parseInt(quarter[4]);
    //   if (quarter[4] === "4") {
    //     return `${yr + 1}1`;
    //   } else {
    //     return `${yr}${season + 1}`;
    //   }
    // };
    //
    // const getNumClasses = async (quarter: string) =>
    //   (
    //     await axios(
    //       "https://api.ucsb.edu/academics/curriculums/v1/classes/search",
    //       {
    //         params: { quarter, pageSize: MIN_PAGE_SIZE },
    //         headers: { "ucsb-api-key": UCSB_API_KEY },
    //       }
    //     )
    //   ).data.total;
    //
    // const getClasses = async (quarter: string) => {
    //   const pages = Math.ceil((await getNumClasses(quarter)) / MAX_PAGE_SIZE);
    //   return (
    //     await Promise.allSettled(
    //       [...Array(pages)].map(
    //         async (_, i) =>
    //           (
    //             await axios(
    //               "https://api.ucsb.edu/academics/curriculums/v1/classes/search",
    //               {
    //                 params: {
    //                   quarter,
    //                   pageNumber: i + 1,
    //                   pageSize: MAX_PAGE_SIZE,
    //                 },
    //                 headers: { "ucsb-api-key": UCSB_API_KEY },
    //               }
    //             )
    //           ).data.classes
    //       )
    //     )
    //   ).flat();
    // };
    //
    // const transform = (classes) => {
    //   interface TransformationMap {
    //     [key: string]: (k: string, v: unknown) => [k: string, v: unknown];
    //   }
    //
    //   const expand = (map: TransformationMap) => {
    //     for (const key in map) {
    //       let subkeys = key.split(/,\s?/),
    //         target = map[key];
    //       delete map[key];
    //       subkeys.forEach((key) => (map[key] = target));
    //     }
    //     return map;
    //   };
    //
    //   const transformationMap = expand({
    //     test: (k, v) => [k, v],
    //     testing: (k, v) => [k.trim().replace(/\s\s+/g, " "), v],
    //   });
    //
    //   return classes.map((theClass) => {});
    // };
    //
    // const insert = (classes) => {};
    //
    // const { quarter } = (
    //   await axios(
    //     "https://api.ucsb.edu/academics/quartercalendar/v1/quarters/current",
    //     { headers: { "ucsb-api-key": UCSB_API_KEY } }
    //   )
    // ).data;
    //
    // // update currentQuarter if necessary
    // db.doc("classes/metadata").set(
    //   { currentQuarter: quarter },
    //   { merge: true }
    // );
    //
    // const nextQuarter = increment(quarter);
    //
    // const promises = [];
    //
    // promises.push(getClasses(quarter));
    //
    // const [err] = await to(getNumClasses(nextQuarter));
    //
    // if (!err) {
    //   promises.push(getClasses(nextQuarter));
    // }
    //
    // const classes = transform(await Promise.allSettled(promises));
    //
    // insert(classes);
    //
    // return null;
  });

export const helloWorld = regionalFunctions.https.onRequest(
  (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);

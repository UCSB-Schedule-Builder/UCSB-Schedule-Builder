import type { NextPage } from "next";
import Head from "next/head";
import AllCoursesList from "../components/AllCoursesList";
import AddCourseModal from "../components/AddCourseModal";
import CourseCalendar from "../components/CourseCalendar";

import { useEffect } from "react";
import { APIManager } from "../api/api-manager"
import { YearQuarter, Quarter, CourseID } from "../shared/model/model"

const Home: NextPage = () => {
  useEffect(async () => {
    // Block for API testing, can be moved elsewhere

    var subjectArray = await APIManager.fetchSubjects()
    console.log(subjectArray)
    var testSubject = subjectArray.find(subject => subject.code == "ENGL")!
    var courseArray = await APIManager.fetchCourses(new YearQuarter(2021, Quarter.Fall), testSubject, false)
    console.log(courseArray)
    var course = await APIManager.fetchCourseFromObject(courseArray[0])
    console.log(course)
    var course2 = await APIManager.fetchCourse(new YearQuarter(2021, Quarter.Fall), new CourseID(testSubject.code, "", "192", "DF"))
    console.log(course2)
  })

  return (
    <div className="container">
      <Head>
        <title>UCSB Schedule Builder</title>
        <meta
          name="description"
          content="Build conflict free UCSB course schedules!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>UCSB Schedule Builder 😎</h1>
      <AllCoursesList />
      <h2>Calendar</h2>
      {/* <CourseCalendar /> */ /* This was causing a bunch of garbage logs, so it has been commented out until ready */}
      <AddCourseModal />
      <style jsx global>{`
        html {
          height: 100%;
        }

        body {
          height: 100%;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #2e22ac 0%, #ce448d 100%)
            no-repeat fixed;
        }
      `}</style>
      <style jsx>{`
        .container {
          margin: 0 15vw 2vh;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 150px);
        }

        h1 {
          color: white;

          font-size: 2.8rem;
          grid-column: 1/-1;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        h2 {
          margin-top: 0;

          color: white;

          font-size: 2.4rem;
          font-weight: 500;

          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Home;

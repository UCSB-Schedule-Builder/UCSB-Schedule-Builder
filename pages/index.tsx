import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import AllCoursesList from "../components/course-list/AllCoursesList";
import AddCourseModal from "../components/add-course-modal/AddCourseModal";

import { APIManager } from "../api/api-manager";
import useCourseMetadata from "../stores/courseMetadata";

import shallow from "zustand/shallow";
import useQuarter from "../hooks/quarter";
import { useEffect } from "react";
import ScheduleGridContainer from "../components/calendar/ScheduleGridContainer"

import useCourseLists from "../stores/courseLists"

export const getStaticProps = async () => {
  return {
    props: {
      subjects: JSON.parse(JSON.stringify(await APIManager.fetchSubjects())),
    },
  };
};

const Home = ({ subjects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setSubjects, setQuarter } = useCourseMetadata(
    ({ setSubjects, setQuarter }) => ({ setSubjects, setQuarter }),
    shallow
  );
  const quarter = useQuarter();
  useEffect(() => {
    setSubjects(subjects);
    setQuarter(quarter);
  }, [quarter, setQuarter, setSubjects, subjects]);
  const { main } = useCourseLists(({ main }) => ({ main }));
  const fails =
    main.some(
      (course) =>
        course.title.toUpperCase().includes("PHYSICS") &&
        course.id.toString().toUpperCase().includes("3")
    ) &&
    !main.every((course) => course.title.toUpperCase().includes("PHYSICS"));
  return (
    <div className="container">
      <Head>
        <title>UCSB Schedule Builder</title>
        <meta
          name="description"
          content="Build conflict free UCSB course schedules!"
        />
      </Head>
      <h1>UCSB Schedule Builder 😎</h1>
      <AllCoursesList />
      <h2>Calendar</h2>
      <ScheduleGridContainer />
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
          margin: 0 5vw 2vh;
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

        p {
          color: ${fails ? "red" : "lightgreen"};
          place-self: center;
          margin-top: -5rem;
        }
      `}</style>
    </div>
  );
};

export default Home;

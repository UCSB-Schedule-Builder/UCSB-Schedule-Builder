import type { NextPage } from 'next';
import Head from 'next/head';
import AllClassesList from '../components/AllClassesList';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>UCSB Schedule Builder</title>
        <meta name="description" content="Build conflict free UCSB class schedules!"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <h1>UCSB Schedule Builder 😎</h1>
      <AllClassesList/>
      <h2>Calendar</h2>
      <style jsx global>{`
        html {
          height: 100%;
        }

        body {
          height: 100%;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #2e22ac 0%, #ce448d 100%) no-repeat fixed;
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

  )
};

export default Home;


import type { NextPage } from 'next';
import Head from 'next/head';
import ClassList from '../components/ClassList';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>UCSB Schedule Builder</title>
        <meta name="description" content="Build conflict free UCSB class schedules!"/>
        <link rel="icon" href="/favicon.ico"/>
        {/*<style>{'body { background-color: #f9f9f9; }'}</style>*/}
      </Head>
      <h1>UCSB Schedule Builder 😎</h1>
      <ClassList/>
      {/*<div>*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <img*/}
      {/*        src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.18169-9/11402729_1021392291228242_7231005243416622122_n.png?_nc_cat=110&ccb=1-5&_nc_sid=973b4a&_nc_ohc=CMGE4vbnWJoAX-Xh4yY&_nc_ht=scontent-lax3-1.xx&oh=b93e1e25f86181d45d6caee2dc6e9198&oe=61A642F2"*/}
      {/*        alt="UCSB CS icon"/>*/}
      {/*      CS 154 - Computer Architecture*/}
      {/*      <span>1</span>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <img src="http://www.placekitten.com/16/16"/>*/}
      {/*      Item 2*/}
      {/*      <span>10</span>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <img src="http://www.placekitten.com/16/16"/>*/}
      {/*      Item 3*/}
      {/*      <span>4</span>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
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

        /*ul {
          list-style-type: none;
          border-radius: 10px;
          width: 200px;
          background-color: #f9f9f9;

          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.20);
        }

        li {
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }

        li:last-child {
          border-bottom: none;
        }

        span {
          float: right;
        }

        img {
          max-width: 100%;
          height: auto;
        }*/
      `}</style>
    </div>

  )
};

export default Home;


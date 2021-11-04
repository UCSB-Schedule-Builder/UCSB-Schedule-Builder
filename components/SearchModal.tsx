import shallow from 'zustand/shallow';
import { useKeyPress } from "@react-typed-hooks/use-key-press";

import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, SearchBox } from 'react-instantsearch-dom';
import Head from 'next/head';

import useSearch from '../stores/classSearch';

function SearchModal() {
  const searchClient = algoliasearch('LCQ3CEQUFK', '659dd77b7fdb7865eaca7c21a20ed8b8');

  const { currentClassType, close } = useSearch(
    ({ currentClassType, close }) => ({ currentClassType, close }), shallow);

  const isEscapePressed = useKeyPress({ targetKey: "Escape" });

  const isVisible = currentClassType !== null;

  const handleClose = () => {
    close();
  };

  if (isVisible && isEscapePressed) {
    handleClose();
  }

  return <>
    <Head>
      {/*Algolia InstantSearch satellite theme CSS*/}
      <link rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
            integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
            crossOrigin="anonymous"/>
    </Head>
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={e =>
        // do not close modal if anything inside modal content is clicked
        e.stopPropagation()
      }>
        <div className="modal-header">
          <span className="close" onClick={handleClose}>&times;</span>
          <h2>Search for classes! 🔎</h2>
        </div>
        <div className="modal-body">
          <InstantSearch searchClient={searchClient} indexName="classes">
            <SearchBox/>
            <Hits/>
          </InstantSearch>

          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </div>
        <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>

    </div>
    <style jsx>{`
      /* The Modal (background) */
      .modal {
        display: ${currentClassType ? "block" : "none"}; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 10px;
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
      }

      /* Add Animation */
      @-webkit-keyframes animatetop {
        from {
          top: -300px;
          opacity: 0
        }
        to {
          top: 0;
          opacity: 1
        }
      }

      @keyframes animatetop {
        from {
          top: -300px;
          opacity: 0
        }
        to {
          top: 0;
          opacity: 1
        }
      }

      /* The Close Button */
      .close {
        color: #C0C0C0;
        float: right;
        font-size: 28px;
        height: 0;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: #172b4d;
        text-decoration: none;
        cursor: pointer;
      }

      .modal-header {
        padding: 2px 16px;
        color: #172b4d;
        font-size: 1.6rem;
      }

      .modal-body {
        padding: 2px 16px;
      }

      .modal-footer {
        padding: 2px 16px;
        color: white;
      }

      h2 {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 1.4rem;
      }
    `}</style>
  </>
}

export default SearchModal;
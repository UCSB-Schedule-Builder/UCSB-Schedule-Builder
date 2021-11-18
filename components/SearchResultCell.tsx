function SearchResultCell({id, title}: {id:string, title:string}) {
  //main gradient: linear-gradient(135deg, #2e22ac 0%, #ce448d 100%)
  return(
    <div className="search-result-cell">
      <div className="course-ID">{id}</div>
      <div className="course-title">{title}</div>
      {<div className="units">Units</div>}

      <style jsx>{`
        .search-result-cell {
          display: flex;
          justify-content: space-between;
          width: 100%;
          background-color: #ddd;
          border-radius: 5px;
          padding: 20px;
          margin: 3px;
          cursor: pointer;
        }

        .search-result-cell:hover {
          background: linear-gradient(135deg, #6e62ec 0%, #ee84cd 100%)

            no-repeat fixed;
          color: #fefefe;

        }
      `}</style>
    </div>


  )
}

export default SearchResultCell;

import React from 'react'
import './Search.css'




const Search= ({ Id, handleIdChange, findId}) => {

  return (
        
     <div className = "IdForm">
    <form onSubmit={findId}>
    <label>
      <input className="IdSearchBox" placeholder="Enter ticket Id here"value={Id} onChange={handleIdChange} />
    </label>

    <button className="searchButton" type="submit" value="Submit"> Find ticket </button>
  </form>

  </div>
                  
        
    )


}
export default Search



import React from 'react'
import './Page.css'




const Search= ({ Id, handleIdChange, findId}) => {

  return (
        
     <div>
    <form onSubmit={findId}>
    <label>
      <input placeholder="Enter ticket Id here"value={Id} onChange={handleIdChange} />
    </label>

    <button type="submit" value="Submit"> Find ticket </button>
  </form>

  </div>
                  
        
    )


}
export default Search



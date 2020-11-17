import React from 'react'
import '../style/Page.css'




const Pages = ({ pageNumber, pageTotal, handlePageNumberChange, changePage}) => {

  return (
        
     <div>
    <form onSubmit={changePage}>
    <label>
      <input value={pageNumber} onChange={handlePageNumberChange} />
    </label>
   /{Math.ceil(pageTotal/25)}
    <button type="submit" value="Submit"> Change page </button>
  </form>

  </div>
                  
        
    )


}
export default Pages



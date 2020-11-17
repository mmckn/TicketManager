import React from 'react'
import '../style/Ticket.css'




const Ticket = ({ subject, description, dateCreated, id, url }) => {
    
  let date = dateCreated.slice(0, -1)

  return (
        
      <div className="ticket">
      <details>
      
    <summary>
    <h2>{subject}</h2>
 <p className="moreDetails"> View ticket details </p>
 </summary>


<p>{description}</p>

<p className="date">{date.split('T')[0]}</p>
<p className="date">{date.split('T')[1]}</p>
</details>
      </div>
                  
        
    )
}

export default Ticket
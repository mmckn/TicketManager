import React, { useState, useEffect } from 'react'
import './style/App.css';
import ticketsService from './services/ticketsService.js'
import Ticket from './components/Ticket'
import Pages from './components/Pages'
import Search from './components/Search'

const App = () => {

  const [tickets, setTickets] = useState([])
  const [pageTotal, setPageTotal] = useState('')
  const [currentPage, setCurrent] = useState('1')
  const [errorMessage, setErrorMessage] = useState()
  const [loading, setLoadingMessage] = useState('')
  const [Id, setId] = useState('')


  // On startup get the number of tickets stored in the API - used to work out number of pages.
  useEffect(() => {
    ticketsService.getAmount()
    .then(numberOfPages => {

      let newNumberOfPages = numberOfPages.data
      setPageTotal(newNumberOfPages)
    }
    )
    .catch(err => { setErrorMessage('error getting ticket count from API') })
  }, []
  )

  // On startup get the first 25 tickets.
  useEffect(() => {
    setLoadingMessage('Getting tickets')
    ticketsService
      .getPage(0)
      .then(serverTickets => {

        setLoadingMessage('');
        console.log(serverTickets)

        setTickets(prevTickets => serverTickets.data.tickets)
      })
      // If an error is returned from the api.
      .catch(err => { setErrorMessage('error getting tickets from the the API '); setLoadingMessage('') })
  }, [])


  const handlePageNumberChange = (event) => {

    setCurrent(event.target.value)
  }

  const handleIdChange = (event) => {

    setId(event.target.value)
  }

  const changePage = (event) => {

    // Prevent form submission reloading the whole page.
    event.preventDefault()
    if (currentPage > Math.ceil(pageTotal / 25) || currentPage <= 0) {
      setErrorMessage(`Please enter a number between 1 and ${Math.ceil(pageTotal / 25)} `)
    }
    else {
      setErrorMessage('')

      // Currentpage is 1 page ahead so that the ui pages start at 1 rather than 0 so we take away 1 to request correct tickets.
      ticketsService.getPage(currentPage - 1)
        .then(serverTickets => {

          var newTickets = []
          newTickets = serverTickets.data.tickets
          console.log(newTickets)
          setErrorMessage('')
          setLoadingMessage('')

          // Rerender our tickets array with the new tickets from the server.
          setTickets(newTickets)


        })
        .catch(err => { setErrorMessage('error please enter page number within the range') })
    }
  }



  const findId = (event) => {

    // Prevent form submission reloading the whole page.
    event.preventDefault()

    // Check if the ticket is already present on the page.
    let ticketLocal = tickets.filter(ticket =>
      ticket.id === Id
    )

    if (ticketLocal.length > 0) {
      setTickets(ticketLocal)
    }

    else {

      ticketsService.getTicketById(Id)
        .then(serverTickets => {

          // The API returns an empty array if the Id is not found.
          if (serverTickets.data.results.length === 0) {
            setErrorMessage('There is no ticket matching this Id in the database')
          }
          else {
            console.log(serverTickets.data.results[0])
            var newTickets = []
            newTickets = serverTickets.data.results

            setErrorMessage('')
            setLoadingMessage('')

            // Rerender our tickets array with the ticket matching the Id.
            // When searching for Id of ticket Id '1' an array is returned with 3 items due to it being solved/replied to so had to take 1st element (the ticket)
            setTickets([newTickets[0]])
          }


        })
        .catch(err => { setErrorMessage('error there is no ticket matching this Id in the database') })

    }
  }





  return (

    <div >

      {errorMessage &&
        <div className="alert">

          <strong>{errorMessage}</strong>
        </div>}
      <Pages handlePageNumberChange={handlePageNumberChange} pageTotal={pageTotal} pageNumber={currentPage} changePage={changePage} />
      <Search handleIdChange={handleIdChange} findId={findId} />
      {loading ?
        <h1> {loading}</h1> : <div className="flex">
          {tickets.map(ticket =>
            <Ticket key={ticket.id} subject={ticket.subject} description={ticket.description} dateCreated={ticket.created_at} />

          )
          }
        </div>}


      <Pages handlePageNumberChange={handlePageNumberChange} pageTotal={pageTotal} pageNumber={currentPage} changePage={changePage} />
    </div>
  )

}
export default App;

import React, { useState , useEffect } from 'react'
import axios from 'axios'

const Form = (props) => {
  return (
    <form onSubmit={props.addContact}>
      <div>
        name: <input value={props.newName}
        onChange={props.handleName} />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumber}
        />
      </div>
      <div>
        <button type="submit"> add</button>
      </div>
    </form>
  )

}


const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])
  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const newContactName = {
      name: newName,
      number: newNumber
    }
    if (persons.find(nameC => nameC.name === newName)) {
      alert(`${newName} exists already in phonebook`)
      delete newContactName.name
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(newContactName))
      setNewName('')
      setNewNumber('')
    }

  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const toBeShown = persons.filter(m => m.name === search)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={search}
          onChange={handleSearch} />
      </div>
      <Form addContact={addContact}
      newName={newName}
      newNumber={newNumber}
      handleName={handleName}
      handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <div>
        <ul>
          {toBeShown.map(person => <li>{person.name} {person.number}</li>)}
        </ul>
      </div>
      <div>debug: {search} </div>
    </div>
  )
}


export default App;

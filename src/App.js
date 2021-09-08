import React, { useState } from 'react'


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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

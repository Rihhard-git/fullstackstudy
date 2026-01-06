import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage('Getting persons from database failed')
        setTimeout(() => {
          setNotificationMessage(null)      
        }, 3000)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if(persons.map(p => p.name).includes(newName)) {

      const person = persons.find(p => p.name === newName)

      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setNotificationType('notification')
            setNotificationMessage(`'${person.name}'s number was updated successfully`)
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(error => {
            setNotificationType('error')
            setNotificationMessage(
              `the person '${person.name}' was already deleted from server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== id))
          })
          setNewName('')
          setNewNumber('')
      }
      
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setNotificationType('notification')
          setNotificationMessage(`Added '${returnedPerson.name}`)
          setPersons(persons.concat(returnedPerson))
          setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
        })
        .catch(error => {
          setNotificationType('error')
          setNotificationMessage('something went wrong...')
          setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (person) => {

    console.log('trying to delete person with id ' +person.id)

    

    if(confirm('Do you really want to delete ' + person.name)) {
      personService
        .deletePerson(person.id)
        
      
        setNotificationType('notification')
        setNotificationMessage(`'${person.name}'s number was deleted successfully`)      
        setPersons(persons.filter(p => p.id !== person.id))
        setTimeout(() => {
            setNotificationMessage(null)      
        }, 3000)
    }   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <FilterForm filterValue={filterValue} setFilterValue={setFilterValue} />
      <h2>add a new</h2>
      <PersonForm 
      addPerson={addPerson} 
      newName={newName} 
      setNewName={setNewName} 
      newNumber={newNumber} 
      setNewNumber={setNewNumber} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} handleDelete={handleDelete}/>
      
    </div>
  )

}

export default App
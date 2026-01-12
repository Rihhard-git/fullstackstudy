require('dotenv').config()
const express = require('express')
const app = express()

const Person = require('./models/person')
const morgan = require('morgan')


app.use(express.static('dist'))
app.use(express.json())

morgan.token('data', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/info', (req, res, next) => {

  Person
    .estimatedDocumentCount()
    .then(personCount => {
      console.log(personCount)
      res.send(
        `<p>Phonebook has info for ${personCount} people</p>
        <p>${new Date().toString()}</p>
        `
      )
    })
    .catch(err => {
      next(err)
    })
})
app.get('/api/persons', (req, res) => {
  Person.find({}).then( persons=> {
    res.json(persons)
  })  
})
app.get('/api/persons/:id', (req, res, next) => {

  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(
      res.status(204).end()
    )
    .catch(err => next(err))

})
app.post('/api/persons', (req, res, next) => {
    
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(err => next(err))
})
app.put('/api/persons/:id', (req, res, next) => {


  const { name, number } = req.body

  Person.findById(req.params.id)
    .then(person => {
      if(!person) {
        return res.status(404).end()
      }

      person.name = name 
      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
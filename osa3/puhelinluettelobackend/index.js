const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token('data', (req,res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        id: '1',
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: '2',
        name: 'Ada Lovelace',
        number: '39-44-532532'
    },
    {
        id: '3',
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: '4',
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
    }
]

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
        `
    )

})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id

    persons = persons.filter(p => p.id !== id)

    res.status(204).end()

})
app.post('/api/persons', (req, res) => {
    
    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    if (persons.some(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000).toString()
    }

    persons = persons.concat(person)

    res.json(person)
})


const PORT = process.envPORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
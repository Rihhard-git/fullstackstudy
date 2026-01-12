const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Error connection to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator1: function(v) {
        return /\d{3}-/.test(v)
      },
      message1: props => `${props.value} is not a valid number!`,
      validator2: function(v) {
        return /\d{2}-/.test(v)
      },
      message2: props => `${props.value} is not a valid number!`
    },
    required: [true, 'User phone number required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)






    



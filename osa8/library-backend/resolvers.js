const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args, context) => {
  
      const books = await Book.find({}).populate('author', { name: 1, id: 1, born: 1 })
   
      if (args.author && args.genre) {
        return books.filter(b => b.author.name === args.author && b.genres.includes(args.genre))
      }
      if (args.author) {
        return books.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books
      
      
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})

      let allGenres = []
      books.forEach((b) => {       
          b.genres.forEach((g) => {
              if (!allGenres.includes(g)) {
                allGenres.push(g)
              }
          })
      })
      return allGenres

    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author', { name: 1, id: 1})
      return (books.filter(b => b.author.name === root.name).length)   
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      
      const bookExists = await Book.exists({ title: args.title })
      const authorExists = await Author.exists({ name: args.author })

      if (bookExists) {
        throw new GraphQLError(`Book title must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }
      if (args.title.length < 5) {
        throw new GraphQLError(`Book title too short: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }
      if (args.author.length < 4) {
        throw new GraphQLError(`Author name too short: ${args.author}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        })
      }
      const author = authorExists ? await Author.findOne({ name: args.author }) :  await new Author({ name: args.author }).save()
      
      const savedBook = await new Book({ 
          title: args.title, 
          published: args.published, 
          author: author.id, 
          genres: args.genres})
        .save()

      const bookToReturn = await savedBook.populate('author', { name: 1, id: 1, born: 1 })
      
      pubsub.publish('BOOK_ADDED', { bookAdded: bookToReturn})

      return bookToReturn

    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      const authorToEdit = await Author.findOne({ name: args.name})

      if (!authorToEdit) {
        return null
      }

      authorToEdit.born = args.setBornTo

      return await authorToEdit.save()
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError(`Creating the user failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username, error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'salainen' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '1h' }) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers

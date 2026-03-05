const config = require('./config')

const connectToDatabase = require('./db')
const startServer = require('./server')

const main = async () => {
  await connectToDatabase(config.MONGODB_URI)
  startServer(config.PORT)
}

main()

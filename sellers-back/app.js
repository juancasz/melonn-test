require('dotenv').config()
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')    
const app = express()
const promisesRouter = require('./controllers/promises')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/promise',promisesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
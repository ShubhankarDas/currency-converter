const express = require('express')
const dotenv = require('dotenv')

const logger = require('./logger')

// Controllers
const currencyController = require('./controllers/currencyController')
const requestValidator = require('./middlewares/requestValidator')

// load environment variables
dotenv.load({
  path: '.env'
});

// set port
const port = process.env.PORT || 3000

// Init APP
const app = express()

app.get('/api/currency/convert', requestValidator.validate, currencyController.convert)

// start listening to the port
app.listen(port, () => {
  logger.debug(`listening on port - ${port}...`)
})

module.exports = app
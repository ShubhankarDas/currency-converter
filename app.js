const express = require('express')
const logger = require('./logger')

// ---- We could use Babel and convert these files to es6 ---

// Controllers
const currencyController = require('./controllers/currencyController')
const requestValidator = require('./middleware/requestValidator')

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
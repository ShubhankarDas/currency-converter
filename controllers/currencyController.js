const networkManager = require('../network/networkManager')
const constants = require('../constants/constants')
const logger = require('../logger')

exports.convert = async (req, res) => {
  try{
    // Get query string values
    const { to, from, value } = req.query

    const rateResponse = await networkManager.get(constants.exchange_base_url, {
      [constants.params.base]: from,
      [constants.params.symbols]: to
    })

    // Check rate has errors
    if (rateResponse.error) {
      return res.status(502).send(rateResponse.error)
    }

    const rate = rateResponse.rates[to]

    // Convert the value using the rate
    const convertedValue = (rate * value).toFixed(2)

    // add to transaction log
    logger.info({
      currencyForm: from,
      currencyTo: to,
      value,
      convertedValue
    })

    // send the converted value
    res.send(`${convertedValue} ${to}`)

  }
  catch(e){
    logger.debug(e.message)
    res.status(500).send('Something went wrong.')
  }
}

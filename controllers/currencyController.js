const logger = require('../logger')
const europeanCurrencyController = require('../lib/europeanCurrency')

exports.convert = async (req, res) => {
  try{
    // Get query string values
    const { to, from, value } = req.query

    // Get current rate
    const rateResponse = await europeanCurrencyController.getRate(to, from)

    // Check rate has errors
    if (rateResponse.error) {
      return res.status(502).send(rateResponse.error)
    }

    // Convert the value using the rate
    const convertedValue = (rateResponse * value).toFixed(2)

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

    // here we can use a third party error monitor such as sentry

    logger.error(e.message)
    res.status(500).send('Something went wrong.')
  }
}

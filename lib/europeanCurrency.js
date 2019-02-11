const request = require('request-promise')
const { URL } = require('url')
const { exchange_base_url, params } = require('../constants/constants')
const logger = require('../logger')

exports.getRate = async (currencyTo, currencyFrom) => {
  try {

    // We could properly implement search query params.
    const requestUrl = new URL(`${exchange_base_url}?${params.base}=${currencyFrom}&${params.symbols}=${currencyTo}`)

    return await request(requestUrl.toString()).then(res => JSON.parse(res).rates[currencyTo])

  } catch (e) {
    logger.error(e.message)
    return {
      error: 'Internal server error.'
    }
  }
}
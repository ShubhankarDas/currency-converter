module.exports = {
  exchange_base_url: 'https://api.exchangeratesapi.io/latest',
  params: {
    base: 'base',
    symbols: 'symbols'
  },

  // We can update this list periodically in future.
  supported_currencies: [
      "EUR","NZD","CAD",
      "MXN","AUD","CNY",
      "PHP","GBP","CZK",
      "USD","SEK","NOK",
      "TRY","IDR","ZAR",
      "MYR","HKD","HUF",
      "ISK","HRK","JPY",
      "BGN","SGD","RUB",
      "RON","CHF","DKK",
      "INR","KRW","THB",
      "BRL","PLN","ILS"
  ],

  //test urls
  test_success_url: '/api/currency/convert?to=EUR&from=USD&value=3.734566',
  test_no_query_url: '/api/currency/convert',
  test_invalid_query_url: '/api/currency/convert?to=EU&from=US&value=asd'
}
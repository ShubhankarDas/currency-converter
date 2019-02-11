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

  test_success_url: '/api/currency/convert?to=EUR&from=USD&value=30',

  // Test cases
  tests: [
    {
      description: `should return bad request if query 'to' not provided.`,
      url: "/api/currency/convert?from=US&value=asd",
      expected_status_code: 400,
      expected_error_text: `Query named 'to' is required.`
    },
    {
      description: `should return bad request if query 'to' has lowercase code`,
      url: "/api/currency/convert?to=ss&from=US&value=20",
      expected_status_code: 400,
      expected_error_text: `Invalid currency code at query named 'to'. Code must be an uppercase String. Code must be 3 characters long.`
    },
    {
      description: `should return bad request if query 'to' has numbers`,
      url: "/api/currency/convert?to=ss&from=US&value=20",
      expected_status_code: 400,
      expected_error_text: `Invalid currency code at query named 'to'. Code must be an uppercase String. Code must be 3 characters long.`
    },
    {
      description: `should return bad request if query 'to' length is not 3`,
      url: "/api/currency/convert?to=ss&from=US&value=20",
      expected_status_code: 400,
      expected_error_text: `Invalid currency code at query named 'to'. Code must be an uppercase String. Code must be 3 characters long.`
    },

    {
      description: `should return bad request if query 'from' not provided.`,
      url: "/api/currency/convert?to=USD&value=20",
      expected_status_code: 400,
      expected_error_text: `Query named 'from' is required.`
    }, {
      description: `should return bad request if query 'from' has lowercase code`,
      url: "/api/currency/convert?to=USD&from=eur&value=20",
      expected_status_code: 400,
      expected_error_text: `Invalid currency code at query named 'from'. Code must be an uppercase String. Code must be 3 characters long.`
    }, {
      description: `should return bad request if query 'from' has numbers`,
      url: "/api/currency/convert?to=USD&from=34&value=20",
      expected_status_code: 400,
      expected_error_text: `Invalid currency code at query named 'from'. Code must be an uppercase String. Code must be 3 characters long.`
    }, {
      description: `should return bad request if query 'from' length is not 3`,
      url: "/api/currency/convert?to=USD&from=euro&value=20",
      expected_status_code: 400,
      expected_error_text: `Invalid currency code at query named 'from'. Code must be an uppercase String. Code must be 3 characters long.`
    },

    {
      description: `should return bad request if query 'from' and 'to' are same`,
      url: "/api/currency/convert?to=USD&from=USD&value=20",
      expected_status_code: 400,
      expected_error_text: `Queries 'to' and 'from' cannot be the same.`
    },

    {
      description: `should return bad request if query 'value' is not provided`,
      url: "/api/currency/convert?to=USD&from=EUR",
      expected_status_code: 400,
      expected_error_text: `Query named 'value' is required.`
    },
    {
      description: `should return bad request if query 'value' has alphabets`,
      url: "/api/currency/convert?to=USD&from=EUR&value=zero",
      expected_status_code: 400,
      expected_error_text: `Query named 'value' must be a number.`
    },
    {
      description: `should return bad request if query 'value' is in negative`,
      url: "/api/currency/convert?to=USD&from=EUR&value=-232",
      expected_status_code: 400,
      expected_error_text: `Query named 'value' must be more than 0.`
    }
  ]
}
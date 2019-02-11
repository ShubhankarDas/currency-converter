const Joi = require('joi')
const constants = require('../constants/constants')

// Request model validator for currency exchange
// For throwing custom specific error messages
module.exports = {
  to: Joi.string().length(3)
    .valid(constants.supported_currencies)
    .required()
    .options({
      language: {
        any: {
          required: `!!Query named 'to' is required.`,
          allowOnly: `!!Invalid currency code at query named 'to'. Code must be an uppercase String. Code must be 3 characters long.`
        },
        string: {
          base: `!!Query named 'to' must be a String.`,
          length: `!!Invalid currency code at query named 'to', must be 3 characters long.`
        }
      }
    }),
  from: Joi.string().length(3)
    .valid(constants.supported_currencies)
    .required()
    .options({
      language: {
        any: {
          required: `!!Query named 'from' is required.`,
          allowOnly: `!!Invalid currency code at query named 'from'. Code must be an uppercase String. Code must be 3 characters long.`
        },
        string: {
          base: `!!Query named 'from' must be a String.`,
          length: `!!Invalid currency code at query named 'from', must be 3 characters long.`
        }
      }
    }),
  value: Joi.number().min(0).required()
    .options({
      language: {
        any: {
          required: `!!Query named 'value' is required.`
        },
        number: {
          base: `!!Query named 'value' must be a number.`,
          min: `!!Query named 'value' must be more than 0.`
        }
      }
    })
}
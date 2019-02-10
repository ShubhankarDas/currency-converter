const Joi = require('joi')
const constants = require('../constants/constants')

// validate the request
exports.validate = (req,res,next) => {
  const schema = {
    to: Joi.string().length(3)
    .uppercase()
    .valid(constants.supported_currencies)
    .required()
    .options({
      language: {
        any: {
          required: `!!Query named 'to' is required.`,
          allowOnly: `!!Invalid currency code at query named 'to'.`
        },
        string: {
          base: `!!Query named 'to' must be a number.`,
          length: `!!Invalid currency code at query named 'to', must be 3 characters long.`,
          uppercase: '!!Currency codes must be in uppercase.'
        }
      }
    }),
    from: Joi.string().length(3)
      .uppercase()
      .valid(constants.supported_currencies)
      .required()
      .options({
        language: {
          any: {
            required: `!!Query named 'from' is required.`,
            allowOnly: `!!Invalid currency code at query named 'from'.`
          },
          string: {
            base: `!!Query named 'from' must be a number.`,
            length: `!!Invalid currency code at query named 'from', must be 3 characters long.`,
            uppercase: '!!Currency codes must be in uppercase.'
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

  result = Joi.validate(req.query, schema, {
    language: {
      object: {
        child: '!!{{reason}}'
      },
      messages: {
        wrapArrays: false
      }
    }
  })
  if(result.error){
    res.status(400).send(result.error.details[0].message)
  }else {
    next()
  }
}
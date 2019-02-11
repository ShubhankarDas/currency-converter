const Joi = require('joi')
const schema = require('../schemas/validateConversionRequest')

// validate the request
exports.validate = (req,res,next) => {

  const result = Joi.validate(req.query, schema, {
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
    const errorMessage = result.error.details[0].message
    return res.status(400).send(errorMessage)
  }
  if (req.query.to === req.query.from) {
    return res.status(400).send(`Queries 'to' and 'from' cannot be the same.`)
  }
  next()
}
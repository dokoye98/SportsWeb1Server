const joi = require('joi')


const signUpValidaiton = (data)=>{

    const schemaValidation = joi.object({

        firstname: joi.string()
        .min(1)
        .max(256)
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.empty': 'First name is required',
            'string.min': 'First name must be at least 1 character long',
            'string.max': 'First name must be less than 256 characters',
            'any.required': 'First name is required'
        }),
    lastname: joi.string()
        .min(1)
        .max(256)
        .required()
        .messages({
            'string.base': 'Last name must be a string',
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be at least 1 character long',
            'string.max': 'Last name must be less than 256 characters',
            'any.required': 'Last name is required'
        }),
    username: joi.string()
        .min(4)
        .max(256)
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 4 characters long',
            'string.max': 'Username must be less than 256 characters',
            'any.required': 'Username is required'
        }),
    email: joi.string()
        .min(6)
        .max(256)
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    password: joi.string()
        .min(6)
        .max(1056)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        })
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
  const schemaValidation = joi.object({
      username: joi.string()
          .min(4)  
          .max(256)
          .required()
          .messages({
              'string.base': 'Username must be a string',
              'string.empty': 'Username is required',
              'string.min': 'Username must be at least 4 characters long',
              'any.required': 'Username is required'
          }),
      password: joi.string()
          .min(6)
          .max(1056)
          .required()
          .messages({
              'string.empty': 'Password is required',
              'string.min': 'Password must be at least 6 characters long',
              'any.required': 'Password is required'
          })
  })
  return schemaValidation.validate(data)
}

const productValidation = (data) => {
  const schema = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(10).required(),
      price: joi.number().positive().required(),
      stock: joi.number().integer().min(0).required(),
      images: joi.array().items(Joi.string().uri()),
      colours: joi.array().items(Joi.string()),
      sizes: joi.array().items(Joi.string())
  })
  return schema.validate(data)
}

module.exports.signUpValidaiton = signUpValidaiton
module.exports.loginValidation = loginValidation
module.exports.productValidation = productValidation

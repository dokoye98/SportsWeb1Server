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
    const schemaValidation = joi.object({
      name: joi.string()
        .min(1)
        .max(256)
        .required()
        .messages({
          'string.base': 'Product name must be a string',
          'string.empty': 'Product name is required',
          'any.required': 'Product name is required'
        }),
      Stock: joi.number()
        .min(1)
        .required()
        .messages({
          'number.base': 'Stock must be a number',
          'number.min': 'Stock must be at least 1',
          'any.required': 'Stock is required'
        }),
      Description: joi.string()
        .min(5)
        .max(1000)
        .required()
        .messages({
          'string.base': 'Description must be a string',
          'string.empty': 'Description is required',
          'string.min': 'Description must be at least 5 characters long',
          'any.required': 'Description is required'
        }),
      Price: joi.number()
        .min(0.01)
        .required()
        .messages({
          'number.base': 'Price must be a number',
          'number.min': 'Price must be at least 0.01',
          'any.required': 'Price is required'
        }),
      Colours: joi.array().items(joi.string())
        .min(1)
        .required()
        .messages({
          'array.base': 'Colours must be an array of strings',
          'array.min': 'At least one colour is required',
          'any.required': 'Colours are required'
        })
    })
    return schemaValidation.validate(data)
  }

module.exports.signUpValidaiton = signUpValidaiton
module.exports.loginValidation = loginValidation
module.exports.productValidation = productValidation


//VALIDATION
//const Joi = require('@hapi/joi');
import Joi from '@hapi/joi'

//New User validation

export const registerValidation = (data)=>{
    const schema = Joi.object({
        name : Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

export const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data);
}

// module.exports.registerValidation = registerValidation
// module.exports.loginValidation = loginValidation
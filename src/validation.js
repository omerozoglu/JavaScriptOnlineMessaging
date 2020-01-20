//VALIDATION
const Joi = require('@hapi/joi');


//Reqister Validation

const registerValidation =(data)=>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        name: Joi.string().min(6),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        user_level: Joi.number().min(2)
      });
      return schema.validate(data);
}
//Login Validation

const loginValidation =(data)=>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
      });
      return schema.validate(data);
}


module.exports.registerValidation= registerValidation;
module.exports.loginValidation = loginValidation;
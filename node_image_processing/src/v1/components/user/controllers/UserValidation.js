import Joi from "joi";
import mongoose from "mongoose";
import User from "components/user/models/User";

class UserValidation {


    userValidate = async(req, res, next) =>{
        try{
            let userSchema = Joi.object().keys({
                "name" : Joi.string().required(),
                "email": Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                "password": Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
            });

            const {error} = userSchema.validate(req.body)
            if (error){
                return res.status(400).send({"msg": error.details[0].message});  
            }

            let email = req.body.email
            let user = await User.findOne({email:email})
            console.log("user", user)
            if(user){
                return res.status(400).send({"msg":"Email Already Existed"});
            }
            next()
        }
        catch(err){
            return res.status(400).send({"msg": `Bad request ${err}`})
        }
    }

    userLoginValidate = async(req, res, next) =>{

        try{
            let loginSchema = Joi.object().keys({
                "email": Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                "password": Joi.string().required()
            });
            const {error} = loginSchema.validate(req.body)
            if (error){
                return res.status(400).send({"msg": error.details[0].message});  
            }
            next()

        }
        catch(err){
            return res.status(400).send({"msg": `Bad Request ${err}`})
        }
    }

    userUpdateValidate = async(req, res, next) =>{

        try{
            let userUpdateSchema = Joi.object().keys({
                "name": Joi.string().required()
            });
            const {error} = userUpdateSchema.validate(req.body)
            if (error){
                return res.status(400).send({"msg": error.details[0].message});  
            }
            next()

        }
        catch(err){
            return res.status(400).send({"msg": `Bad Request ${err}`})
        }
    }
}

export default new UserValidation();
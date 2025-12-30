import nconf from "nconf";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";

import User from "components/user/models/User";

nconf.argv()
   .env()
   .file({ file: path.resolve("config.json")});


class UserController{

    register = async(req, res) =>{
        try{
            const newUser = new User({
                email:req.body.email,
                name:req.body.name,
                password:req.body.password,
            });

            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(newUser.password, salt);
            newUser.password = hash;
            let user = await newUser.save()
            res.send({"msg":"User created successfully.", "data":user});

        }
        catch(err){
            res.status(400).send({"msg": `Bad Request`});
        }
    }

    login = async(req, res) => {
        try{
            let body = req.body

            let user = await User.findOne({email: body.email})

            if(!user){
                return res.status(400).send({"msg": "user not found"})
            }

            const payload = { 
                id:user.id,
                name:user.name
            }
            let token = jwt.sign(payload,nconf.get('SECRET_KEY'),
                        {expiresIn:nconf.get('expiresin')});

            res.status(200).send({"msg": "user token created successfully", "data":{"token": "Bearer "+token}})

        }
        catch(err){
            res.status(400).send({"msg": `Bad Request`});
        }
    }

    details = async(req, res) =>{

        try{
            const user = await User.findById(req.params.id, { password: 0})
            if(!user){
                return res.status(404).send({"msg": "user not found"})
            }
            res.status(200).send({"msg": "user fetched successfully", "data":user})
        }
        catch(err){
            res.status(400).send({"msg": `Bad Request`});
        }
    }

    userUpdate = async(req, res) =>{

        try{
            let user = await User.findById(req.params.id)
            if(!user){
                return res.status(404).send({"msg": "user not found"})
            }
            await user.updateOne({name:req.body.name})
            user = await User.findById(req.params.id, {password: 0})
            res.status(200).send({"msg": "user updated successfully", "data":user})
        }
        catch(err){
            res.status(400).send({"msg": `Bad Request`});
        }

    }

    userDelete = async(req, res) =>{
        try{
            const user = await User.findById(req.params.id)
            if(!user){
                return res.status(404).send({"msg": "user not found"})
            }
            await user.remove()
            res.status(200).send({"msg": "user deleted successfully"})
        }
        catch(err){
            res.status(400).send({"msg": `Bad Request`});
        }
    }

    userLists = async(req, res) =>{
        try{
            const users = await User.find()
            res.status(200).send({"msg": "users fetched successfully", "data":users})
        }
        catch(err){
            res.status(400).send({"msg": `Bad Request`});
        }
    }
}

export default new UserController();
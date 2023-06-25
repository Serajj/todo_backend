import { validationResult } from "express-validator";
import { jsonResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { JWT_SECRET_KEY } from "../utils/constants.js";
import jwt from 'jsonwebtoken';


const userLogin = async (req,res)=> {

    //checking validator errors
    const errors =  validationResult(req);
    if(errors.isEmpty()){
      const {login,password} = req.body;
      //encrypting password
       
      const isExist = await User.findOne({$or : [{email:login},{username:login},{mobile:login}]});

      if(!isExist){
        return res.json(jsonResponse(false,"Invalid credentials",[]));
      }
       
      //save detail to database
      try {
        const verified =  bcrypt.compareSync(password , isExist.password);

        if(!verified){
            return res.json(jsonResponse(false,"Wrong password!",[]));
        }
        

        const token = jwt.sign({userId : isExist._id},JWT_SECRET_KEY);
        const data = {...isExist._doc,token};
       return res.json(jsonResponse(true,"Registered Successfully!!",data));
      } catch (error) {
        console.log(error);
       return res.json(jsonResponse(false,"Failed to register!",error));
      }
    }
    //used mapped to remove array layer
    return res.json(jsonResponse(false,"validation error",errors.mapped()));
};


export default userLogin;
import { validationResult } from "express-validator";
import { jsonResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { JWT_SECRET_KEY } from "../utils/constants.js";
import jwt from 'jsonwebtoken';


const Register = async (req,res)=> {

    //checking validator errors
    const errors =  validationResult(req);
    if(errors.isEmpty()){
      const {fullname , email,password , username , mobile} = req.body;
      //encrypting password
      const salt = await bcrypt.genSalt();
      const hashedpassword  =  await bcrypt.hash(password,salt);
       
      const isExist = await User.findOne({$or : [{email:email},{username:username},{mobile:mobile}]});

      if(isExist){
        return res.json(jsonResponse(false,"User already exist please login! , Please check either username , email or mobile",[]));
      }
       
      //save detail to database
      try {
        const result = await User.create({fullname,email,password : hashedpassword,username,mobile});
        //creating auth api token

        const token = jwt.sign({userId : result._id},JWT_SECRET_KEY);
        const data = {...result._doc,token};
       return res.json(jsonResponse(true,"Registered Successfully!!",data));
      } catch (error) {
        console.log(error);
       return res.json(jsonResponse(false,"Failed to register!",error));
      }
    }
    //used mapped to remove array layer
    return res.json(jsonResponse(false,"validation error",errors.mapped(),201));
};

const Login = async (req,res)=> {

    //checking validator errors
    const errors =  validationResult(req);
    if(errors.isEmpty()){

    }
}

export default Register;
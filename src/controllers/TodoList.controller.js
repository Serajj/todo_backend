import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { jsonResponse } from "../utils/response.js";

export const fetchTodo = async (req,res)=>{
       try {
        const userId = req.userId;
          const result = await User.findById(userId)
                .select("-password")
                .populate('todos')
                .exec();
          if(result.length <= 0){
            return res.json(jsonResponse(true,"No data",result));
          }
          return res.json(jsonResponse(true,"Fetched successfully!!",result));
       } catch (error) {
        return res.json(jsonResponse(false,"Error",error));
    
       }
}
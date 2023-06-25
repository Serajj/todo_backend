import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { jsonResponse } from "../utils/response.js";

export const createTodo = async (req,res)=>{

    const errors =  validationResult(req);
    if(errors.isEmpty()){
        const {description , priority} = req.body;
        var dueDate = req.body.dueDate;
       const userId = req.userId;
       try {
        if(dueDate === undefined || dueDate === null){
            dueDate = new Date();
        }
          const result = await Todo.create({description ,priority , dueDate , userId});
          if(result){
            const user = await User.findByIdAndUpdate({_id:userId},{$push:{todos:result}});
            
          }
          return res.json(jsonResponse(true,"Task added successfully!!",result));
       } catch (error) {
        console.log(error);
        return res.json(jsonResponse(false,"Error",error));
    
       }
    } 
    return res.json(jsonResponse(false,"validation error",errors.mapped()));
}

//mark complete/incomplete a todo
export const markTodo = async (req,res)=>{

    const errors =  validationResult(req);
    if(errors.isEmpty()){
    try {
        const userId = req.userId;
          const result = await Todo.findOneAndUpdate({_id:req.body.todo_id,
        userId: userId},[ { $set : {
            isCompleted : {
                $eq : [false,"$isCompleted"]
            }
        }}]);
          if(result){
            return res.json(jsonResponse(true,"Updated successfully!!",result));
          }
          return res.json(jsonResponse(true,"Not updated , Please check todo ID",[]));
       } catch (error) {
        return res.json(jsonResponse(false,"Error",error));
    
       }
    }
    return res.json(jsonResponse(false,"validation error",errors.mapped()));
}

//delete a todo
export const deleteTodo = async (req,res)=>{

    const errors =  validationResult(req);
    if(errors.isEmpty()){
    try {
        const userId = req.userId;
          const result = await Todo.findByIdAndDelete({_id:req.body.todo_id,
        userId: userId});
          if(result){
            return res.json(jsonResponse(true,"Deleted successfully!!",result));
          }
          return res.json(jsonResponse(true,"Does not exist , Please check ID ",[]));
       } catch (error) {
        return res.json(jsonResponse(false,"Error occured",error));
    
       }
    }
    return res.json(jsonResponse(false,"validation error",errors.mapped()));
}
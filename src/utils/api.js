import  express  from "express";
import Register from "../controllers/Register.controller.js";
import userLogin from "../controllers/Login.controller.js";

import { RegisterRule } from "../validationRules/RegisterRule.js";
import { LoginRule } from "../validationRules/LoginRule.js";
import { createTodo, deleteTodo, markTodo } from "../controllers/Todo.controller.js";
import { TodoRule } from "../validationRules/TodoRule.js";
import { fetchTodo } from "../controllers/TodoList.controller.js";
import { check } from "express-validator";

const apiRoutes = express.Router();
export const apiAuthRoutes = express.Router();


apiRoutes.get('/',(req,res)=>{
    res.send("Welcome to api server!!");
});
apiRoutes.post('/register',RegisterRule,Register); 
apiRoutes.post('/login',LoginRule,userLogin);

//protected api routes
apiAuthRoutes.post('/create_todo',TodoRule,createTodo);
apiAuthRoutes.get('/get_todo',fetchTodo);
apiAuthRoutes.post('/mark_todo',[check("todo_id","Todo id is required").exists().trim().isLength({min:0,max:32})],markTodo);

apiAuthRoutes.post('/delete_todo',[check("todo_id","Todo id is required").exists().trim().isLength({min:0,max:32})],deleteTodo);



export default apiRoutes;
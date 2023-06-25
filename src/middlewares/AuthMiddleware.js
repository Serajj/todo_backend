import { jsonResponse } from "../utils/response.js"
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../utils/constants.js";

const AuthMiddleware = (req,res,next)=>{
    if(req.headers['auth'] === undefined){
        return res.json(jsonResponse(false,"Please provide auth token.",[]));
    }

    const token = req.headers['auth'];
    try {
       const decoded = jwt.verify(token,JWT_SECRET_KEY);
    req.userId = decoded.userId;
    return next();
    } catch (error) {
        return res.json(jsonResponse(false,"Please provide auth token.",[]));
    }
}

export default AuthMiddleware;
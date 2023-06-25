import {check} from "express-validator"
export const TodoRule = [
    check("description").trim().notEmpty().withMessage('Please enter description'),
    check("priority").trim().notEmpty().withMessage('Please set priority'),    
];
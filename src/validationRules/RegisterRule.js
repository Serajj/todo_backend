import {check} from "express-validator"
export const RegisterRule = [
    check("fullname").trim().notEmpty().withMessage('Name is required')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
    check("username","username is required , it should be alphanumeric").exists().isAlphanumeric().withMessage("Username should be contain alphabets and numbers.").trim().isLength({min:6,max:32}),
    check("password","Password is required").exists().trim().isLength({min:6,max:32}),
    check("email","Email is required").exists().isEmail(),
    check("mobile","Mobile is required").exists().trim().isLength({min:10,max:10}),
];
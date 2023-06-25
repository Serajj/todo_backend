import {check} from "express-validator"
export const LoginRule = [
    check("login").trim().notEmpty().withMessage('Login ID eg: email, username or mobile'),
    check("password","Password is required").exists().trim().isLength({min:6,max:32}),
];
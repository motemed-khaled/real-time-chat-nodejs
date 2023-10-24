import { Request , Response , NextFunction } from "express";

import { Api_Error } from "../utils/api_error";


export const globalError = (err: Api_Error, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";

    if (process.env.NODE_ENV==="development") {
        sendErrorForDevelopment(err , res)
    } else {
        sendErrorForProduction(err, res);
    }

}

const sendErrorForDevelopment = (err: Api_Error, res: Response) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorForProduction = (err: Api_Error, res: Response) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};
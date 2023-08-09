import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../3-models/error-models";

// Allow service only for our system:
function doorman(request: Request, response: Response, next: NextFunction): void {

    const doormanKey = "I-Love-Kittens!";

    // If request don't have a doorman key value:
    if (request.header("doormanKey") !== doormanKey) {
        next(new UnauthorizedError("You are not authorized!"));
        return;
    }

    // Request containing the doorman key:
    next();
}

export default doorman;
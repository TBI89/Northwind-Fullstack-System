import { Request, Response, NextFunction } from "express";
import striptags from "striptags";

// Remove tags from user input:
function sanitize(request: Request, response: Response, next: NextFunction) {

    for (const prop in request.body) { // Run on the request.body obj.
        if (typeof request.body[prop] === "string") { // Check if it's a string (not a number / boolean).
            request.body[prop] = striptags(request.body[prop]); // Take the data and use the library to write again without tags. 
        }
    }
    next();
}

export default sanitize;
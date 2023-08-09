import { Request, Response, NextFunction } from "express";
import StatusCode from "../3-models/status-code";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

// Catch-All middleware:
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    // On any backend error, this middleware should be executed:

    // Take status:
    const status = err.status || StatusCode.InternalServerError;

    // Define internal server errors:
    const crash = status >= 500 && status <= 599;

    // Log error on console:
    console.log("Error:", err);

    // Log errors:
    logger.logError(err.message, err);

    // On production display some msg to the client, else (development) show the "real" error to the developer:
    const message = crash && appConfig.isProduction ? "Some error, please try again." : err.message;

    // Response back the error:
    response.status(status).send(message);
}

export default catchAll;
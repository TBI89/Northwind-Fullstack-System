require("dotenv").config(); // Load .env file to process.env
import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import sanitize from "./4-middleware/sanitize";
import verbose from "./4-middleware/verbose";
import authController from "./6-controllers/auth-controller";
import productsController from "./6-controllers/products-controller";
import cors from "cors";

// Create the server:
const server = express();

// Enable cors for any frontend:
server.use(cors());

// Enable cors for a specific frontend:
// server.use(cors({origin: appConfig.domainName}));

// Support request.body as JSON:
server.use(express.json());

// Sanitize all user inputs from tags:
server.use(sanitize);

// Support file upload:
server.use(expressFileUpload());

// Connect app-lever middleware:
server.use(verbose);
// server.use(doorman);

// Route requests to our controllers:
server.use("/api", productsController);
server.use("/api", authController);

// Route not found:
server.use("*", routeNotFound);

// Catch all middleware:
server.use(catchAll);

// Upload server:
server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
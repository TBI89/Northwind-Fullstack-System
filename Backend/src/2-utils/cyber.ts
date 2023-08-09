import { ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

// Token secret key:
const tokenSecretKey = "The-Amazing-Full-Stack-Students";

function getNewToken(user: UserModel): string {

    // Remove password from token:
    delete user.password;

    // Container for user object inside the token:
    const container = { user };

    // Expiration:
    const options = { expiresIn: "3h" };

    // Create token:
    const token = Jwt.sign(container, tokenSecretKey, options);

    // Return token:
    return token;
}

// Verify legal token:
function verifyToken(token: string): void {

    if (!token) throw new UnauthorizedError("Missing JWT token");

    try {
        Jwt.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message);
    }

}

// Verify admin:
function verifyAdmin(token: string): void {

    // Verify validity:
    verifyToken(token);

    // Get container:
    const container = Jwt.verify(token, tokenSecretKey);

    // Extract user:
    const user: UserModel = (container as any).user;

    // Check role:
    if (user.roleId !== RoleModel.Admin) throw new ForbiddenError("You are not an admin");

}

// Salt:
const hashSalt = "Full-Stack-Course-2023";

// Hash user password:
function hashPassword(plainText: string): string {

    // Check if the user sent a password:
    if (!plainText) return null;

    // Convert original user input into hashed & salted password:
    const hashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex");
    return hashedPassword;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hashPassword
};
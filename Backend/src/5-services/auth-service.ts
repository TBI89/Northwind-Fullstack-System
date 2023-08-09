import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/error-models";
import CredentialsModel from "../3-models/credentials-model";
import RoleModel from "../3-models/role-model";

//  Register a new user:
async function register(user: UserModel): Promise<string> {

    // Validation:
    user.validate();

    // Set "User" as role:
    user.roleId = RoleModel.User;

    // Is username taken:
    if (await isUserNameTaken(user.username)) throw new ValidationError(`Username ${user.username} already taken.`);

    // Implement hash function for the user password:
    user.password = cyber.hashPassword(user.password);

    // SQL:
    const sql = `INSERT INTO users(firstName, lastName, username, password, roleId)
     VALUES('${user.firstName}','${user.lastName}','${user.username}','${user.password}',${user.roleId})`;

    // Execute:
    const info: OkPacket = await dal.execute(sql);

    // Create new id:
    user.id = info.insertId;

    // Get new token:
    const token = cyber.getNewToken(user);

    // Return token:
    return token;
}

async function isUserNameTaken(username: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;
    const result = await dal.execute(sql);
    const count = result[0].count;
    return count > 0;
}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validation:
    credentials.validate();

    // Hash user input to let him login with the original password:
    credentials.password = cyber.hashPassword(credentials.password);

    // SQL:
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    // Execute:
    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    // Extract:
    const user = users[0];

    // If no such user:
    if (!user) throw new UnauthorizedError("Incorrect username or password.");

    // Generate JWT:
    const token = cyber.getNewToken(user);

    // Return token:
    return token;
}

export default {
    register,
    login
};
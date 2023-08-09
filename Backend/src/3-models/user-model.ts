import { ValidationError } from "./error-models";
import RoleModel from "./role-model";
import Joi from "joi";

class UserModel {

    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {// Copy-Constructor 
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // Validation schema:
    private static validationSchema = Joi.object({

        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(30),
        username: Joi.string().required().min(4).max(40),
        password: Joi.string().required().min(6).max(20),
        roleId: Joi.number().optional().min(1).max(2).integer()
    });

    // Validate:
    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default UserModel;
import Joi from "joi";
import { ValidationError } from "./error-models";

class CredentialsModel {

    // Model:
    public username: string;
    public password: string;

    // Copy-Constructor:
    public constructor(user: CredentialsModel) { 
        this.username = user.username;
        this.password = user.password;
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        username: Joi.string().required().min(4).max(40),
        password: Joi.string().required().min(6).max(20)
    });

    // Validate:
    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;
import EmployeeModel from "../Models/EmployeeModal";
import axios from "axios";
import appConfig from "../Utils/AppConfig";

class EmployeesService {

    // Get all employees from the backend:
    public async getAllEmployees(): Promise<EmployeeModel[]> {

        // Get all employees into response object:
        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);

        // Extract the employees from the response:
        const employees = response.data;

        // Return employees:
        return employees;
    }

}

const employeesService = new EmployeesService(); // Singleton
export default employeesService;
import { useEffect, useState } from "react";
import EmployeeModel from "../../Models/EmployeeModal";
import employeesService from "../../Services/EmployeesService";
import "./EmployeesList.css";
import appConfig from "../../Utils/AppConfig";
import useTitle from "../../Utils/UseTitle";
import notifyService from "../../Services/NotifySevice";


function EmployeesList(): JSX.Element {

    useTitle("Employees");

    const [frontendEmployees, setFrontendEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        employeesService.getAllEmployees()
            .then(backendEmployees => setFrontendEmployees(backendEmployees))
            .catch(err => notifyService.error(err));
    }, []);

    return (
        <div className="EmployeesList">

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Title</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Birth Date</th>
                        <th>Image</th>
                    </tr>
                </thead>
                
                <tbody>

                    {frontendEmployees.map(e =>

                        <tr key={e.id}>
                            <td>{e.firstName}</td>
                            <td>{e.latsName}</td>
                            <td>{e.title}</td>
                            <td>{e.country}</td>
                            <td>{e.city}</td>
                            <td>{e.birthDate}</td>
                            <td>
                                <img src={`${appConfig.employeesImgUrl}${e.imageName}`} />
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>



        </div>
    );
}

export default EmployeesList;

import { NavLink, useNavigate, useParams } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";
import "./CategoryDetails.css";
import { useEffect, useState } from "react";
import notifyService from "../../../Services/NotifySevice";
import appConfig from "../../../Utils/AppConfig";

function CategoryDetails(): JSX.Element {

    const [category, setCategory] = useState<CategoryModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.catId;

    useEffect(() => {
        categoryService.getOneCategory(id)
            .then(category => setCategory(category))
            .catch(err => {
                notifyService.error(err)
                if (err.response?.status === 401) {
                    navigate("/home");
                }
            });
    }, []);

    return (
        <div className="CategoryDetails">

            <h2>Category Details</h2>

            <h3>Category Name: {category?.name}</h3>
            <h3>Category Description: {category?.description}</h3>
            <img src={`${appConfig.categoryUrl}image/${category?.imageName}`}/>

            <br/>
            <br/>

            <NavLink to="/categories">Back</NavLink>

        </div>
    );
}

export default CategoryDetails;

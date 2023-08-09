import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";

class CategoryService {

    //  Get all categories:
    public async getAllCategories(): Promise<CategoryModel[]> {

        //  Get response from the backend:
        const response = await axios.get<CategoryModel[]>(appConfig.categoryUrl);

        // Extract:
        const categories = response.data;

        //  Return:
        return categories;
    }

    // Get one category:
    public async getOneCategory(id: number): Promise<CategoryModel> {

        // Get response from the backend:
        const response = await axios.get<CategoryModel>(appConfig.categoryUrl + id)

        // Extract:
        const category = response.data;

        // Return:
        return category;
    }
}

const categoryService = new CategoryService();

export default categoryService;
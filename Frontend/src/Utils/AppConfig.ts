
class AppConfig {
    public readonly productsUrl = "http://localhost:4000/api/products/"; //Ending /
    public readonly employeesUrl = "http://localhost:4000/api/employees/";
    public readonly employeesImgUrl = "http://localhost:4000/api/employees/images/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly categoryUrl = "http://localhost:4000/api/categories/";
}

// Singleton (single object for all the app):
const appConfig = new AppConfig();

export default appConfig;

import { Navigate, Route, Routes } from 'react-router-dom';
import About from '../../AboutArea/About/About';
import Home from '../../HomeArea/Home/Home';
import ProductList from '../../ProductsArea/ProductList/ProductList';
import Page404 from '../Page404/Page404';
import EmployeesList from '../../EmployeesList/EmployeesList';
import ProductDetails from '../../ProductsArea/ProductDetails/ProductDetails';
import AddProduct from '../../ProductsArea/AddProduct/AddProduct';
import EditProduct from '../../ProductsArea/EditProduct/EditProduct';
import Register from '../../AuthArea/Register/Register';
import Login from '../../AuthArea/Login/Login';
import CategoryList from '../../CategiriesArea/CategoryList/CategoryList';
import CategoryDetails from '../../CategiriesArea/CategoryDetails/CategoryDetails';
import ContactUs from '../../AboutArea/ContactUs/ContactUs';

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Page404 />} />
                <Route path="/employees" element={<EmployeesList />} />
                <Route path="/product/details/:prodId" element={<ProductDetails />} />
                <Route path="/product/new/" element={<AddProduct />} />
                <Route path="/products/edit/:prodId" element={<EditProduct />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/categories/details/:catId" element={<CategoryDetails />} />
            </Routes>
        </div>
    );
}

export default Routing;

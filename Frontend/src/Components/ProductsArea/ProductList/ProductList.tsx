import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifySevice";
import productsService from "../../../Services/ProductsService";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../SharedArea/Spinner/Spinner";
import ProductCard from "../ProductCard/ProductCard";
import './ProductList.css';

function ProductList(): JSX.Element {

    useTitle("Products");

    const navigate = useNavigate();

    const [frontendProducts, setFrontendProducts] = useState<ProductModel[]>([]);

    // Go to the backend once:
    useEffect(() => {

        productsService.getAllProducts()
            .then(backendProducts => setFrontendProducts(backendProducts))
            .catch(err => notifyService.error(err));
    }, []);

    function clearAll() {
       productsService.clearAllProducts();
       navigate("/home");
       notifyService.success("All products has been cleared.");
    }

    return (
        <div className="ProductList">

            <NavLink to="/product/new">🆕</NavLink>

            <button onClick={clearAll}>➖</button>

            {frontendProducts.length === 0 && <Spinner />}

            {frontendProducts.map(p => <ProductCard key={p.id} product={p} />)}

        </div>
    );

}

export default ProductList;

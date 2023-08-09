import { NavLink, Navigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import productsService from "../../../Services/ProductsService";
import ProductModel from "../../../Models/ProductModel";
import Spinner from "../../SharedArea/Spinner/Spinner";
import notifyService from "../../../Services/NotifySevice";
import { useNavigate } from "react-router-dom";

function ProductDetails(): JSX.Element {

    const params = useParams();
    const id = +params.prodId; // Same name is defined in the route parameter.

    const [frontendProduct, setFrontendProduct] = useState<ProductModel>();

    useEffect(() => {
        productsService.getOneProduct(id)
            .then(backendProduct => setFrontendProduct(backendProduct))
            .catch(err => notifyService.error(err));
    }, []);

    const navigate = useNavigate();

    async function deleteMe(): Promise<void> {
        try {
            const userConformation = window.confirm("Are you sure you want to delete this product?");
            if (!userConformation) return;
            await productsService.deleteProduct(id);
            notifyService.success("Product was deleted");
            navigate("/products");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    if (!frontendProduct) return <Spinner /> // Conditional rendering.

    return (
        <div className="ProductDetails">

            <h2>Product Details</h2>

            <h3>Name: {frontendProduct?.name}</h3>
            <h3>Price: {frontendProduct?.price}</h3>
            <h3>Stock: {frontendProduct?.stock}</h3>
            <br /> <br />

            <img src={frontendProduct?.imageUrl} />
            <br /> <br />

            <NavLink to="/products">Back</NavLink>

            <span> | </span>

            <NavLink to={"/products/edit/" + frontendProduct?.id}>Edit</NavLink>

            <span> | </span>

            <NavLink onClick={deleteMe} to="#">Delete</NavLink>

        </div>
    );
}

export default ProductDetails;

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/ProductsService";
import "./EditProduct.css";
import { useEffect } from "react";
import notifyService from "../../../Services/NotifySevice";


function EditProduct(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.prodId;

    useEffect(() => {
        productsService.getOneProduct(id)
            .then(backendProduct => {
                setValue("name", backendProduct.name);
                setValue("price", backendProduct.price);
                setValue("stock", backendProduct.stock);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            product.id = id;
            product.image = (product.image as unknown as FileList)[0];
            await productsService.updateProduct(product);
            notifyService.success("Product has been updated");
            navigate("/products");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditProduct">

            <h2>Edit Product</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="1000" />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min="0" max="1000" />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Edit</button>

            </form>

        </div>
    );
}

export default EditProduct;

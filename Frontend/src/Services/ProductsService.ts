import axios from "axios";
import ProductModel from "../Models/ProductModel";
import appConfig from "../Utils/AppConfig";
import { ProductsAction, ProductsActionType, productsStore } from "../Redux/ProductsState";

class ProductsService {

    // Get all products from the backend:
    public async getAllProducts(): Promise<ProductModel[]> {

        // Get products from global state:
        let products = productsStore.getState().products;

        // If there are no products in global state:
        if (products.length === 0) {

            // Get all products into response object:
            const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

            // Extract the products from the response:
            products = response.data;

            // Save products in global state:
            const action: ProductsAction = { type: ProductsActionType.SetProducts, payload: products };
            productsStore.dispatch(action);
        }

        // Return products:
        return products;
    }

    // Get one product from the backend:
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Get products from global state:
        let products = productsStore.getState().products;

        // Find desired product:
        let product = products.find(p => p.id === id);

        // If product no found:
        if (!product) {

            // Get product into response object:
            const response = await axios.get<ProductModel>(appConfig.productsUrl + id);

            // Extract the product from the response:
            product = response.data;
        }

        // Return product:
        return product;
    }

    // Add new product to the backend:
    public async addProduct(product: ProductModel): Promise<void> {

        // Header is a additional data sent in the request for configuration:
        const options = {
            headers: { "Content-Type": "multipart/form-data" } // Include files in the request.
        }

        // Send product to backend:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);

        // Extract the added product sent back from the backend:
        const addedProduct = response.data;

        // Add the new product to global state:
        const action: ProductsAction = { type: ProductsActionType.AddProduct, payload: addedProduct };
        productsStore.dispatch(action);
    }

    // Update existing product in the backend:
    public async updateProduct(product: ProductModel): Promise<void> {

        // Header is a additional data sent in the request for configuration:
        const options = {
            headers: { "Content-Type": "multipart/form-data" } // Include files in the request.
        }

        // Send product to backend:
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, options);

        // Extract the updated product sent back from the backend:
        const updatedProduct = response.data;

        // Update the product in global state:
        const action: ProductsAction = { type: ProductsActionType.UpdateProduct, payload: updatedProduct };
        productsStore.dispatch(action);
    }

    // Delete product from backend: 
    public async deleteProduct(id: number): Promise<void> {

        // Delete product in the backend:
        await axios.delete(appConfig.productsUrl + id);

        // Delete product from global state:
        const action: ProductsAction = { type: ProductsActionType.DeleteProduct, payload: id};
        productsStore.dispatch(action);
    }

    // Clear global state: 
    public  clearAllProducts():void {
        const action: ProductsAction = { type: ProductsActionType.ClearAll};
        productsStore.dispatch(action);
    }

}

const productsService = new ProductsService(); // Singleton
export default productsService;
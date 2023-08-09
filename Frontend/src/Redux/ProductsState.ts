import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// 1. Global state:
export class ProductsState {
    public products: ProductModel[] = []; // Init with empty array.
}

// 2. Action type:
export enum ProductsActionType {
    SetProducts = "SetProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
    ClearAll = "ClearAll"
}

// 3. Action Object:
export interface ProductsAction {
    type: ProductsActionType; // Action type
    payload?: any // The data related to that action
}

// 4. Reducer(invoked by redux library):
export function productReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {

    const newState = { ...currentState }; // Duplicate the global state.

    // Change the duplicated global state according the action: 
    switch (action.type) {

        case ProductsActionType.SetProducts: // Here the payload is products array
            newState.products = action.payload; // Save all products into global state
            break;

        case ProductsActionType.AddProduct: // Here the payload is single product to add
            newState.products.push(action.payload); // Add that product into global state.
            break;

        case ProductsActionType.UpdateProduct: // Here the payload is a singe product to update.
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.products[indexToUpdate] = action.payload;
            break;

        case ProductsActionType.DeleteProduct: // Here the payload is the id (to delete)
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.products.splice(indexToDelete, 1);
            break;

        case ProductsActionType.ClearAll: // Here there is no payload
            newState.products = [];
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store:
export const productsStore = createStore(productReducer);
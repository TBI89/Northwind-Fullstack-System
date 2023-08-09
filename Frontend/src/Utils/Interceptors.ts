import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    // Create app interceptors:
    public create(): void {

        // Registering to request interceptor:
        axios.interceptors.request.use(requestObject => {

            // requestObject containing any request data send with any request:

            if (authStore.getState().token) {
                requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
                requestObject.headers.doormanKey = "I-Love-Kittens!";
            }

            return requestObject;
        });
    }
}

const interceptors = new Interceptors();

export default interceptors;
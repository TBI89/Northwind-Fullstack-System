import { NavLink } from "react-router-dom";
import "./Menu.css";
import TotalProducts from "../../ProductsArea/TotalProducts/TotalProducts";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {


    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(authStore.getState().token  !== null);
        const unsubscribe = authStore.subscribe(() => {
            setIsLoggedIn(authStore.getState().token  !== null); 
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            <NavLink to="/products">Products</NavLink>

            {isLoggedIn && <NavLink to="/categories">Categories</NavLink>}

            <NavLink to="/about">About</NavLink>

            <NavLink to="/contact-us">Contact Us</NavLink>

            <NavLink to="/employees">Employees</NavLink>

            <TotalProducts />

        </div>
    );
}

export default Menu;

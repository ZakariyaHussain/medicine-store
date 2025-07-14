
import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Home/Authentication/Login";
import Register from "../pages/Home/Authentication/Register";
import Shop from "../pages/Home/Shop";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "shop",
                Component: Shop
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "joinUs",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
]);
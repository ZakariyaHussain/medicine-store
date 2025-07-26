
import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Home/Authentication/Login";
import Register from "../pages/Home/Authentication/Register";
import Shop from "../pages/Shop/Shop";
import DashboardLayout from "../layouts/DashboardLayout";
import Error from "../shared/Error/Error";
import PrivateRoute from "../routes/PrivateRoute";
import ManageMedicine from "../pages/Dashboard/Seller/ManageMedicine";
import AddMedicine from "../pages/AddMedicine/AddMedicine";
import Cart from "../pages/Cart/Cart";
import CategoryDetails from "../pages/Category/CategoryDetails";
import Checkout from "../pages/Checkout/Checkout";
import Invoice from "../pages/Invoice/Invoice";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import SellerHome from "../pages/Dashboard/Seller/SellerHome";
import AskForAdvertisement from "../pages/Dashboard/Seller/AskForAdvertisement";
//import axios from "axios";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:5000/medicines'),
                Component: Home
            },
            {
                path: "shop",
                Component: Shop
            },
            {
                path: "addMedicine",
                Component: AddMedicine
            },
            // {
            //     path: 'medicines/:id',
            //     loader: ({params})=> fetch(`http://localhost:5000/medicines/${params.id}`),
            //     Component: Cart
            // },
            {
                path: 'cart',
                Component: Cart
            },
            {
                path: 'category/:categoryName',
                Component: CategoryDetails
            },
            {
                path: 'checkout',
                Component: Checkout
            },
            {
                path: 'invoice',
                Component: Invoice
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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            
            //seller dashboard
            {
                path: "sellerHome",
                Component: SellerHome
            },
            {
                path: 'ManageMedicine',
                Component: ManageMedicine
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: "askForAdvertisement",
                Component: AskForAdvertisement
            }
        ]
    }
]);
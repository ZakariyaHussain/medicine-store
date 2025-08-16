
import { createBrowserRouter } from "react-router-dom";
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
import UserPaymentHistory from "../pages/Dashboard/User/UserPaymentHistory";
import SellerHome from "../pages/Dashboard/Seller/SellerHome";
import SellerPaymentHistory from "../pages/Dashboard/Seller/SellerPaymentHistory";
import AskForAdvertisement from "../pages/Dashboard/Seller/AskForAdvertisement";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";
import PaymentManagement from "../pages/Dashboard/Admin/PaymentManagement";
import SalesReport from "../pages/Dashboard/Admin/SalesReport";
import ManageBannerAdvertise from "../pages/Dashboard/Admin/ManageBannerAdvertise";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                loader: () => fetch('https://medicine-store-seven.vercel.app/medicines'),
                element: <Home></Home>
            },
            {
                path: "shop",
                Component: Shop
            },
            {
                path: "addMedicine",
                Component: AddMedicine
            },
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

            //user dashboard
            {
                path: "userPaymentHistory",
                Component: UserPaymentHistory
            },

            //seller dashboard
            {
                path: "sellerHome",
                Component: SellerHome
            },
            {
                path: 'manageMedicine',
                Component: ManageMedicine
            },
            {
                path: 'paymentHistory',
                Component: SellerPaymentHistory
            },
            {
                path: "askForAdvertisement",
                Component: AskForAdvertisement
            },

            //admin dashboard
            {
                path: "adminHome",
                Component: AdminHome
            },
            {
                path: "manageUsers",
                Component: ManageUsers
            },
            {
                path: "manageCategory",
                Component: ManageCategory
            },
            {
                path: "paymentManagement",
                Component: PaymentManagement
            },
            {
                path: "salesReport",
                Component: SalesReport
            },
            {
                path: "manageBannerAdvertise",
                Component: ManageBannerAdvertise
            }
        ]
    },

]);
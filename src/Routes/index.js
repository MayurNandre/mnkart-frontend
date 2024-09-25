import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProducts from "../Pages/CategoryProducts";
import ProductDetails from "../Components/ProductDetails";
import UserCart from "../Pages/UserCart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import Order from "../Pages/Order";

// Routing pages
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                path: "login",
                element: <Login />
            }, {
                path: "forgot-password",
                element: <ForgotPassword />
            }, {
                path: "sign-up",
                element: <SignUp />
            }, {
                path: "product-category",
                element: <CategoryProducts />
            }, {
                path: "product/:id",
                element: <ProductDetails />
            }, {
                path: "user-cart",
                element: <UserCart />
            }, {
                path: "success",
                element: <Success />
            }, {
                path: "cancel",
                element: <Cancel />
            }, {
                path: "search",
                element: <SearchProduct />
            },{
                path: "order",
                element: <Order />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-product",
                        element: <AllProducts />
                    }
                ]
            }
        ]
    }
])

export default router
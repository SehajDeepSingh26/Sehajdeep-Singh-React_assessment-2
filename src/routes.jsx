import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import WishlList from "./components/WishlList";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/wishlist",
                element: <WishlList />
            },
            {
                path: "/product/:id",
                element: <ProductDetail />
            },

            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    }
])
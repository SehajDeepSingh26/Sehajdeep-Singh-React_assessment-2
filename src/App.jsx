import { Outlet } from "react-router-dom"
import CartProvider from "./context/CartContext"
import Navbar from "./components/Navbar"
import AuthProvider from "./context/AuthContext"
import { Toaster } from "react-hot-toast"


function App() {

    return (
        <>
            <AuthProvider>
                <CartProvider>

                    <div><Toaster /></div>

                    <Navbar />
                    <Outlet />

                </CartProvider>
            </AuthProvider>
        </>
    )
}

export default App

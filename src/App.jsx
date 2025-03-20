import { Outlet } from "react-router-dom"
import CartProvider from "./context/CartContext"
import Navbar from "./components/Navbar"
import AuthProvider from "./context/AuthContext"
import { Toaster } from "react-hot-toast"
import NavTemp from "./components/Navbar"
import Footer from "./components/Footer"


function App() {

    return (
        <>
            <AuthProvider>
                <CartProvider>

                    <div><Toaster /></div>

                    {/* <Navbar /> */}
                    <NavTemp/>
                    <Outlet />
                    <Footer/>

                </CartProvider>
            </AuthProvider>
        </>
    )
}

export default App

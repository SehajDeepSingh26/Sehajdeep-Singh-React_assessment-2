import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // console.log("inside navbar")

    return (
        <nav className="fixed w-full bg-gray-800 text-white p-4 flex justify-between -mt-20 z-50">
            <Link to="/" className="ml-10 text-4xl font-semibold">Buy-Me</Link>
            <div className="flex gap-4">
                <Link to="/wishlist">
                    <HeartIcon className="w-6 h-6" /> Wishlist
                </Link>
                <Link to="/cart">
                    <ShoppingCartIcon className="w-6 h-6" /> Cart
                </Link>

                {user ? (
                    <>
                        <span>Welcome, {user.name}</span>
                        <button className="bg-red-500 px-4 py-1 rounded cursor-pointer" onClick={logOut}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-5"
                            to="/login">Login</Link>

                        <Link className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-5"
                            to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

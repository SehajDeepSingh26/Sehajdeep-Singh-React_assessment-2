"use client"

import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const CartPage = () => {
    const { cart, addToCart, removeFromCart, deleteFromCart } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        setTotal(0)
        cart.map((item) => {
            setTotal((prev) => prev + item.price * item.quantity)
        })
    }, [cart])

    const checkAuth = () => {
        if (user?.name) {
            toast.success("Checkout valid")
        } else {
            toast.error("Please login first")
        }
    }

    const handleClick = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <div className="container mx-auto px-4 min-h-[255px]">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg  p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8 border-b pb-4">
                    <FaShoppingCart className="text-blue-600 text-2xl" />
                    <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
                </div>

                                                    {/* //^ If Cart is Empty */}
                {cart.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <div className="flex justify-center mb-4">
                            <FaShoppingCart className="text-gray-300 text-5xl" />
                        </div>
                        <p className="text-gray-500 text-lg mb-6">Your cart is empty.</p>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-1000"
                        >
                            Continue Shopping →
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow duration-200"
                                >
                                    <div
                                        className="cursor-pointer bg-gray-50 p-2 rounded-lg flex-shrink-0 mb-4 sm:mb-0"
                                        onClick={() => handleClick(item.id)}
                                    >
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.title}
                                            className="h-24 w-24 object-contain rounded-md"
                                        />
                                    </div>

                                    <div className="ml-0 sm:ml-4 flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                                        <p className="text-blue-600 font-medium mt-1">${item.price.toFixed(2)}</p>

                                        <div className="mt-4 flex items-center">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 h-8 flex items-center justify-center bg-gray-50 text-gray-800 font-medium border-t border-b border-gray-200">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deleteFromCart(item.id)}
                                        className="mt-4 sm:mt-0 sm:ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <FaTrashAlt className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="lg:w-80 flex-shrink-0">
                            <div className="sticky top-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

                                <div className="flex justify-between py-3 border-b border-gray-200">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between py-3 border-b border-gray-200">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>

                                <div className="flex justify-between py-3 mt-2">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-lg font-bold text-blue-600">${total.toFixed(2)}</span>
                                </div>

                                <button
                                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                                    onClick={checkAuth}
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="mt-4 text-center">
                                    <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        ← Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage


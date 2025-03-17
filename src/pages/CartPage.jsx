import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CartPage = () => {
    const { cart, addToCart, removeFromCart, deleteFromCart } = useContext(CartContext);
    const {user} = useContext(AuthContext)
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        setTotal(0)
        cart.map(item => {
            setTotal(prev => prev+(item.price*item.quantity))
        })
    }, [cart])

    // console.log(cart)
    
    const checkAuth = () => {
        if(user?.name){
            toast.success("Checkout valid")
        }
        else{
            toast.error("Please login first")
        }
    }

    return (
        <div className="mt-20">
            <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>

                                                                {/* //^ If Cart is Empty */}
            {cart.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                    <Link to="/" className="text-blue-500 mt-4 inline-block">
                        Continue Shopping →
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center border p-4 rounded-lg">

                                <img src={item.image} alt={item.title} className="h-24 w-24 object-cover rounded-md" />


                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>

                                    <div className="mt-2 flex items-center">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded-md mr-2"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="px-2 py-1 bg-green-500 text-white rounded-md ml-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button onClick={() => deleteFromCart(item.id)} className="ml-4 text-red-500">
                                    <FaTrashAlt className="w-6 h-6" />
                                </button>
                                
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
                        <button className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-md w-full hover:bg-blue-600"
                            onClick={checkAuth}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
        </div>
    );
};

export default CartPage;

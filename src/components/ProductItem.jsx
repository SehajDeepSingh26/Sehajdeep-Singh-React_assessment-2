/* eslint-disable react-hooks/rules-of-hooks */

import { Star, ShoppingCart, Heart } from "lucide-react"
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product, wishPage = false }) => {
    const { addToCart, addToWishlist, removeFromWishist } = useContext(CartContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product?.id}`)
    }

    const handleWishList = () => {
        if (wishPage) {
            removeFromWishist(product.id)
        }
        else
            addToWishlist(product)
    }


    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow">
            <div className="relative">
                <img onClick={handleClick} src={product?.image} alt={name} className="w-full h-64 object-contain p-4" />

            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product?.title}</h3>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product?.price.toFixed(2)}</span>
                </div>

                <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-md w-full hover:bg-gray-600 transition-colors"
                    >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                    </button>
                    <button
                        onClick={handleWishList}
                        className={`p-2 rounded-md border transition-colors bg-red-50 border-red-200 text-red-500`}
                    >
                        <Heart size={18} className="fill-red-500" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem


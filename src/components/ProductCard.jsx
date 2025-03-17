import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist } = useContext(CartContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`)
    }

    return (
        <div className="border p-4 rounded-lg hover:scale-105 transition" >
            <img src={product.image} className="h-40 mx-auto" alt={product.title} />
            <h3 className="font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-500">${product.price}</p>

            <Link to={``} onClick={handleClick} className="text-blue-500 mt-2 block">
                View Details
            </Link>

            <button
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md w-full hover:bg-blue-600"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md w-full hover:bg-red-600"
                onClick={() => addToWishlist(product)}
            >
                ❤️ Add to Wishlist
            </button>
        </div>
    );
};

export default ProductCard;

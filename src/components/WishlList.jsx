import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
    const { wishlist } = useContext(CartContext);

    return (
        <div className="p-6 mt-20">
            <h2 className="text-3xl font-semibold mb-4">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 text-lg">No items in wishlist.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {wishlist.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;

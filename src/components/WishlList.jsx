import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductItem from "./ProductItem";

const Wishlist = () => {
    const { wishlist } = useContext(CartContext);

    return (
        <div className="p-6 min-h-[255px]">
            <h2 className="text-3xl font-bold mb-4">My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 text-lg">No items in wishlist.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {wishlist.map((product) => (
                        <ProductItem key={product.id} product={product} wishPage={true}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;

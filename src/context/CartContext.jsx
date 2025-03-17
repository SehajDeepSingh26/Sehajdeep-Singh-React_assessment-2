import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        toast.success("Item added to cart")
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        toast("Item removed from cart")
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)    // Remove item if quantity reaches 0
        );
    };

    const deleteFromCart = (id) => {
        toast("Item deleted from cart")
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)    // Remove item if quantity reaches 0
        );
    }

    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist")) || []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        toast.success("Item added to wishList")
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.some((item) => item.id === product.id);
            return exists ? prevWishlist : [...prevWishlist, product];
        });
    };

    const removeFromWishist = (id) => {
        toast("Item removed from wishlist")
        setWishlist(prev => prev.filter(item => item.id === id))
    }

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            wishlist, 
            addToWishlist, 
            removeFromWishist,
            deleteFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

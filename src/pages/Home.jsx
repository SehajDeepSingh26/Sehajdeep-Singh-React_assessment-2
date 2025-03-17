import React, { useEffect, useState } from "react";
import { apiConnector } from "../operation/apiConnector";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [rating, setRating] = useState(0);

    const [allProducts, setAllProducts] = useState([])
    const [page, setPage] = useState(1)


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await toast.promise(
                     apiConnector("GET", "https://fakestoreapi.com/products"),
                    {
                        loading: 'Loading',
                        success: 'Data Fetched',
                        error: 'Error when fetching',
                    }
                );
                setProducts(response.data.slice(0, 6));
                setAllProducts(response.data)
            } catch (error) {
                console.log("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);


    const filteredProducts = products?.filter((product) => {
        return (
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (category ? product.category === category : true) &&
            product.price >= minPrice &&
            product.price <= maxPrice &&
            product.rating.rate >= rating
        );
    });

    const toggleFilterData = () => {
        if (showFilter)
            setShowFilter(false)
        else
            setShowFilter(true)
    }

    const loadMoreProducts = () => {
        const fetchMore = allProducts.slice(0, (page+1)*6)
        setPage(prev => prev+1)
        setProducts(fetchMore)
    }

    return (
        <div className="p-4 mt-20">

            {showFilter ? (
                <div className="flex flex-wrap gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="border p-2 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="border p-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">Price Range ($)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                className="border p-2 w-20 rounded"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                            />
                            <span className="self-center text-gray-600">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="border p-2 w-20 rounded"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>


                    <select
                        className="border p-2"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value="0">All Ratings</option>
                        <option value="3">3+ Stars</option>
                        <option value="4">4+ Stars</option>
                        <option value="4.5">4.5+ Stars</option>
                    </select>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={toggleFilterData}> Hide Filter </button>
                </div>
            ) :
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-5"
                    onClick={toggleFilterData}> Filter </button>
            }


            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-4 text-center">No products found</p>
                )}
            </div>

            {products.length < allProducts.length && (
                <div className="flex justify-center mt-5">
                    <button 
                        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
                        onClick={loadMoreProducts}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;

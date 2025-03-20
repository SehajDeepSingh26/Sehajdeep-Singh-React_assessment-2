import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import DiscountSection from '../components/DiscountSection'
import ProductsSection from '../components/ProductsSection'
import { apiConnector } from '../operation/apiConnector'
import toast from 'react-hot-toast'

const HomeTemp = () => {
    const [products, setProducts] = useState([]);

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
                setProducts(response.data);
            } catch (error) {
                console.log("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <main className="flex-grow">
                <Banner />
                <DiscountSection />
                <ProductsSection products={products} />
            </main>
        </div>
    )
}

export default HomeTemp
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import { apiConnector } from '../operation/apiConnector';
import toast from 'react-hot-toast'; import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductItem from '../components/ProductItem';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart, addToWishlist } = useContext(CartContext)
    const [similarProd, setSimilarProd] = useState([])

    const [product, setProduct] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                const response = await toast.promise(
                    apiConnector("GET", `https://fakestoreapi.com/products/${id}`),
                    {
                        loading: 'Loading',
                        success: 'Data loaded for product',
                        error: 'Error when fetching',
                    }
                )
                // console.log(response)
                setProduct(response.data)

                const allProducts = await apiConnector("GET", `https://fakestoreapi.com/products`)
                const filteredProducts = allProducts.data.filter(
                    (item) => item.category === response.data.category && item.id !== response.data.id
                )

                setSimilarProd(filteredProducts)
            }

            fetchProduct();
        } catch (error) {
            console.log("Error occured in product detail page", error)
        }
    }, [id])

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }

    return (
        <div className='max-w-4xl mx-auto p-6 '>
            <button
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-8 shadow-sm"
                onClick={handleBack}
            >
                <span>←</span>
                <span>Back</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-md">
                <div className="bg-gray-50 p-6 flex items-center justify-center">
                    <img src={product?.image} alt={product?.title} className="w-full h-80 object-contain" />
                </div>

                <div className="p-6 flex flex-col">
                    <div className="mb-auto">
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">{product?.category}</span>
                        <h2 className="text-2xl font-bold mt-1 text-gray-900">{product?.title}</h2>

                        <div className="flex items-center mt-4 mb-2">
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="font-medium text-gray-800">{product?.rating.rate}</span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span className="text-gray-600 text-sm">{product?.rating.count} reviews</span>
                            </div>
                        </div>

                        <div className="mt-3 mb-5">
                            <span className="text-2xl font-bold text-gray-900">${product?.price}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6">{product?.description}</p>
                    </div>

                    <div className="space-y-3 mt-4">
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center"
                            onClick={() => addToCart(product)}
                        >
                            <span className="mr-2">🛒</span>
                            Add to Cart
                        </button>

                        <button
                            className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg w-full hover:bg-gray-50 transition-colors duration-200 font-medium shadow-sm flex items-center justify-center"
                            onClick={() => addToWishlist(product)}
                        >
                            <span className="text-red-500 mr-2">❤️</span>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* //^ similar products */}
            <h2 className='text-2xl mt-15 p-5'>Similar Products</h2>
            <div className='container relative'>
                <Swiper
                    slidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="h-full w-full gap-10 flex"
                >
                    {
                        similarProd.map(item => (
                            <SwiperSlide className='ml-10' key={item.id}>
                                <ProductItem product={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductDetail

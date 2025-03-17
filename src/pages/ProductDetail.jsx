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
import ProductCard from '../components/ProductCard';

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
        <div className='max-w-4xl mx-auto p-6 mt-20'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-5" onClick={handleBack}>{"<- Back"}</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={product?.image} alt="product.title" className='w-full h-80 object-contain' />

                <div>
                    <h2 className="text-2xl font-bold">{product?.title} </h2>
                    <p className="text-gray-600">{product?.category}</p>
                    <p className="text-lg font-semibold mt-2">{product?.price}</p>
                    <p className="text-gray-700 mt-4">{product?.description}</p>

                    <div className="mt-4 flex items-center">
                        <span className="text-yellow-500 text-lg">⭐ {product?.rating.rate} </span>
                        <span className="text-gray-500 ml-2">⭐ {product?.rating.count} reviews </span>
                    </div>

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
            </div>

            {/* //^ similar products */}
            <h2 className='text-2xl mt-15 p-5'>Similar Products</h2>
            <div className='container relative'>
                <Swiper
                    slidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="h-full w-full gap-10 flex"
                >
                    {
                        similarProd.map(item => (
                            <SwiperSlide className='ml-10' key={item.id}>
                                <ProductCard product={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductDetail

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import hero from "/images/hero-img.png"
import phone from "/images/phone-06.jpg"
import watch from "/images/watch-07.png"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
// Import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules"

const Banner = () => {
    const bannerSlides = [
        {
            id: 1,
            title: "Summer Collection",
            subtitle: "Up to 50% off on selected items",
            buttonText: "Shop Now",
            image: hero,
            bgColor: "bg-blue-100",
        },
        {
            id: 2,
            title: "New Arrivals",
            subtitle: "Check out our latest products",
            buttonText: "Discover",
            image: phone,
            bgColor: "bg-green-100",
        },
        {
            id: 3,
            title: "Limited Time Offer",
            subtitle: "Free shipping on orders over $50",
            buttonText: "Get Started",
            image: watch,
            bgColor: "bg-purple-100",
        },
    ]

    return (
        <section className="relative">
            <Swiper
                sslidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                {bannerSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className={`relative ${slide.bgColor} h-[400px] md:h-[500px] flex items-center`}>
                            <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
                                <div className="ml-40 md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                                    <p className="text-xl mb-6">{slide.subtitle}</p>
                                    
                                </div>
                                <div className="md:w-1/2">
                                    <img
                                        src={slide.image || "/placeholder.svg"}
                                        alt={slide.title}
                                        className="max-h-[300px] md:max-h-[400px] mx-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Banner


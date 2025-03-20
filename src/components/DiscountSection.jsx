import phone from "/images/phone-03.png"
import watch from "/images/watch2.png"
import headphone from "/images/headphones.png"

const DiscountSection = () => {
    const discountAds = [
        {
            id: 1,
            title: "Flash Sale",
            description: "Up to 70% off",
            image: phone,
            bgColor: "bg-red-100",
            textColor: "text-red-600",
        },
        {
            id: 2,
            title: "New Season",
            description: "Spring Collection",
            image: watch,
            bgColor: "bg-green-100",
            textColor: "text-green-600",
        },
        {
            id: 3,
            title: "Clearance",
            description: "Last items in stock",
            image: headphone,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
        },
    ]

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Special Offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {discountAds.map((ad) => (
                        <div
                            key={ad.id}
                            className={`${ad.bgColor} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow`}
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex-grow">
                                    <h3 className={`text-2xl font-bold ${ad.textColor} mb-2`}>{ad.title}</h3>
                                    <p className="text-gray-700">{ad.description}</p>
                                </div>
                                <img src={ad.image} alt={ad.title} className="w-full h-60 object-contain" />
                                <button className=" bg-white text-gray-800 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DiscountSection


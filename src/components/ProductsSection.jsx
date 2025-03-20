
import { useEffect, useState } from "react"
import { Filter, X } from "lucide-react"
import ProductCard from "./ProductItem"

const Home = ({ products }) => {

    const [activeCategory, setActiveCategory] = useState("All")
    const [showFilter, setShowFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [minRating, setMinRating] = useState(0)

    const [displayedProducts, setDisplayedProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const [page, setPage] = useState(1)
    // const productsPerPage = 6


    useEffect(() => {
        console.log(activeCategory, minPrice, minRating, maxPrice, searchTerm )
        setFilteredProducts(products.filter((product) => {
            return (
                product.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (activeCategory === "All" ? true : product.category === activeCategory) &&
                product.price >= minPrice &&
                product.price <= maxPrice &&
                (product.rating?.rate || product.rating) >= minRating
            )
        }))
    }, [activeCategory, minPrice, minRating, maxPrice, searchTerm])

    
    useEffect(() => {
        setDisplayedProducts(filteredProducts.slice(0, 6))
    }, [filteredProducts])

    useEffect(() => {
        console.log('initial render')
        setDisplayedProducts(products.slice(0, 6))
    }, [products])
    
    
    const toggleFilter = () => {
        setShowFilter(!showFilter)
    }
    
    const loadMoreProducts = () => {
        const fetchMore = products.slice(0, (page + 1) * 6)
        setPage(prev => prev + 1)
        setDisplayedProducts(fetchMore)
    }
    
    const categories = [
        "All",
        "men's clothing",
        "jewelery",
        "electronics",
        "women's clothing"
    ]

    // console.log("-=-=-=-=", products.slice(0, 6))
    // console.log("Displayed products", displayedProducts)
    
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <button
                        onClick={toggleFilter}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/90 transition-colors"
                    >
                        {showFilter ? <X size={18} /> : <Filter size={18} />}
                        {showFilter ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                {showFilter && (
                    <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                                    Search Products
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Price Range Filter */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Price Range (${minPrice} - ${maxPrice})
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(Number(e.target.value))}
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Minimum Rating</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    value={minRating}
                                    onChange={(e) => setMinRating(Number(e.target.value))}
                                >
                                    <option value="0">All Ratings</option>
                                    <option value="3">3+ Stars</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="4.5">4.5+ Stars</option>
                                </select>
                            </div>


                        </div>
                    </div>
                )}
                
                {/* //^ CATEGORIES --> */}

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories?.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full ${activeCategory === category ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-primary text-black cursor-pointer"
                                } transition-colors`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {displayedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20">
                        {displayedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No products found matching your filters</p>
                    </div>
                )}
                {console.log(displayedProducts)}

                {displayedProducts.length < products.length && (
                    <div className="text-center mt-10">
                        <button
                            onClick={loadMoreProducts}
                            className="bg-primary text-white px-6 py-3 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
                        >
                            Load More Products
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Home


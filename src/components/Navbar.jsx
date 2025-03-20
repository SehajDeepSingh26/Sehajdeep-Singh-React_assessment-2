import { useState, useContext } from 'react'
import { ShoppingCart, User, LogOut, Menu, X, HeartPulseIcon, FolderHeart } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import placeHolder from "/placeholder.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const { user, logOut } = useContext(AuthContext);



    return (
        <header className="sticky top-0 z-50 bg-white shadow-md text-black">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-primary">
                            <img src="logo.png" alt="logo-Image" className='h-16' />
                            {/* <MirrorText text="Buy-Me-Now" /> */}
                        </a>
                    </div>

                    {/* //^ Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/" className="text-gray-700 hover:text-primary transition-colors">Home</a>
                        <a href="#" className="text-gray-700 hover:text-primary transition-colors">Shop</a>
                        <a href="#" className="text-gray-700 hover:text-primary transition-colors">Categories</a>
                        <a href="#" className="text-gray-700 hover:text-primary transition-colors">Deals</a>
                    </nav>

                    {/* //^ Cart, and User */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Cart Link */}
                        <a href="/cart" className="relative p-2 text-gray-600 hover:text-blue-700 transition duration-200">
                            <ShoppingCart className="h-6 w-6" />
                        </a>

                        {/* Wishlist Link */}
                        <a href="/wishlist" className="relative p-2 text-gray-600 hover:text-pink-700 transition duration-200">
                            <FolderHeart className="h-6 w-6" />
                        </a>

                        {/* User Profile Dropdown */}
                        {user ? (
                            <div className="relative">
                                <button
                                    className="flex items-center space-x-2 focus:outline-none"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <img src={user.image} className="h-9 w-9 rounded-full object-cover border-2 border-gray-300" />
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                                        <button
                                            onClick={logOut}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                        >
                                            <LogOut size={16} className="mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 bg-[#BBF7D0] text-black px-4 py-2 rounded-md hover:bg-[#6EE7B7] transition duration-200"
                                >
                                    <User size={18} />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex items-center gap-2 bg-[#FECDD3] text-black px-4 py-2 rounded-md hover:bg-[#FDA4AF] transition duration-200"
                                >
                                    <User size={18} />
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-4">
                            <a href="/" className="text-gray-700 hover:text-primary transition-colors">Home</a>
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Shop</a>
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Categories</a>
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors">Deals</a>
                        </nav>

                        <div className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <a href="/cart" className="relative p-2 text-gray-700 hover:text-blue-800 transition-colors">
                                    <ShoppingCart />
                                </a>
                                <a href="/wishlist" className="relative p-2 text-gray-700 hover:text-pink-800 transition-colors">
                                    <HeartPulseIcon />
                                </a>

                                {user ? (
                                    <div className="relative">
                                        <button
                                            className="flex items-center space-x-2"
                                            onClick={() => setShowDropdown(!showDropdown)}
                                        >
                                            <img
                                                src={placeHolder}
                                                alt={user.name}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-gray-700">{user.name}</span>
                                        </button>

                                        {showDropdown && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">

                                                <button
                                                    onClick={logOut}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <LogOut size={16} className="mr-2" />
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>

                                        <Link
                                            to="/login"
                                            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                                        >
                                            <User size={18} />
                                            <span>Login</span>
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                                        >
                                            <User size={18} />
                                            <span>Sign Up</span>
                                        </Link>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar

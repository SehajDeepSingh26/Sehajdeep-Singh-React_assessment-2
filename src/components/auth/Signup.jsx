import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Password unmatched")
            return;
        }

        const response = signup(name, email, password)
        setMessage(response)
    }
    return (
        <div className="flex justify-center items-center h-full mt-20 ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 mt-10">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form action="" onSubmit={handleSignup}>
                    <input
                        type="name"
                        placeholder="name"
                        className="border p-2 w-full mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 w-full mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 w-full mb-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="border p-2 w-full mb-2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type='submit' className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600" >
                        Sign Up
                    </button>
                </form>
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </div>
        </div>
    )
}

export default Signup
